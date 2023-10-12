'use client'
import {
    ChevronDownIcon,

  } from "@radix-ui/react-icons"
  
  import { Button } from "./ui/button"

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "./ui/dropdown-menu"
import Link from "next/link"

import { useRouter } from "next/navigation"
import { User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import useGetSession from "@/lib/hooks/useGetSession"


  
  export function Account() {
    const supabase = createClientComponentClient()
    const handleSignOut = async () => {
      await supabase.auth.signOut()
      router.push('/auth')
      router.refresh()
    }
  const { session, image, name}=useGetSession()
    const router=useRouter()
  const user=session?.user
    return (
    
          <div className="flex items-center space-x-1 rounded-md bg-accent text-accent-foreground">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
            <Button variant='ghost' className="px-3 shadow-none text-primary">
         <div className="flex space-x-1 justify-center items-center">
         <User className="mr-2 h-4 w-4 text-primary" />
          <p className="text-primary">Account</p>
             <ChevronDownIcon className="h-4 w-4 text-primary" />
         </div>
            </Button>
           
           
            
             
             
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                alignOffset={-5}
                className="w-[250px]"
                forceMount
              >
                <DropdownMenuLabel>{session? "Hi" : "Have an account?"}</DropdownMenuLabel>
              {user &&  <DropdownMenuItem>
                <div className="flex items-center text-xs">
        <Avatar className="h-7 w-7">
          <AvatarImage src={image?? "/c.jpg"} alt="Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
        {name  && <p className=" font-medium leading-none">{name}</p>}
      { user?.email &&  <p className=" text-muted-foreground">
          {user.email}
          </p>}
        </div>
        </div>
                </DropdownMenuItem>}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
            <Link href={'/auth'} className="w-full">
          {  !session && <Button className="w-full" onClick={  ()=> { router.replace('/auth')}}>
            Login
             </Button>}
             {  session && <Button className="w-full bg-destructive hover:bg-opacity-30 hover:bg-destructive" onClick={  handleSignOut}>
            Logout
             </Button>}
            </Link>
                </DropdownMenuItem>
           
         
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        
    )
  }