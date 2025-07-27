'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
import AddSession from './AddSession'

function HistoryList() {
    const [historyList,setHistoryList] =useState([])
  return (
    <div className='mt-5'>
        {historyList.length ==0 ? 
        <div className='flex flex-col items-center border border-gray-300 border-3 rounded-2xl p-7 '>
            <Image 
            src={'/Dashboardbg.png'}
            height={500}
            width={500}
            alt='empty'
            />
            <h2 className='text-2xl font-bold mt-4'>No Recent Consultations</h2>
            <p className='mb-4'>It looks like you haven't consulted with any doctors yet.</p>
            <AddSession/>
        </div>
        :
        <div>

        </div>
        }
    </div>
  )
}

export default HistoryList