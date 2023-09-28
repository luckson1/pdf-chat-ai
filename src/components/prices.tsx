import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export default function Credits() {
  const benefits = [
    "Upto 1.5 hours of audio transcription",
    "Unlimited documents",
    "Upload files larger than 3 mbs",
    "Premium support by email ",
    "Ability to request features",

    "Early access to new features",

    "Secure your discount forever",
  ];

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center py-2 container" id="pricing">
      <main className="mb-8 mt-4 flex w-full flex-1 flex-col items-center space-y-10 justify-center px-4 text-center sm:mb-0">
        <h1 className="text-4xl font-bold">
          Save time reading for your assignments and exams
        </h1>
        <p>Join hundreds of happy customers.</p>
        <Card>
          <CardHeader>
            <CardTitle>A buy a whole year of access</CardTitle>
            <CardDescription>
              Chat with your docs and transcribe your lectures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col space-y-4">
              {benefits.map((b) => (
                <li className="flex flex-row gap-2   items-center" key={b}>
                  {" "}
                  <CheckIcon className="text-green-500" />
                  <p>{b}</p>
                </li>
              ))}
            </ul>
            <div className="block">
            <div className="flex items-start  space-x-5 my-5">

  <span className="text-green-500 font-bold text-7xl">$59</span> 
  <span className="text-red-500 mr-2 line-through text-4xl text-bold"> {" "}$129 {" "}</span>
</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size={"lg"}>
              <Link href="https://app.piccraftai.com/auth">
                Save time 
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
