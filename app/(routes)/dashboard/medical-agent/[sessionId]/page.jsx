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
import ViewReportDialog from "../../_component/ViewReportDialog";
import { AIDoctorAgents } from "@/shared/list";

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState(null);
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState("");
  const [liveTranscripts, setLiveTranscripts] = useState("");
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const [time, setTime] = useState(0);
  const [timerId, setTimerId] = useState(null);

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

  const formatTime = (totalSeconds) => {
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

  const translateText = async (text, targetLang) => {
    try {
      const res = await axios.post("/api/translate", { text, targetLang });
      return res.data.translatedText;
    } catch (err) {
      console.error("❌ Translation error:", err);
      return "";
    }
  };

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

    const selectedVoiceId = [1, 2, 3, 9, 10].includes(
      Number(sessionDetails.selectedDoctor.id)
    )
      ? "michael"
      : "jennifer";

    const assistantOptions = {
      name: `Dr. ${doctor.specialist}`,
      firstMessage: `Hello I am your ${doctor.specialist}. Let's talk about your concern.`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "11labs",
        voiceId: doctor.voiceId,
        speed: 0.8,
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
              ${doctor.agentPrompt}

              [Guidelines]
              1. Start with a warm greeting and mention you're a ${doctor.specialist}
              2. Ask short, clear questions to understand the patient's issue
              3. Provide simple, safe explanations or lifestyle suggestions
              4. Remember to provide medicines which will give relief
              5. If patient seems confused, re-explain in simpler words
              6. Be empathetic, supportive, and reassuring
              7. End with a positive note or safe next step
            `.trim()
          }
        ],
      },
    };

    console.log("🚀 Starting Vapi with config:", assistantOptions);

    vapi.start(assistantOptions);

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
          const newMsg = { role, text: transcript };
          setMessages((prev) => [...prev, newMsg]);
          setLiveTranscripts("");
          setCurrentRole(role);

          Promise.all([
            translateText(transcript, "hi"),
            translateText(transcript, "mr"),
          ]).then(([hindi, marathi]) => {
            setMessages((prev) =>
              prev.map((m) => (m === newMsg ? { ...m, hindi, marathi } : m))
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

  return (
    <div className="border-2 rounded-3xl p-10 bg-gray-100 dark:bg-slate-900">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 gap-1.5 flex items-center">
          <Circle
            className={`h-4 w-4 rounded-full ${
              callStarted ? "bg-green-400" : "bg-red-500"
            }`}
          />
          {callStarted ? "Connected" : "Not Connected"}
        </h2>
        <h2 className="font-medium text-xl text-gray-500">
          {formatTime(time)}
        </h2>
      </div>

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

          <div className="mt-10 w-full">
            {messages?.slice(-4).map((msg, index) => (
              <div
                key={index}
                className={`my-2 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
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
                    <p className="text-sm text-blue-500">
                      मराठी: {msg.marathi}
                    </p>
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

          {!callStarted ? (
            <Button
              className="mt-20 hover:scale-105 transition-all"
              onClick={startCall}
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <PhoneCallIcon />
              )}
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