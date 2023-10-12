'use server'

import { prisma } from "@/server/db";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


export const getUserServer= async()=> {
    const cookieStore = cookies()
const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
const user=await supabase.auth.getUser()
 const usersId =user?.data?.user?.id;
 const signedInUser= await prisma.users.findUniqueOrThrow({
    where: {
      id: usersId,
    },
  select: {
    Profile: {
      select: {
        isPro: true
      }
    }
  }
  })
const isPro=signedInUser.Profile?.isPro
 return {isPro, usersId}
}