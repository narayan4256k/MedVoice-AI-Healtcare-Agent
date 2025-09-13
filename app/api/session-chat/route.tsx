import { db } from "@/config/db";
import { chatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { desc, eq } from 'drizzle-orm';


export async function POST(req: NextRequest) {
  try {
    const { notes, selectedDoctor } = await req.json();
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const sessionId = uuidv4();

    const result = await db.insert(chatTable).values({
      sessionId,
      notes,
      selectedDoctor,
      createdBy: user.primaryEmailAddress?.emailAddress ?? "unknown",
      createdOn: new Date().toISOString(),
    }).returning();

    return NextResponse.json(result[0]);
  } catch (e: any) {
    console.error("API Error in /api/session-chat:", e);
    return NextResponse.json(
      { error: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function GET(req:NextRequest) {
    const {searchParams}= new URL(req.url);
    const sessionId=searchParams.get('sessionId');
    const user=await currentUser();

    if(sessionId==="all"){
        const result=await db.select().from(chatTable)
        //@ts-ignore
        .where(eq(chatTable.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(chatTable.id));
        return NextResponse.json(result);

    }

    else{
        
        const result=await db.select().from(chatTable)
        //@ts-ignore
        .where(eq(chatTable.sessionId,sessionId));
        return NextResponse.json(result[0]);
    }
}