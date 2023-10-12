
'use client'
import Image from "next/image";
import Link from "next/link";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { Icons } from "@/components/Icons";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()
  const supabase = createClientComponentClient()
  const signInWithGoogle = async () => {
  try {
    setIsLoading(true);
    const data=await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/documents`},
    })
  } catch (error) {
    toast({
    
      description: "Something went wrong",
      variant:'destructive',
      action: <ToastAction altText="Try again">Try Again</ToastAction>,
      
    })
  } finally {
    setIsLoading(false)
  }
  };

  const signInWithEmail = async (email: string) => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/documents`},
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  };
  return (
    <div className={cn("grid gap-6", className)} {...props}>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            Continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        onClick={signInWithGoogle}
        // disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}

export default function AuthenticationPage() {
  return (
    <div className=" py-16  w-full   mx-auto md:px-8  lg:max-w-screen-xl">
      <div className="container relative  grid h-[600px] flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0 rounded-md shadow">
        <div className=":flex relative  h-full flex-col bg-muted p-10 text-white dark:border-r">
          <div
            className="absolute inset-0 bg-cover rounded-md lg:rounded-none lg:rounded-l-md"
            style={{
              backgroundImage:
               ` url(https://res.cloudinary.com/dhciks96e/image/upload/v1696276515/chatpaperzshare_d6vjxb.png)`,
            }}
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image
              src={
                "https://res.cloudinary.com/dhciks96e/image/upload/v1686921534/Screen_Shot_2023-06-16_at_1.45.31_PM-removebg-preview_r97cfc.png"
              }
              height={50}
              width={50}
              alt="Chat Paperz"
              className="mr-2 h-6 w-6"
            />{" "}
          Chat Paperz 
          </div>
          <div className="relative z-20 mt-auto hidden md:block">
            <blockquote className="space-y-2">
              <p className="text-lg">{siteConfig.description}</p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to Chat Paperz
              </h1>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
