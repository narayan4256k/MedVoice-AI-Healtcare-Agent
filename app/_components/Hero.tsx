"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSectionOne() {
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.3,
  });

  useEffect(() => {
      setAnimationTrigger((prev) => prev + 1);
  }, [inView]);

  return (
    <div className="relative my-3 flex flex-col items-center justify-center h-screen">  
      

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
                  duration: 0.85,
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
          className="relative z-10 mx-auto max-w-3xl mt-30 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Get immediate answers to medical questions, understand symptoms, and
          receive trusted health information powered by advanced artificial
          intelligence.
        </motion.p>

        {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-8"
          >
            <Link href={"/dashboard"}>
            <Button className="w-[200px] bg-blue-600 text-neutral-100 hover:bg-blue-800">Get Started</Button>
            </Link>
            <Button variant={"secondary"}className="w-[200px]">Know More</Button>
            
          </motion.div>
      </div>
    </div>
  );
}
