import { openai } from "@/config/OpenAiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text, targetLang } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-lite",
      messages: [
        {
          role: "system",
          content: `Translate the following into ${targetLang}. Only return the translated sentence, nothing else.`,
        },
        { role: "user", content: text },
      ],
    });

    const translatedText = completion.choices[0].message?.content ?? "";
    return NextResponse.json({ translatedText });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
