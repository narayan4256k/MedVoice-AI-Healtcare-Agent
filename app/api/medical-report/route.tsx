import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModel";
import { chatTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

const REPORT_SYSTEM_PROMPT = `You are an AI Medical Voice Agent that just finished a voice conversation with a user.
Based on Doctor AI Agent info and conversation between AI Doctor Agent and user:
1. sessionId: a unique session identifier
2. agent: the medical specialist name (e.g., "General Physician AI")
3. user: name of the patient or "Anonymous" if not provided
4. timestamp: current date and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate, or severe
10. medicationsMentioned: list of any medicines mentioned
11. recommendations: list of AI suggestions (e.g., rest, see a doctor)

Return the result ONLY in this JSON format:
{
  "sessionId": "string",
  "agent": "string",
  "user": "string",
  "timestamp": "ISO Date string",
  "chiefComplaint": "string",
  "summary": "string",
  "symptoms": ["symptom1", "symptom2"],
  "duration": "string",
  "severity": "string",
  "medicationsMentioned": ["med1", "med2"],
  "recommendations": ["rec1", "rec2"]
}`;

// ---------------- API ----------------
export async function POST(req: NextRequest) {
  try {
    const { sessionId, sessionDetails, messages } = await req.json();

    const UserInput =
      "AI Doctor Agent Info: " +
      JSON.stringify(sessionDetails) +
      ", Conversation: " +
      JSON.stringify(messages);

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-lite",
      messages: [
        { role: "system", content: REPORT_SYSTEM_PROMPT },
        { role: "user", content: UserInput },
      ],
      temperature: 0, // keep deterministic
    });

    const rawResp = completion.choices[0]?.message?.content?.trim();
    if (!rawResp) throw new Error("⚠️ No content in completion response");

    // Clean JSON (remove code fences)
    const cleaned = rawResp.replace(/```json|```/g, "");
    let JSONResp;
    try {
      JSONResp = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("❌ JSON parse error:", parseErr, "Raw:", cleaned);
      throw new Error("Invalid JSON from model");
    }

    // Save to DB
    await db
      .update(chatTable)
      .set({ report: JSONResp,
        conversation:messages
       })
      .where(eq(chatTable.sessionId, sessionId));

    return NextResponse.json(JSONResp);
  } catch (e: any) {
    console.error("❌ Report API error:", e);
    return NextResponse.json({ error: e.message || "Unknown error" }, { status: 500 });
  }
}
