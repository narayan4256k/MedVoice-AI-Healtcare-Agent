import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const {note} = await request.json();
    try{
        const completion = await openai.chat.completions.create({
    model: "google/gemini-2.5-flash-lite",
    messages: [
        { role: "system", content: JSON.stringify(AIDoctorAgents) },
        { role: "user", content: "User Notes/Symptom:"+note+"Depends on user notes and symptoms,Please Suggest list of doctors, return oject in JSON only" }
    ],
  });
  const response = completion.choices[0].message.content;
  //@ts-ignore
  const Resp=response.trim().replace('```json','').replace('```','');
  const JSONResp=JSON.parse(Resp);
  return NextResponse.json(JSONResp);
    }catch(e){
        return NextResponse.json(e);
    }
} 