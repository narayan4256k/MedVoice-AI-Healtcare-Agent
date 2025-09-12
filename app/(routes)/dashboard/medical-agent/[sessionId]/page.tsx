"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DoctorAgent } from "../../_component/DoctorCard";
import { Circle, Loader, PhoneCallIcon, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

// -------------------- TYPES --------------------
export type SessionDetails = {
  id: number;
  notes: string;
  sessionId: string;
  report: any;
  selectedDoctor: DoctorAgent;
  createdOn: string;
};

type Message = {
  role: string;
  text: string;
  hindi?: string;
  marathi?: string;
};

// -------------------- COMPONENT --------------------
function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState<SessionDetails>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState<string>();
  const [liveTranscripts, setLiveTranscripts] = useState<string>();
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();
  // Timer state
  const [time, setTime] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  // -------------------- EFFECTS --------------------
  useEffect(() => {
    if (sessionId) getSessionDetails();
  }, [sessionId]);

  useEffect(() => {
    if (callStarted) {
      if (timerId) clearInterval(timerId);
      setTime(0);
      const id = setInterval(() => setTime((t) => t + 1), 1000);
      setTimerId(id);
    } else {
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [callStarted]);

  // -------------------- HELPERS --------------------
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const getSessionDetails = async () => {
    try {
      const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
      setSessionDetails(result.data);
    } catch (err) {
      console.error("❌ Error fetching session:", err);
    }
  };

  // Translate function
  const translateText = async (text: string, targetLang: "hi" | "mr") => {
    try {
      const res = await axios.post("/api/translate", { text, targetLang });
      return res.data.translatedText;
    } catch (err) {
      console.error("❌ Translation error:", err);
      return "";
    }
  };

  // -------------------- CALL CONTROL --------------------
  const startCall = () => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setLoading(true);
    setVapiInstance(vapi);

    const doctorId = sessionDetails?.selectedDoctor?.id;
    const assistantId = [1, 2, 3, 9, 10].includes(Number(doctorId))
      ? process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID
      : process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID2;

    vapi.start(assistantId);

    vapi.on("call-start", () => {
      setCallStarted(true);
      setLoading(false);
    });

    vapi.on("call-end", () => {
      setCallStarted(false);
      setLoading(false);
    });

    vapi.on("message", async (message) => {
      if (message.type === "transcript") {
        const { role, transcript, transcriptType } = message;

        if (transcriptType === "partial") {
          setLiveTranscripts(transcript);
          setCurrentRole(role);
        } else if (transcriptType === "final") {
          // Step 1: Add raw transcript immediately
          const newMsg: Message = { role, text: transcript };
          setMessages((prev) => [...prev, newMsg]);
          setLiveTranscripts("");
          setCurrentRole(role);

          // Step 2: Run translations in background
          Promise.all([
            translateText(transcript, "hi"),
            translateText(transcript, "mr"),
          ]).then(([hindi, marathi]) => {
            setMessages((prev) =>
              prev.map((m) =>
                m === newMsg ? { ...m, hindi, marathi } : m
              )
            );
          });
        }
      }
    });

    vapi.on("speech-start", () => setCurrentRole("assistant"));
    vapi.on("speech-end", () => setCurrentRole("user"));
  };

  const disconnectCall = async () => {
    try {
      setLoading(true);
      if (!vapiInstance) return;

      vapiInstance.stop();
      vapiInstance.removeAllListeners();

      const report = await generateReport();
      console.log("📝 Report Generated:", report);

      setCallStarted(false);
      setVapiInstance(null);
    } catch (err) {
      console.error("❌ Disconnect error:", err);
    } finally {
      setLoading(false);
    }
    toast.success("Your Report Is Generated Successfully!");
    router.replace("/dashboard");
  };

  const generateReport = async () => {
    try {
      const result = await axios.post("/api/medical-report", {
        messages,
        sessionDetails,
        sessionId,
      });
      return result.data;
    } catch (err) {
      console.error("❌ Error calling medical-report API:", err);
      return null;
    }
  };

  // -------------------- UI --------------------
  return (
    <div className="border-2 rounded-3xl p-10 bg-gray-100 dark:bg-slate-900">
      {/* Connection status + Timer */}
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 gap-1.5 flex items-center">
          <Circle
            className={`h-4 w-4 rounded-full ${
              callStarted ? "bg-green-400" : "bg-red-500"
            }`}
          />
          {callStarted ? "Connected" : "Not Connected"}
        </h2>
        <h2 className="font-medium text-xl text-gray-500">{formatTime(time)}</h2>
      </div>

      {/* Doctor Info + Messages */}
      {sessionDetails && (
        <div className="flex flex-col items-center mt-10">
          <Image
            src={sessionDetails?.selectedDoctor?.image}
            alt={sessionDetails?.selectedDoctor.specialist ?? ""}
            width={100}
            height={100}
            className="h-[100px] w-[100px] object-cover rounded-full"
          />
          <h2 className="text-lg font-bold text-black dark:text-gray-300 mt-2">
            {sessionDetails?.selectedDoctor.specialist}
          </h2>
          <p className="text-sm dark:text-gray-500">AI Medical Voice Agent</p>

          {/* Chat Bubbles */}
          <div className="mt-10 w-full">
            {messages?.slice(-4).map((msg, index) => (
              <div
                key={index}
                className={`my-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg max-w-[75%] ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white dark:bg-blue-700"
                      : "bg-gray-300 text-black dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.hindi && (
                    <p className="text-sm text-red-500">हिंदी: {msg.hindi}</p>
                  )}
                  {msg.marathi && (
                    <p className="text-sm text-blue-500">मराठी: {msg.marathi}</p>
                  )}
                </div>
              </div>
            ))}

            {liveTranscripts && (
              <p className="text-2xl text-black dark:text-gray-300 mt-10">
                {currentRole}: {liveTranscripts}
              </p>
            )}
          </div>

          {/* Call Controls */}
          {!callStarted ? (
            <Button
              className="mt-20 hover:scale-105 transition-all"
              onClick={startCall}
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : <PhoneCallIcon />}
              Start Call
            </Button>
          ) : (
            <Button
              variant="destructive"
              className="mt-20 hover:scale-105 transition-all"
              onClick={disconnectCall}
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : <PhoneOff />}
              Disconnect
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;
