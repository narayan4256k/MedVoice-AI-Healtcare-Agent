"use client";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";

export function TypewriterEffectSmoothDemo() {
    const words = [
    { text: "Advanced", className: " bg-text:black dark:text-white" },
    { text: "Features", className: " bg-text:black dark:text-white" },
    { text: "For", className: " bg-text:black dark:text-white" },
    { text: "Smarter", className: " bg-text:black dark:text-white" },
    { text: "Healthcare", className: "text-blue-500 dark:text-blue-500" },
    ];



  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  // once:false → trigger every time you scroll in
  // amount:0.4 → start when 40% of the element is visible

  return (
    <div ref={ref} className="flex flex-col items-center justify-center ">
      {isInView && (
        <TypewriterEffectSmooth key={String(isInView)} words={words} />
      )}
    </div>
  );
}
