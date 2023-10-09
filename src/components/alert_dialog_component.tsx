import { LucideIcon } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

import React, { ReactNode } from 'react'

export default function AlertDialogComponent({children, form, description, title, trigger, action}: {children?: ReactNode, form?:string, description:string, title: string,trigger: ReactNode, action: (()=>void) |null}) {
  return (
    <AlertDialog>
    <AlertDialogTrigger>
{trigger}
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>
         {description}
        </AlertDialogDescription>
      </AlertDialogHeader>
    {children}
        <AlertDialogFooter>
          <AlertDialogCancel type="button">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction type="submit" form={form} onClick={action? action: ()=>null}>
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      
    </AlertDialogContent>
    </AlertDialog>
  )
}
