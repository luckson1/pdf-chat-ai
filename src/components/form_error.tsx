import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import React from 'react'

export default function FormError({error}: {error:string}) {
  return (
   
             <div className='flex flex-row space-x-2 text-destructive'>
              <div className=" grid place-items-center">
              <ExclamationTriangleIcon className="h-4 w-4" />
              </div>
              <div className=" text-sm truncate">
                {error}
              </div>

             </div>
  )
}
