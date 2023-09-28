
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

export default function Features() {
  return (
    <div className=' w-full min-h-70vh] flex flex-col space-y-5 container my-16'>
     
        <Card className='flex-1'>
        <video controls className="flex-1">
                    <source src={'/intro.mp4'} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
        </Card>
      
        

    </div>
  )
}
