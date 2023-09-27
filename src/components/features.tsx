import Image from 'next/image'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { CheckIcon } from '@radix-ui/react-icons'

export default function Features() {
  return (
    <div className=' w-full min-h-screen flex flex-col space-y-5 container'>
        <p className='text-4xl text-center tracking-widest'>Features</p>
        <Card className='w-full h-auto'>
            <CardHeader className='text-center text-2xl'>
                <CardTitle>
                AI product photoshoot
                </CardTitle>
                <CardDescription>
                Unleash captivating campaigns with visuals that make your audience stop, stare, and stay engaged!
                </CardDescription>
            </CardHeader>
        <CardContent>
            <div className='w-full h-auto flex flex-col lg:flex-row justify-around items-center px-5'>
            <Image src='https://res.cloudinary.com/dhciks96e/image/upload/v1693765096/Black_White_Fashion_Boutique_Simple_Open_Closed_Sign_Poster_Landscape_2_uhpp65.png' alt='remove background image' width={600} height={300} loading='lazy' className='object-cover'/>
            <div className='w-full max-w-xl flex flex-col'>
         
         <ul className=' tracking-wide space-y-4 text-xl'>
             <li >  
         
               Drive Engagement with Stunning, Customizable Product Visuals. </li>
           <li>Make Every Product Photo Unique, with AI-crafted backgrounds.</li>
           <li>Ditch expensive photoshoots and transport your products into eye-catching scenes.</li>
     
          
         </ul>
       </div>
        
            </div>
        </CardContent>
        </Card>
        <Card className='w-full h-auto'>
            <CardHeader className='text-center text-2xl'>
                <CardTitle>
                Remove the background from an image
                </CardTitle>
                <CardDescription>
                    Create images with a transparent background
                </CardDescription>
            </CardHeader>
        <CardContent>
            <div className='w-full h-auto flex flex-col md:flex-row justify-center items-center'>
            <div className='w-full max-w-2xl flex flex-col'>
         
         <ul className=' tracking-wide text-xl space-y-4'>
            <li>Increase product visibility.</li>
            <li>Reduce distractions around the product.</li>
            <li>Ensure consistency with all your product photos on ecommerce platforms</li>
            <li>Save time with batch editing</li>

            
         </ul>
       </div>
         <Image src='https://res.cloudinary.com/dhciks96e/image/upload/v1693762937/2_jc3da9.png' alt='remove background image' width={300} height={300} loading='lazy' className='object-cover'/>
            </div>
        </CardContent>
        </Card>
        

    </div>
  )
}
