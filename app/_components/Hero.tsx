"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroSectionOne() {
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.3,
  });

  useEffect(() => {
      setAnimationTrigger((prev) => prev + 1);
  }, [inView]);

  return (
    <div className="relative my-3 flex flex-col items-center justify-center">
      {/* Fancy vertical lines on left/right */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="px-4 py-10 md:py-20" ref={ref}>
        {/* Animated Heading */}
        <h1 className="relative z-10 mx-auto max-w-6xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-6xl dark:text-slate-300 hover:scale-103 transition-transform duration-300">
          {"🩺Smarter Health Starts Here: Meet Your AI Medical Agent"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={`${animationTrigger}-${index}`} // 🔑 This forces re-render on every scroll in
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-3xl my-10 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Get immediate answers to medical questions, understand symptoms, and
          receive trusted health information powered by advanced artificial
          intelligence.
        </motion.p>

        {/* Buttons */}
        <Link href="/dashboard">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Get Started
            </button>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
