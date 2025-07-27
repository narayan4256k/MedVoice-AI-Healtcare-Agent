import { db } from "@/config/db";
import { chatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';


export async function POST(req: NextRequest) {
    const{notes,selectedDoctor}=await req.json();
    const user=await currentUser();
    try{
        const sessionId=uuidv4();
        const result=await db.insert(chatTable).values({
            sessionId: sessionId,
            notes: notes,
            selectedDoctor: selectedDoctor,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdOn: new Date().toString()
            //@ts-ignore
        }).returning({chatTable})
        return NextResponse.json(result[0]?.chatTable);
    }catch(e){
        NextResponse.json(e);
    }
}

export async function GET(req:NextRequest) {
    const {searchParams}= new URL(req.url);
    const sessionId=searchParams.get('sessionId');
    const user=await currentUser();
    
    const result=await db.select().from(chatTable)
    //@ts-ignore
    .where(eq(chatTable.sessionId,sessionId));
    return NextResponse.json(result[0]);
}