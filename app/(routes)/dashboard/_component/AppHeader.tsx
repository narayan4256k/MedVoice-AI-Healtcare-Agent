import { UserButton } from '@clerk/nextjs';
import Image from 'next/image'
import React from 'react'

const MenuOptions = [
  {
    id: 1,
    name: "Home",
    link: "/dashboard",
  },
  {
    id: 2,
    name: "History",
    link: "/history",
  },
  {
    id: 3,
    name: "Pricing",
    link: "/pricing",
  },
  {
    id: 4,
    name: "Profile",
    link: "/profile",
  },
];

function AppHeader() {
  return (
    <div className='flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40 '>
        <Image src="/ai-medical.png" alt="Logo" width={120} height={70} className="h-10 w-30 mx-7" />
        <div className='hidden md:flex items-center gap-10 '>
          {MenuOptions.map((option,index) => (
            <div key={index}>
                <h2 className='hover:scale-110 hover:font-bold cursor-pointer transition-all'>{option.name}</h2>
            </div>
          ))}
        </div>
       <UserButton/>
    </div>
  )
}

export default AppHeader