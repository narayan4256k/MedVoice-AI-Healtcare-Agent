'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import HistoryList from './_component/HistoryList';
import DoctorAgentList from './_component/DoctorAgentList';
import AddSession from './_component/AddSession';
import DoctorCard, { DoctorAgent } from './_component/DoctorCard';
import { FlipWordsDemo } from '@/app/_components/Flip';
import AddChat from './_component/AddChat';

 // import type

function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const startSessionWithDoctor = async (doctor: DoctorAgent) => {
  try {
    setLoading(true);
    console.log("Starting consultation with doctor:", doctor);

    const res = await axios.post('/api/session-chat', {
      selectedDoctor: doctor,
      notes: `Consultation with ${doctor.specialist}`,
    });

    console.log("Response from /api/session-chat:", res.data);

    if (res.data?.sessionId) {
      console.log("Navigating to session:", res.data.sessionId);
      router.push(`/dashboard/medical-agent/${res.data.sessionId}`);
    } else {
      console.warn("No sessionId in response!");
    }
  } catch (err) {
    console.error('Error starting session:', err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <div className='flex justify-between items p-2 items-center'>
        <h2 className='text-2xl font-bold'>My DashBoard</h2>
        <div className='flex gap-2'>
          <AddChat/>
          <AddSession />
        </div>
      </div>
      <HistoryList />
      <DoctorAgentList onStartConsultation={startSessionWithDoctor} />
    </div>
  );
}

export default Dashboard;
