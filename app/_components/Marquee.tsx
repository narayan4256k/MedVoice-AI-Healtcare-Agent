"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export function ThreeDMarqueeDemo() {
  const images = [
  "/ss5.png",
  "/ss2.png",
  "/ss6.png",
  "/ss0.png",
  "/ss7.png",
  "/ss6.png",
  "/ss4.png",
  "/ss2.png",
  "/ss5.png",
  "/ss1.png",
  "/ss7.png",
  "/ss6.png",
  "/ss0.png",
  "/ss3.png",
  "/ss2.png",
  "/ss4.png",
  "/ss1.png",
  "/ss2.png",
  "/ss7.png",
  "/ss6.png",
  "/ss4.png",
  "/ss5.png",
  "/ss6.png",
  "/ss1.png",
  "/ss0.png",
  "/ss0.png",
  "/ss2.png",
  "/ss2.png",
  "/ss6.png",
];

return (
    <div className="absolute  w-screen rounded-3xl bg-transparent -left-100 top-1/16 ring-1 ring-neutral-700/10 ">
      <ThreeDMarquee images={images} />
    </div> 
  );
}
