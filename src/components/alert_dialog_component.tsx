import { LucideIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

import React, { ReactNode } from "react";
import { buttonVariants } from "./ui/button";

export default function AlertDialogComponent({
  children,
  form,
  description,
  title,
  trigger,
  action,
  destructive,
  actionText,
}: {
  children?: ReactNode;
  form?: string;
  destructive?: boolean;
  actionText: string;
  description: string;
  title: string;
  trigger: ReactNode;
  action: (() => void) | null;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="submit"
            form={form}
            onClick={action ? action : () => null}
            className={buttonVariants({
              variant: destructive ? "destructive" : undefined,
            })}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
