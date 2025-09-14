import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await currentUser();

  try {
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // ✅ Always try to get email safely
    const email =
      user.primaryEmailAddress?.emailAddress ||
      user.emailAddresses[0]?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "User has no email" },
        { status: 400 }
      );
    }

    const fullName = user.fullName || user.firstName || user.username || "Unknown";

    // ✅ Check if user already exists in your DB
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    // ✅ If not, create a new one
    if (users.length === 0) {
      const result = await db
        .insert(usersTable)
        .values({
          email,
          name: fullName,
          credits: 10,
        })
        .returning();

      return NextResponse.json(result[0]);
    }

    return NextResponse.json(users[0]);
  } catch (error: any) {
    console.error("❌ API Error in /api/user POST:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
