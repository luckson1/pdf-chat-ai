
import React from 'react'
import { Card } from './ui/card'

export default function Features() {
  return (
    <div className=' w-full max-w-6xl mx-auto h-auto  flex flex-col'>
     
        <Card className='flex-1 ring-1 ring-inset ring-foreground/10 p-2 g:p-4 bg-foreground/5 '>
        <video controls    className='rounded-md bg-background p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-foreground/10'>
                    <source src={'/introv1.2.mp4'} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
        </Card>
      
        

    </div>
  )
}
