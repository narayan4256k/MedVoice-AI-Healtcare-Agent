"use client";
import { PinContainer } from "@/components/ui/3d-pin";
import React from "react";

export function AnimatedPinDemo() {
  return (
    <div className="bg-white dark:bg-slate-900 shadow-lg rounded-2xl p-8">
      <PinContainer
        title="Pune , India"
        href="https://twitter.com/mannupaaji"
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
            Find Us Here
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500">
                We are located in Pune, India. Visit us for any inquiries or support.
            </span>
          </div>

          {/* Replaced gradient div with Google Maps iframe */}
          <div className="flex-1 w-full mt-4 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115069.14634302014!2d73.78056543154413!3d18.524598599502376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e1!3m2!1sen!2sin!4v1757917679953!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </PinContainer>
    </div>
  );
}
