import { MessageSquare, User, Users } from "lucide-react"
import { usePathname } from "next/navigation"
import { act, useMemo } from "react"

export const useNavigation = () => {
    const pathname =usePathname()
    const paths= useMemo(()=>[
        {
            name:"Conversation",
            href:"/conversation",
            Icon: <MessageSquare/>,
            active: pathname.startsWith("/conversation"),
        },
        {
            name:"doctors",
            href:"/doctors",
            Icon: <Users/>,
            active: pathname==="/doctors",
        }
    ],[pathname]);

    return paths;
}