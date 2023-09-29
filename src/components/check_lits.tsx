"use client";
import {
  CheckIcon,
  CheckboxIcon,
  ImageIcon,
  LightningBoltIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import { DollarSign, ShieldIcon, StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CheckList() {
  const router = useRouter();
  return (
  <div className="pt-16 flex flex-col space-y-10 justify-center items-center w-full">
      <Badge className={cn('animate-bounce w-fit space-x-1 ')}>
<strong>Limited Offer: </strong> <span >Whole year access for </span> <span  className="line-through font-bold text-red-400">$129 </span>{" "} <strong className="text-green-500"> $59</strong>
          </Badge>
      <Card className="w-full h-auto bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-primary via-purple-300 to-primary text-primary-foreground py-10">
      <CardHeader className="text-center text-2xl">
        <CardTitle>Why Chat Paperz?</CardTitle>
        <CardDescription className="text-primary-foreground text-lg">
          Try it out for <span className="font-bold tracking-widest">Free</span>, chat with your course resources. Save time reading for your assignments or exams
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0  w-full justify-between items-center ">
          <ul className="space-y-7 w-full max-w-sm">
            <li className="flex flex-row space-x-4">
              <CheckboxIcon className="h-8 w-8 text-primary-foreground" />
              <div className=" w-full ">
                <p className="font-bold">Why read when you can ask?</p>
                <p className="font-light text-sm tracking-wider">
                Chat with documents such as pdfs, word documents, excel, epub and audio files. Ask away, summarize, find facts, and have a blast doing it! 
                </p>
              </div>
            </li>
            <li className="flex flex-row space-x-4">
              <CheckboxIcon  className="h-8 w-8 text-primary-foreground" />
              <div className=" w-full ">
                <p className="font-bold">How about a lecture recap? </p>
                <p className="font-light text-sm tracking-wider">
                Record your prof, let our AI jot it down, then chat away with your notes!
                </p>
              </div>
            </li>
            <li className="flex flex-row space-x-4">
              <CheckboxIcon  className="h-8 w-8 text-primary-foreground" />
              <div className=" w-full ">
                <p className="font-bold">Tired of ChatGTP making up staff? </p>
                <p className="font-light text-sm tracking-wider">
                Get instant answers with <strong className="font-bold"> cited sources</strong>, every response is backed by citations
                </p>
              </div>
            </li>
         
          </ul>
          <Separator
            orientation="horizontal"
            className="md:hidden bg-primary-foreground"
          />

          <div className="w-full flex flex-col space-y-7 max-w-xs">
            <Badge variant="secondary" className="w-fit">
              SPECIAL BETA PRICE
            </Badge>

            <div className="block">
            <div className="flex items-start  space-x-5">

  <span className="text-green-500 font-bold text-7xl">$59</span> 
  <span className="text-red-500 mr-2 line-through text-4xl text-bold"> {" "}$129 {" "}</span>
</div>






              <p className="text-xl tracking-widest font-light">
              For a whole year of access
              </p>
            </div>
           <div className=" flex flex-row space-x-3 items-center">
<ShieldIcon className="w-5 h-5"/>
<p className="font-light tracking-widest text-xs">14-days money-back guarantee

</p>
           </div>
            <Button
              size={"lg"}
              className="w-full"
              variant={"secondary"}
              onClick={() => {
                router.replace("/auth");
              }}
            >
              Claim your discount now
            </Button>
          </div>
          <Separator
            orientation="horizontal"
            className="md:hidden bg-primary-foreground"
          />

<ul className="space-y-7 w-full max-w-sm">
            <li className="flex flex-row space-x-4">
              <LightningBoltIcon className="h-8 w-8 text-primary-foreground" />
              <div className=" w-full ">
                <p className="font-bold">Premium Chat support</p>
                <p className="font-light text-sm tracking-wider">
                  We will offer swift and helpful support
                </p>
              </div>
            </li>
            <li className="flex flex-row space-x-4">
              <LockClosedIcon className="h-8 w-8 text-primary-foreground" />
              <div className=" w-full ">
                <p className="font-bold">Simple and Secure</p>
                <p className="font-light text-sm tracking-wider">
                Fast, easy, free & secure! Files are stored in a secure cloud storage and will never be shared.
                </p>
              </div>
            </li>
            <li className="flex flex-row space-x-4">
              <DollarSign className="h-8 w-8 text-primary-foreground" />
              <div className=" w-full ">
                <p className="font-bold">Lock-in beta discount</p>
                <p className="font-light text-sm tracking-wider">
                  Prices will go up, your membership price will stay the same.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  </div>
  );
}
