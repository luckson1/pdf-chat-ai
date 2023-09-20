'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function DocsPage() {
  const router=useRouter()
  return (
    <div className='w-full h-full flex justify-center items-center flex-col space-y-5'>
      <p className='text-xl'>You might be lost</p>
      <Button onClick={()=> router.replace("/")} size={'lg'}> Come back home</Button>

    </div>
  )
}
