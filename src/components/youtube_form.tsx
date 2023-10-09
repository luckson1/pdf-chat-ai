import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { YoutubeIcon } from 'lucide-react'
import { Label } from './ui/label'
import { Icons } from './Icons'

export default function YouTubeForm() {
  return (
    <form className='w-full  flex flex-row space-x-3 justify-center items-end'>

    <div className='w-full flex flex-col space-y-2'>
     <Label>Add a You Tube Link</Label>
    <Input className='w-full max-w-sm md:max-w-xs' placeholder='https://www.youtube.com/watch?v=nomxXk6Q1rk'/>
    </div>
     <Button size={'sm'} >
 <Icons.add /> <YoutubeIcon />
     </Button>
     
 
 
    </form>
  )
}
