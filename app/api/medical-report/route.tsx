import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModel";
import { chatTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import { stringify } from "querystring";
import { eq } from "drizzle-orm";
const REPORT_SYSTEM_PROMPT = `You are an Al Medical Voice Agent that just finished a voice conversation with a user. Based on Doctor AI Agent info and conversation between AI Doctor Agent and user.
1. sessionld: a unique session identifier
2. agent: the medical specialist name (e.g., "General Physician Al")
3. user: name of the patient or "Anonymous" if not provided
4. timestamp: current date and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
q. severity: mild, moderate, or severe
10. medicationsMentioned: list of any medicines mentioned
11. recommendations: list of Al suggestions (e.g., rest, see a doctor)
Return the result in this JSON format:
"sessionld": "string",
"agent": "string"
"user": "string"
"timestamp": "ISO Date string",
"chiefComplaint": "string",
"summary": "string",
"symptoms": ["symptoml "symptom2"),
"duration": "string"
"severity . string"
"medicationsMentioned": ["medl "med2"J,
"recommendations": ["recl", "rec2"),
Only include valid fields. Respond with nothing else.
`

export async function POST(req: NextRequest) {
  const { sessionId, sessionDetails, messages } = await req.json();
  try {
    const UserInput =
      "AI Doctor Agent Info:" +
      JSON.stringify(sessionDetails) +
      "Conversation" +
      stringify(messages);

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-lite",
      messages: [
        { role: "system", content: REPORT_SYSTEM_PROMPT },
        { role: "user", content: UserInput },
      ],
    });

    const response = completion.choices[0].message.content ?? "";
    const Resp = response.trim().replace("```json", "").replace("```", "");
    const JSONResp = JSON.parse(Resp);

    // save report to DB
    await db
      .update(chatTable)
      .set({ report: JSONResp })
      .where(eq(chatTable.sessionId, sessionId));

    return NextResponse.json(JSONResp);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}