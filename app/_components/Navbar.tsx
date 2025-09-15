"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

import { useState } from "react";
//import { AnimatedModalDemo } from "./AnimatedButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./toggle";
import { useTheme } from "next-themes";

export function NavbarDemo() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "/dashboard/billing",
    },
    {
      name: "Contact",
      link: "/ContactUs",
    },
  ];

  const { theme } = useTheme();
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="relative w-full bg-transparent">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <Image
            src={
              theme === "dark" || theme === "system"
                ? "/darklogo.png"
                : "/lightlogo.png"
            } // 👈 conditional logo
            alt="Logo"
            width={120}
            height={70}
            className="h-13 w-45 mx-7"
          />

          <NavItems items={navItems} />
          {user ? (
            <div className="flex items-center gap-4">
              <UserButton />
              <ModeToggle />
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="px-4 py-2 rounded-md text-sm font-bold relative cursor-pointer hover:opacity-90 bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
            >
              Login
            </Link>
          )}
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            {/* Left side → Logo + Dropdown Toggle */}
            <div className="flex items-center gap-4">
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
              <NavbarLogo />
            </div>

            {/* Right side → User + Theme Toggle */}
            <div className="flex items-center gap-4">
              <UserButton />
              <ModeToggle />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <Link href={"/dashboard"}>
                <Button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full"
                >
                  Dashboard
                </Button>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}
