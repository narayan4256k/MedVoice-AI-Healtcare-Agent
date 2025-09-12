import { AIDoctorAgents } from "@/shared/list";
import React from "react";
import DoctorCard, { DoctorAgent } from "./DoctorCard";
import { motion } from "framer-motion";

type Props = {
  onStartConsultation: (doctor: DoctorAgent) => void;
};

function DoctorAgentList({ onStartConsultation }: Props) {
  return (
    <>
      <h2 className="mt-10 font-bold text-2xl pb-5">AI Specialist Doctors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 items-center gap-5 ">
        {AIDoctorAgents.map((doctor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{duration: 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
            }}
            className="mt-3"
          >
            <DoctorCard
              info={doctor}
              onStartConsultation={onStartConsultation}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
export default DoctorAgentList;
