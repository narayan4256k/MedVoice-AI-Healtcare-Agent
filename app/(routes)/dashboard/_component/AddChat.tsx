import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function AddChat() {
  return (
    <div>
        <Link href={"/chat/conversation"}>
        <Button className='cursor-pointer text-[10px] md:text-xs lg:text-[13px] xl:text-[15px] 2xl:text-[17px]' >+ Start a Chat Consultation</Button>
        </Link>
    </div>
  )
}

export default AddChat