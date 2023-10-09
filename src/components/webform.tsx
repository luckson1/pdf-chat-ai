import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Icons } from './Icons'
import { Globe2Icon, GlobeIcon, YoutubeIcon } from 'lucide-react'
import { Label } from './ui/label'

export default function Webform() {
  return (
   <form className='w-full  flex flex-col space-y-5 justify-center items-center'>

  
    <div aria-label='Add a link to a  web page or You tube' className='flex flex-row space-x-1 justify-between items-center text-xs md:text-sm w-full'><span>Add a web page</span> <GlobeIcon className='text-blue-500' />  <span>or YouTube Video</span> <YoutubeIcon className='text-red-400'/> <span></span> </div>
   <Input className='w-full max-w-sm md:max-w-sm' placeholder='https://...'/>
 
    <Button  className='w-full max-w-sm md:max-w-sm ' >
    Add Link
    </Button>
    


   </form>
  )
}
