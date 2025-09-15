import { FlipWords } from "@/components/ui/flip-words";
import React from "react";

export function FlipWordsDemo() {
  const words = [
  "Analyze your symptoms and suggest doctors",
  "Talk with you in real-time",
  "Generate reports based on your conversations with doctors",
  "Answer your health-related questions",
  "Provide multi-language support"
];

  return (
    <div className="h-[10rem] flex justify-center items-center px-4">
      <div className="text-[15px] p-10 mx-auto font-normal md:text-xl lg:text-3xl 2xl:text-4xl text-neutral-600 dark:text-neutral-400">
        An AI Medical Agent that
        <FlipWords words={words} className="text-blue-500 dark:text-blue-500" /> 
      </div>
    </div>
  );
}