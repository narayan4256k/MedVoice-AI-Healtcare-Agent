"use client";

import { ModeToggle } from '@/app/_components/toggle';
import { UserButton } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const MenuOptions = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "History",
    link: "/dashboard/history",
  },
  {
    id: 3,
    name: "Pricing",
    link: "/dashboard/billing",
  },
  {
    id: 4,
    name: "Profile",
    link: "/profile",
  },
];
 

function AppHeader() {
  const { theme } = useTheme();
  return (
    <div className='flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40'>
        <Image
                    src={theme === "dark"||theme ==="system" ? "/darklogo.png" : "/lightlogo.png"} // 👈 conditional logo
                    alt="Logo"
                    width={120}
                    height={70}
                    className="h-13 w-45 mx-7"
                  />
            <div className="grid grid-cols-4 md:flex items-center gap-10">
              {MenuOptions.map((option) => (
                <Link key={option.id} href={option.link}>
                  <h2 className="hover:scale-110 hover:font-bold cursor-pointer transition-all">
                    {option.name}
                  </h2>
                </Link>
              ))}
            </div>

        <div className='items-center gap-4 hidden md:flex'>
          <UserButton/>
          <ModeToggle/>
       </div>
    </div>
  )
}

export default AppHeader