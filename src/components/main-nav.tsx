"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "../lib/utils";
import { useSession } from "next-auth/react";
import { Session} from "next-auth";
import { siteConfig } from "@/lib/config";



export default function Credits({session}: {session: Session}) {
  const credits=session.user.credits
  console.log(session.user)
  return (
   <>
    <Link
            href={"/credits"}
            className={cn("flex items-center px-4", "font-bold ")}
          >
        Credits:    {credits}
          </Link>
   </>
  )
}


export function MainNav() {
  const { data: session } = useSession();
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-4">
        <Image
          className="h-8 w-8"
          alt="logo"
          src={"https://res.cloudinary.com/dhciks96e/image/upload/v1686921534/Screen_Shot_2023-06-16_at_1.45.31_PM-removebg-preview_r97cfc.png"}
          height={50}
          width={50}
        />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
     <Link
          href={"/documents"}
          className={cn("flex items-center px-4", "font-bold ")}
        >
        Documents
        </Link>
      </nav>
    </div>
  );
}
