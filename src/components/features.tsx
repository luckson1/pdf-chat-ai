
import React from 'react'
import { Card } from './ui/card'

export default function Features() {
  return (
    <div className=' w-full h-auto  flex flex-col space-y-5 my-16'>
     
        <Card className='flex-1'>
        <video controls className="flex-1 rounded-lg">
                    <source src={'/introv1.1.mp4'} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
        </Card>
      
        

    </div>
  )
}
