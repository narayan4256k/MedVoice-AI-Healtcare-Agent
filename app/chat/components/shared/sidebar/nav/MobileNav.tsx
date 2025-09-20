"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useNavigation } from "@/hooks/useNavigation"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

const MobileNav = () => {
    const paths= useNavigation()
  return <Card className="fixed bottom-4 flex lg:hidden flex-row h-16 w-[calc(100vw-32px)] items-center  px-2 py-4">
    <nav className="w-full">
        <ul className="flex  items-center justify-evenly">
        {paths.map((path,id)=>{
            return <li key={id} className="relative">
                <Link href={path.href}>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button variant={path.active?"default":"outline"} className="p-0 w-10 h-10 rounded-md">
                                {path.Icon}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{path.name}</p>
                        </TooltipContent>
                    </Tooltip>
                </Link>
                </li> 
        })}
        <li className="">
            <UserButton/>
        </li>
    </ul>
    </nav>
    </Card>
}

export default MobileNav