import { MessageSquare, User, Users } from "lucide-react"
import { usePathname } from "next/navigation"
import { act, useMemo } from "react"

export const useNavigation = () => {
    const pathname =usePathname()
    const paths= useMemo(()=>[
        {
            name:"Conversation",
            href:"/chat/conversation",
            Icon: <MessageSquare/>,
            active: pathname.startsWith("/chat/conversation"),
        },
        {
            name:"doctors",
            href:"/chat/doctors",
            Icon: <Users/>,
            active: pathname==="/chat/doctors",
        }
    ],[pathname]);

    return paths;
}