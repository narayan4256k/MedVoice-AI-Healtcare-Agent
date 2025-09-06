"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DoctorAgent } from "../../_component/DoctorCard";
import { Circle, Loader, PhoneCallIcon, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";

type sessionDetails = {
  id: Number;
  notes: String;
  sessionId: String;
  report: JSON;
  selectedDoctor: DoctorAgent;
  createdOn: String;
};
type messages = {
  role: string;
  text: string;
};

function MedicalVioceAgent() {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState<sessionDetails>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [currentRoll, setCurrentRoll] = useState<string>();
  const [liveTranscripts, setLiveTranscripts] = useState<string>();
  const [messages, setMessages] = useState<messages[]>([]);

  // 1. Add new state for the timer
  const [time, setTime] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    sessionId && getSessionDetails();
  }, [sessionId]);

  // 2. Add a new useEffect hook for the timer logic
  useEffect(() => {
    if (callStarted) {
      // Clear any existing timer to prevent multiple timers running
      if (timerId) clearInterval(timerId);

      // Start a new timer and store its ID
      setTime(0); // Reset time for the new call
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setTimerId(id);
    } else {
      // If the call ends, stop and clear the timer
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
    }

    // Cleanup function to clear the timer when the component unmounts
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [callStarted]); // Rerun this effect whenever callStarted changes

  // 3. Helper function to format the time
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const getSessionDetails = async () => {
    const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
    console.log(result.data);
    setSessionDetails(result.data);
  };

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
      console.log("Call started");
      setCallStarted(true);
      setLoading(false);
    });
    vapi.on("call-end", () => {
      console.log("Call ended");
      setCallStarted(false);
      setLoading(false);
    });
    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        const { role, transcript, transcriptType } = message;
        console.log(`${message.role}: ${message.transcript}`);
        if (transcriptType === "partial") {
          setLiveTranscripts(transcript);
          setCurrentRoll(role);
        } else if (transcriptType === "final") {
          setMessages((prev: any) => [...prev, { role, text: transcript }]);
          setLiveTranscripts("");
          setCurrentRoll(role);
        }
      }
    });

    vapiInstance.on("speech-start", () => {
      console.log("Assistant started speaking");
      setCurrentRoll("assistant");
    });
    vapiInstance.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setCurrentRoll("user");
    });
  };

  const disconnectCall = async () => {
    setLoading(true);
    if (!vapiInstance) return;
    console.log(vapiInstance);
    vapiInstance.stop();
    vapiInstance.off("call-start");
    vapiInstance.off("call-end");
    vapiInstance.off("message");
    setCallStarted(false);
    setVapiInstance(null); // Clear the instance
    const result = await GenerateReport();
    setLoading(false);
  };

  const GenerateReport = async () => {
    const result = await axios.post("/api/generate-report", {
      messages: messages,
      sessionDetails: sessionDetails,
      sessionId: sessionId,
    });
    console.log(result.data);
    return result.data;
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
        {/* 4. Display the formatted time */}
        <h2 className="font-medium text-xl text-gray-500">
          {formatTime(time)}
        </h2>
      </div>
      {sessionDetails && (
        <div className="flex flex-col items-center mt-10">
          <Image
            src={sessionDetails?.selectedDoctor?.image}
            alt={sessionDetails?.selectedDoctor.specialist ?? ""}
            width={80}
            height={80}
            className="h-[100px] w-[100px] object-cover rounded-full "
          />
          <h2 className="text-lg font-bold text-black dark:text-gray-300 mt-2">
            {sessionDetails?.selectedDoctor.specialist}
          </h2>
          <p className="text-sm dark:text-gray-500">AI Medical Voice Agent</p>

          <div className="mt-30">
            {messages?.slice(-4).map((msg, index) => (
              <div
                key={index}
                className={`my-2 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <p
                  className={`inline-block px-10 py-1 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white dark:bg-blue-700"
                      : "bg-gray-300 text-black dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            ))}
            {liveTranscripts && liveTranscripts?.length > 0 && (
              <p className="text-2xl text-black dark:text-gray-300 mt-10">
                {currentRoll}:{liveTranscripts}
              </p>
            )}
          </div>
          {!callStarted ? (
            <Button
              className="mt-20 hover:scale-105 transition-all"
              onClick={startCall}
              disabled={loading}
            >
              {loading && <Loader className="animate-spin" />}
              <PhoneCallIcon />
              {loading ? "Connecting..." : "Start Call"}
            </Button>
          ) : (
            <Button
              variant="destructive"
              className="mt-20 hover:scale-105 transition-all"
              onClick={disconnectCall}
              disabled={loading}
            >
              {" "}
              {loading && <Loader className="animate-spin" />}
              <PhoneOff />
              {loading ? "Discnnecting..." : "Disconnect"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default MedicalVioceAgent;