import React from 'react'
import { DoctorAgent } from './DoctorCard'
import Image from 'next/image'

type Props = {
    DoctorAgent: DoctorAgent,
    setSelectedDoctor: any
    selectedDoctor: DoctorAgent 
}

function SuggestedDoctorCard({DoctorAgent,setSelectedDoctor,selectedDoctor}: Props) {
  return (
    <div className={`flex flex-col items-center border-2 rounded-xl shadow p-5 transition-all cursor-pointer
    ${selectedDoctor?.id === DoctorAgent.id ? 'border-blue-500' : 'border-gray-400'}
    hover:border-blue-500 hover:scale-105`}
  onClick={() => setSelectedDoctor(DoctorAgent)}>
        <Image src={DoctorAgent?.image} alt={DoctorAgent?.specialist} width={100} height={100} className='w-[100px] h-[100px] rounded-full object-cover'/>
        <h2 className='font-bold text-sm text-black dark:text-white text-center m-2'>{DoctorAgent?.specialist}</h2>
        <p className='text-xs text-center line-clamp-3'>{DoctorAgent?.description}</p>
    </div>
  )
}

export default SuggestedDoctorCard