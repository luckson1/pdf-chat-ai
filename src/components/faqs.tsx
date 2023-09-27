import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export default function Faqs() {
    const faqs = [
        {
          heading: "How does the app convert study materials into chat format?",
          body: "The app uses advanced AI embedding technology to transform text-based study materials into chat-friendly conversations."
        },
        {
          heading: "Can I use this app for both textbooks and online articles?",
          body: "Yes, our app is designed to work with a wide range of study materials, including textbooks, articles, and more. Supported file types include: .pdf, .doc, .docx, .md, .ppt, .epub, .txt "
        },
        {
          heading: "What audio formats are supported for lecture recordings?",
          body: "The app supports common audio formats such as MP3,  mp4, WAV etc for recording and transcription."
        },
        {
          heading: "How accurate is the transcription feature?",
          body: "Our AI transcription feature boasts high accuracy, but it may vary depending on factors like audio quality and background noise."
        },
        {
          heading: "Is my study data and personal information secure with the app?",
          body: "We take data security seriously. Your information is encrypted and protected following industry standards."
        },
      
        {
          heading: "Does the app work without an internet connection?",
          body: "The app needs internet to work"
        },
        {
          heading: "On which devices and platforms can I use the app?",
          body: "Our app is available on a variety of devices web browsers."
        },
        {
          heading: "Is there a trial version available for me to test before subscribing?",
          body: "Yes, we offer a free trial period during which you can explore the app's features and decide if it suits your needs."
        },
        {
          heading: "What are the pricing options for the app, and do you offer student discounts?",
          body: "We offer various subscription plans, including a free basic version and premium plans at different price points. Additionally, we may have special discounts for students, so be sure to check for any ongoing promotions."
        }
      ];
      
  return (
    <div className='flex flex-col space-y-5 w-full max-w-4xl mx-auto my-10'>
  <p className='text-5xl my-5'>Frequently asked questions</p>

    <Accordion type="single" collapsible className='w-full'>
      
        {faqs.map((faq, index)=> (
    <AccordionItem value={faq.heading} key={faq.heading} >
      <AccordionTrigger>{faq.heading}</AccordionTrigger>
      <AccordionContent>
      {faq.body}
      </AccordionContent>
    </AccordionItem>))}
  </Accordion>
  


    </div>
  )
}
