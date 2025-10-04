'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import AddSession from './AddSession'
import axios from 'axios'
import HistoryTable from './HistoryTable'
import { Loader2 } from 'lucide-react'
import { DoctorAgent } from './DoctorCard'

export type SessionDetails = {
  id: number;
  notes: string;
  sessionId: string;
  report: any;
  selectedDoctor: DoctorAgent;
  createdOn: string;
};

function HistoryList() {
  const [historyList, setHistoryList] = useState<SessionDetails[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    GetHistoryList()
  }, [])

  const GetHistoryList = async () => {
    const result = await axios.get("/api/session-chat?sessionId=all")
    console.log(result.data)
    setHistoryList(result.data)

    if (result.data.length > 0) {
      setLoading(true)
      const timer = setTimeout(() => {
        setLoading(false)
      }, 2000) // wait 5 seconds
      return () => clearTimeout(timer)
    }
  }

  return (
    <div className='mt-5'>
      {historyList.length === 0 ? (
        <div className='flex flex-col items-center border-3 border-gray-300 rounded-2xl p-7 '>
          <Image
            src={'/Dashboardbg.png'}
            height={500}
            width={500}
            alt='empty'
          />
          <h2 className='text-2xl font-bold mt-4'>No Recent Consultations</h2>
          <p className='mb-4'>It looks like you haven't consulted with any doctors yet.</p>
          <AddSession />
        </div>
      ) : loading ? (
        // Loader while waiting 5s
        <div className='flex justify-center items-center h-120'>
        <Loader2 className='animate-spin h-15 w-15 text-blue-500'/>
        </div>
      ) : (
        <div>
          <HistoryTable historyList={historyList} />
        </div>
      )}
    </div>
  )
}

export default HistoryList
