"use client"

import { ModeToggle } from "@/app/_components/toggle"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useNavigation } from "@/hooks/useNavigation"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

const DesktopNav = () => {
    const paths= useNavigation()
  return <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-[95vh] lg:w-16 lg:px-2 lg:py-4">
    <nav>
        <ul className="flex flex-col items-center gap-4">
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
        </ul>
    </nav>
    <div className="flex flex-col items-center gap-4">
        <ModeToggle/>
        <UserButton/>
    </div>
    </Card>
}

export default DesktopNav