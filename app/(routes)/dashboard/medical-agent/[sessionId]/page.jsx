"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Circle, Loader, PhoneCallIcon, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";
import { AIDoctorAgents } from "@/shared/list";

// -------------------- COMPONENT --------------------

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const router = useRouter();

  // State Hooks
  const [sessionDetails, setSessionDetails] = useState(null);
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState("");
  const [liveTranscripts, setLiveTranscripts] = useState("");
  const [messages, setMessages] = useState([]);
  const [time, setTime] = useState(0);

  // -------------------- EFFECTS --------------------

  useEffect(() => {
    if (sessionId) {
      getSessionDetails();
    }
  }, [sessionId]);

  useEffect(() => {
    let timerId = null;
    if (callStarted) {
      setTime(0);
      timerId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [callStarted]);

  // -------------------- HELPERS --------------------

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const getSessionDetails = async () => {
    try {
      const result = await axios.get(
        `/api/session-chat?sessionId=${sessionId}`
      );
      setSessionDetails(result.data);
    } catch (err) {
      console.error("❌ Error fetching session:", err);
      toast.error("Failed to load session details.");
    }
  };

  const translateText = async (text, targetLang) => {
    try {
      const res = await axios.post("/api/translate", { text, targetLang });
      return { lang: targetLang, text: res.data.translatedText };
    } catch (err) {
      console.error(`❌ Translation error to ${targetLang}:`, err);
      return { lang: targetLang, text: "" }; // Return empty on error
    }
  };

  // -------------------- CALL CONTROL --------------------

  const startCall = () => {
    if (!sessionDetails?.selectedDoctor) {
      toast.error("No doctor selected for this session.");
      return;
    }
    const doctor = AIDoctorAgents.find(
      (d) => d.id === sessionDetails.selectedDoctor.id
    );
    if (!doctor) {
      toast.error("Invalid doctor configuration.");
      return;
    }

    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
    setLoading(true);
    setVapiInstance(vapi);

    // 1. Build the system prompt string
    const systemPrompt = `
      ${doctor.agentPrompt}

      [Language Rules]
      - Your default language is English.
      - If the user speaks in Hindi or Marathi, you MUST reply in that same language.
      - Automatically detect the user's language from their voice.
      - Never mix languages in one sentence; respond fully in one language.

      [Medical Guidelines]
      1. Start with a warm greeting and mention you're a ${doctor.specialist}.
      2. Ask short, clear questions to understand the patient's issue.
      3. Suggest simple, safe explanations or home remedies.
      4. Suggest appropriate medicines (common, safe, over-the-counter ones) based on symptoms.
      5. If unsure, give general health advice and recommend seeing a doctor in person.
      6. Be empathetic, supportive, and reassuring.
      7. End the conversation positively and clearly.
    `.trim();

    // 2. Define the assistant configuration
    const assistantOptions = {
      name: `Dr. ${doctor.specialist}`,
      firstMessage: `Hello, I am your ${doctor.specialist}. Let's talk about your concern.`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en",
        detect_language: true, // Key for live multi-language transcripts
      },
      voice: {
        provider: "playht",
        voiceId: doctor.voiceId,
        speed: 0.85,
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [{ role: "system", content: systemPrompt }],
      },
    };

    console.log("🚀 Starting Vapi with config:", assistantOptions);
    vapi.start(assistantOptions);

    // -------------------- VAPI EVENT LISTENERS --------------------
    vapi.on("call-start", () => {
      console.log("✅ Call has started.");
      setCallStarted(true);
      setLoading(false);
      setMessages([]); // Clear previous messages
    });

    vapi.on("call-end", () => {
      console.log("📞 Call has ended.");
      setCallStarted(false);
      setLoading(false);
    });

    vapi.on("error", (e) => {
      console.error("❌ Vapi error:", e);
      setCallStarted(false);
      setLoading(false);
      toast.error("An error occurred during the call.");
    });
    
    vapi.on("message", async (message) => {
      if (message.type !== "transcript") return;

      const { role, transcript, transcriptType } = message;

      if (transcriptType === "partial") {
        setLiveTranscripts(transcript); // This is now in the user's detected language
        setCurrentRole(role);
      } else if (transcriptType === "final") {
        setLiveTranscripts("");
        const newMsg = { role, text: transcript };
        setMessages((prev) => [...prev, newMsg]);

        // Cleaned up translation logic for finalized messages
        const langDetected = /[\u0900-\u097F]/.test(transcript) ? "hi" : "en";
        const targetLangs = langDetected === "en" ? ["hi", "mr"] : ["en", "mr"];

        const translationResults = await Promise.all(
          targetLangs.map((lang) => translateText(transcript, lang))
        );
        
        const translations = translationResults.reduce((acc, result) => {
          if (result.text) { // Only add if translation was successful
            acc[result.lang] = result.text;
          }
          return acc;
        }, {});

        setMessages((prev) =>
          prev.map((m) =>
            m === newMsg ? { ...m, translations, langDetected } : m
          )
        );
      }
    });
  };

  const disconnectCall = async () => {
    setLoading(true);
    try {
      if (vapiInstance) {
        await vapiInstance.stop();
      }
      toast.success("Call disconnected.");
      router.replace("/dashboard");
    } catch (err) {
      console.error("❌ Disconnect error:", err);
    } finally {
      setLoading(false);
      setCallStarted(false);
    }
  };

  // -------------------- UI --------------------
  return (
    <div className="border-2 rounded-3xl p-5 sm:p-10 bg-gray-100 dark:bg-slate-900">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 gap-1.5 flex items-center text-sm sm:text-base">
          <Circle
            className={`h-4 w-4 rounded-full transition-colors ${
              callStarted ? "bg-green-400" : "bg-red-500"
            }`}
          />
          {callStarted ? "Connected" : "Not Connected"}
        </h2>
        <h2 className="font-medium text-lg sm:text-xl text-gray-500">
          {formatTime(time)}
        </h2>
      </div>

      {sessionDetails ? (
        <div className="flex flex-col items-center mt-10">
          <Image
            src={sessionDetails.selectedDoctor.image}
            alt={sessionDetails.selectedDoctor.specialist}
            width={100}
            height={100}
            className="h-[100px] w-[100px] object-cover rounded-full border-4 border-gray-300 dark:border-gray-600"
          />
          <h2 className="text-xl font-bold text-black dark:text-gray-300 mt-2">
            {sessionDetails.selectedDoctor.specialist}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            AI Medical Voice Agent
          </p>

          <div className="mt-10 w-full min-h-[150px]">
            {messages.slice(-4).map((msg, index) => (
              <div
                key={index}
                className={`my-2 flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg max-w-[85%] sm:max-w-[75%] ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.translations?.hi && (
                    <p className="text-xs pt-1 text-orange-200 opacity-90">
                      हिंदी: {msg.translations.hi}
                    </p>
                  )}
                  {msg.translations?.mr && (
                    <p className="text-xs pt-1 text-green-200 opacity-90">
                      मराठी: {msg.translations.mr}
                    </p>
                  )}
                   {msg.translations?.en && (
                    <p className="text-xs pt-1 text-blue-200 opacity-90">
                      English: {msg.translations.en}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {liveTranscripts && (
              <p className="text-lg sm:text-xl text-black dark:text-gray-300 mt-10 text-center">
                <span className="font-semibold">{currentRole}:</span> {liveTranscripts}
              </p>
            )}
          </div>

          <div className="mt-10">
            {!callStarted ? (
              <Button
                className="px-6 py-6 text-base hover:scale-105 transition-transform"
                onClick={startCall}
                disabled={loading}
              >
                {loading ? (
                  <Loader className="animate-spin mr-2" />
                ) : (
                  <PhoneCallIcon className="mr-2" />
                )}
                Start Call
              </Button>
            ) : (
              <Button
                variant="destructive"
                className="px-6 py-6 text-base hover:scale-105 transition-transform"
                onClick={disconnectCall}
                disabled={loading}
              >
                {loading ? (
                  <Loader className="animate-spin mr-2" />
                ) : (
                  <PhoneOff className="mr-2" />
                )}
                Disconnect
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-20">
            <Loader className="animate-spin h-10 w-10 text-gray-400"/>
        </div>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;