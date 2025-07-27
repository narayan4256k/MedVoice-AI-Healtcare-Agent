import { AIDoctorAgents } from '@/shared/list'
import React from 'react'
import DoctorCard, { DoctorAgent } from './DoctorCard'

type Props = {
  onStartConsultation: (doctor: DoctorAgent) => void;
};

function DoctorAgentList({ onStartConsultation }: Props) {
  return (
    <div className='mt-10'>
      <h2 className='font-bold text-2xl pb-5'>AI Specialist Doctors</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-5'>
        {AIDoctorAgents.map((doctor, index) => (
          <DoctorCard key={index} info={doctor} onStartConsultation={onStartConsultation} />
        ))}
      </div>
    </div>
  );
}
export default DoctorAgentList;