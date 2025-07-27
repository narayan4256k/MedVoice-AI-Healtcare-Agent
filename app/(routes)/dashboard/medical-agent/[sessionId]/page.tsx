"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DoctorAgent } from "../../_component/DoctorCard";
import {
  Circle,
  Loader,
  PhoneCallIcon,
  PhoneOff,
} from "lucide-react";
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
}

function MedicalVioceAgent() {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState<sessionDetails>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [currentRoll, setCurrentRoll] = useState<string>();
  const [liveTranscripts, setLiveTranscripts] = useState<string>();
  const [messages, setMessages] = useState<messages[]>([]);

  useEffect(() => {
    sessionId && getSessionDetails();
  }, [sessionId]);

  const getSessionDetails = async () => {
    const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
    console.log(result.data);
    setSessionDetails(result.data);
  };

  const startCall = () => {        
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setLoading(true);
    setVapiInstance(vapi);
    // Smartly pick the assistant ID based on doctor ID
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
        if (transcriptType === "partial")
        {
          setLiveTranscripts(transcript);
          setCurrentRoll(role);
        }
        else if (transcriptType === "final") {
          setMessages((prev:any ) => [...prev, { role, text: transcript }]);
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

  const disconnectCall = () => {
    setLoading(true);
    if (!vapiInstance) return;
    console.log(vapiInstance);
    vapiInstance.stop();
    vapiInstance.off("call-start");
    vapiInstance.off("call-end");
    vapiInstance.off("message");
    setCallStarted(false);
    setVapiInstance(null); // Clear the instance
    setLoading(false);
  };

  

  return (
    <div className="border-2 rounded-3xl p-10 bg-gray-100">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 gap-1.5 flex items-center">
          <Circle
            className={`h-4 w-4 rounded-full ${
              callStarted ? "bg-green-400" : "bg-red-500"
            }`}
          />
          {callStarted ? "Connected" : "Not Connected"}
        </h2>
        <h2 className="font-medium text-xl text-gray-500">00:00</h2>
      </div>
      {sessionDetails && (
        <div className="flex flex-col items-center mt-10">
          <Image
            src={sessionDetails?.selectedDoctor?.image}
            alt={sessionDetails?.selectedDoctor.specialist ?? ""}
            width={80}
            height={80}
            className="h-[100px] w-[100px] object-cover rounded-full"
          />
          <h2 className="text-lg font-bold text-black mt-2">
            {sessionDetails?.selectedDoctor.specialist}
          </h2>
          <p className="text-sm">AI Medical Voice Agent</p>

          <div className="mt-30">
            {messages?.slice(-4).map((msg, index) => (
              <div key={index} className={`my-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                <p className={`inline-block px-10 py-1 rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                  {msg.text}
                </p>
              </div>
            ))}
            {liveTranscripts&&liveTranscripts?.length>0&&<p className="text-3xl text-black">{currentRoll}:{liveTranscripts}</p>}
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
              className="mt-20 hover:scale-105 transition-all"
              onClick={disconnectCall}
              disabled={loading}
              variant={"destructive"}
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
