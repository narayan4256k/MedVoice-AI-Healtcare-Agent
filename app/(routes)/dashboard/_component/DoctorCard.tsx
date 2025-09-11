import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { IconArrowRampRight2, IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
export type DoctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
};
type Props = {
  info: DoctorAgent;
  onStartConsultation?: (doctor: DoctorAgent) => void;
};

function DoctorCard({ info, onStartConsultation }: Props) {
  return (
    <div className="border border-gray-300 border-2 rounded-lg p-2">
      <Image
        src={info.image}
        alt={info.specialist}
        width={300}
        height={200}
        className="w-full h-70 object-cover rounded-lg mb-3"
      />
      <h2 className="text-lg font-bold">{info.specialist}</h2>
      <p className="text-sm text-gray-500 line-clamp-2">{info.description}</p>

      <Button
        className="w-full mt-3 cursor-pointer"
        onClick={() => onStartConsultation?.(info)}
      >
        Start Consultation
        <IconArrowRight />
      </Button>
    </div>
  );
}

export default DoctorCard;
