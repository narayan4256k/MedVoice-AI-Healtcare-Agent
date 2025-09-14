import { HoverEffect } from "@/components/ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  {
    title: "AI Symptom Checker",
    description:
      "Describe your symptoms in natural language and get instant AI-powered analysis with possible conditions.",
  },
  {
    title: "Voice-Based Interaction",
    description:
      "Talk to the AI using your voice and receive spoken responses, making it easier for all age groups to use.",
  },
  {
    title: "Medicine Suggestions",
    description:
      "Get medicine recommendations based on your symptoms with clear dosage guidance (educational use only).",
  },
  {
    title: "Health Record Tracker",
    description:
      "Store and view your previous queries, symptoms, and suggestions in a secure, easy-to-access history.",
  },
  {
    title: "Multi-Language Support",
    description:
      "Seamless healthcare experience in your preferred language, including English, Hindi, Marathi, and more.",
  },
  {
    title: "24×7 Availability",
    description:
      "Connect with AI-powered doctors and specialists anytime, anywhere — healthcare without time limits.",
  },
];
