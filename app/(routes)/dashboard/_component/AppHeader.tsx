"use client";

import { ModeToggle } from "@/app/_components/toggle";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const MenuOptions = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "History", link: "/dashboard/history" },
  { id: 3, name: "Pricing", link: "/dashboard/billing" },
];

function AppHeader() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="shadow">
      <div className="flex items-center justify-between p-4 px-3 md:px-20 lg:px-40">
        {/* Logo */}
        <Image
          src={
            theme === "dark" || theme === "system"
              ? "/darklogo.png"
              : "/lightlogo.png"
          }
          alt="Logo"
          width={120}
          height={70}
          className="h-13 w-45 mx-7"
        />

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10 ">
          {MenuOptions.map((option) => (
            <Link key={option.id} href={option.link}>
              <h2 className="hover:scale-110 hover:font-bold cursor-pointer transition-all">
                {option.name}
              </h2>
            </Link>
          ))}
        </nav>

        {/* Right Side - Desktop Only */}
        <div className="hidden md:flex items-center gap-4">
          <UserButton />
          <ModeToggle />
        </div>

        {/* Hamburger Button - Mobile */}
        <div className="w-[150px] flex gap-5 md:hidden">                  
            <UserButton />
            <ModeToggle/>
          <button
            className="md:hidden text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Dropdown - Mobile */}
      {isOpen && (
        <div className="absolute md:hidden flex flex-col gap-4 p-4 bg-gray-200/85 dark:bg-slate-900/80 rounded-2xl right-2.5 w-30">
          {MenuOptions.map((option) => (
            <Link key={option.id} href={option.link}>
              <h2 className="hover:scale-105 hover:font-semibold cursor-pointer transition-all">
                {option.name}
              </h2>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default AppHeader;
