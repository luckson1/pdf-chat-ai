
'use client'
import Image from "next/image";
import Link from "next/link";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { type LucideProps } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { Icons } from "@/components/Icons";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;
const Google = (props: LucideProps) => {
  return (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  );
};

function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast()
  const [email, setEmail] = useState("");

  const signInWithGoogle = async () => {
  try {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/" })
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
      await signIn('email', { callbackUrl: "/" , email})
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  };
  return (
    <div className={cn("grid gap-6", className)} {...props}>
  
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await signInWithEmail(email);
        }}
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
          {emailSent && (
            <p className="text-sm font-medium">
              A magic link has been sent to your email. Follow it to login
            </p>
          )}
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
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
                "url(https://res.cloudinary.com/dhciks96e/image/upload/v1691673245/lindsey-savage-p4vru5GkP6s-unsplash_krebsm.jpg)",
            }}
          />
          <div className="relative z-20 flex items-center text-lg font-medium text-slate-700">
            <Image
              src={
                "https://res.cloudinary.com/dhciks96e/image/upload/v1686921534/Screen_Shot_2023-06-16_at_1.45.31_PM-removebg-preview_r97cfc.png"
              }
              height={50}
              width={50}
              alt="Pic Craft"
              className="mr-2 h-6 w-6"
            />{" "}
          Pic Craft 
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg text-slate-900">{siteConfig.description}</p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to Pic Craft
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
