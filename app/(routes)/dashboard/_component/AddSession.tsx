'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { DialogClose } from '@radix-ui/react-dialog'
import { ArrowRight, Loader2 } from 'lucide-react'
import axios from 'axios'
import DoctorCard, { DoctorAgent } from './DoctorCard'
import SuggestedDoctorCard from './SuggestedDoctorCard'
import { useRouter } from 'next/navigation'


function AddSession() {
  const [note,setNote]= useState<string>();
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<DoctorAgent[]>();
  const [selectedDoctor,setSelectedDoctor]=useState<DoctorAgent>();
  const router= useRouter();

  const onSubmit= async() => {
    setLoading(true);
    const result = await axios.post('/api/suggest-doctors', { note: note });
    console.log(result.data);
    setSuggestedDoctors(result.data);
    setLoading(false);
  }

  const StartConsultation = async() => {
    setLoading(true);
  //save all DoctorAgent to database
    const result=await axios.post('/api/session-chat', {
      notes: note,
      selectedDoctor: selectedDoctor
    })
    console.log(result.data);
    if(result.data?.sessionId){
      console.log(result.data.sessionId);
      //route to new conversation screen
      router.push('/dashboard/medical-agent/'+result.data.sessionId);
    }
    setLoading(false);
  }

  return (
    <Dialog>
  <DialogTrigger>
    <Button className='cursor-pointer'>+ Start a Consultation</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Basic Details</DialogTitle>
      <DialogDescription asChild>
        {!suggestedDoctors?<div>
            <h2 className='mb-2 text-gray-700 dark:text-gray-300'>Add Symptoms or Any other Details</h2>
            <Textarea placeholder='Add Details Here...' className='h-70' onChange={(e)=>setNote(e.target.value)}/>
        </div>:
        <div>
          <h2 className='mb-3 text-black text-xl'>Select the Doctor</h2>
        <div className='grid grid-cols-3 gap-3'>
          {/*Suggested Doctors */}
          {suggestedDoctors.map((doctor,index) =>(
            <SuggestedDoctorCard DoctorAgent={doctor} key={index} 
            setSelectedDoctor={()=>setSelectedDoctor(doctor)}
            //@ts-ignore
            selectedDoctor={selectedDoctor}/>
          ))}
        </div>
        </div>
          }
        {/* Display suggested doctors if available */}

      </DialogDescription>
    </DialogHeader>
      <DialogFooter>
        <DialogClose>          
          <Button variant={'destructive'}>Cancel</Button>
        </DialogClose>
        {!suggestedDoctors?<Button disabled={!note||loading} onClick={()=>onSubmit()}>
          {loading&&<Loader2 className='animate-spin'/>}
          Submit<ArrowRight/>
        </Button>:<Button onClick={()=>StartConsultation()} disabled={loading||!selectedDoctor}> {loading&&<Loader2 className='animate-spin'/>}Start Consultation<ArrowRight/>
        </Button>}
      </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default AddSession