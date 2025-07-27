import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const user =await currentUser();

    try {
    //Chekh if user exist 
        //@ts-ignore
        const users= await db.select().from(usersTable).where(eq(usersTable.email,user?.primaryEmailAddress?.emailAddress))
        
        if (!user?.primaryEmailAddress?.emailAddress || !user?.fullName) {
        return NextResponse.json({ error: "User data incomplete" }, { status: 400 });
    }

        //if not, create a new user
        if(users?.length == 0)
        {
            const result = await db.insert(usersTable).values({
                email: user?.primaryEmailAddress?.emailAddress,
                name: user?.fullName,
                credits:10
            }).returning();
            return NextResponse.json(result[0]);
        }
        return NextResponse.json(users[0]);

    } catch (error) {
        return NextResponse.json(error)
    }
}