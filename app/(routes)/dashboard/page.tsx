import React from 'react'
import HistoryList from './_component/HistoryList'
import { Button } from '@/components/ui/button'
import DoctorAgentList from './_component/DoctorAgentList'
import AddSession from './_component/AddSession'

function Dashboard() {
  return (
    <div>
      <div className='flex justify-between items p-2 items-center'>
        <h2 className='text-2xl font-bold'>My DashBoard</h2>
        <AddSession/>
      </div>
      <HistoryList/>
      <DoctorAgentList/>
    </div>
  )
}

export default Dashboard