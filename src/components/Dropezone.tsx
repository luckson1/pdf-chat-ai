// 'use client'
// import { UploadCloud } from "lucide-react";
// import { useDropzone } from "react-dropzone";
// import { Button } from "./ui/button";


// const Dropzone=({files, setFiles, audio, type }: {
//   files: File[],
//   setFiles: React.Dispatch<React.SetStateAction<File[]>>,
//   audio: boolean
//   type: string
// }) => {
//  const docFiles={
//   "text/csv": [],
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
//   "application/pdf": [],
//   "text/plain": [],
//   "application/vnd.ms-powerpoint": [],
//   "application/vnd.openxmlformats-officedocument.presentationml.presentation": []
// }
// const audioFiles = {
//   "audio/*": [],
//   "video/*": []

// }

//     const { getRootProps, getInputProps, isDragActive  } = useDropzone({
//       maxFiles: 1,
//       accept:audio? audioFiles :docFiles,
//       onDrop: (acceptedFiles) => {
//         setFiles(acceptedFiles);
     
    
//       },

    
//     });
 
//     return (
//       <section className=" item-center flex h-48 justify-center  w-full max-w-xs  flex-col rounded-[0.5rem] border-2 border-dashed border-border  px-4 py-4">
  
//       <div
//         {...getRootProps({ className: "dropzone" })}
//         className="h-full cursor-pointer"
//       >
//         <label htmlFor="upload" className="h-full w-full cursor-pointer">
//           <input {...getInputProps()} />
//           <div
//             className="flex  h-full  w-full flex-row items-center justify-center gap-3 align-baseline"
//             id="upload"
//           >
         
//               <>
//                 {isDragActive ? (
//                   <p className="text-lg font-bold text-green-500">
//                     Drop it here!
//                   </p>
//                 ) : (
//                   <div className="flex h-full w-full flex-col items-center justify-center space-y-2">
//                     <Button
//                       className="flex w-fit space-x-2"
//                       role="button"
//                       type="button"
//                     >
//                       {" "}
//                       <UploadCloud className="text-sm" />{" "}
//                       <p>Select {type} </p>
//                     </Button>
//                     <p>or drag and drop {type}</p>
//                   </div>
//                 )}
//               </>
       
//           </div>
//         </label>
//       </div>

//       <aside className=" w-full  ">
//     { files.length>0 &&  <strong><h2>File {" "} : {" "}</h2></strong>}
  
//          <ul>
  
//           { files.map(file => 
          
          
//           <li key={file.name} className="w-full overflow-x-hidden">{file.name}</li>)}</ul>
//        </aside>
//   </section>
//     );
// };


// export default Dropzone
'use client'

import { useState } from 'react'
// import {
//   Dialog,
//   DialogContent,
//   DialogTrigger,

import { Cloud, File, Loader2 } from 'lucide-react'
import { Progress } from './ui/progress'
import { useToast } from './ui/use-toast'
import { useDropzone } from "react-dropzone";

const Dropzone=({files, setFiles, handleSubmit, isUploading, setIsUploading }: {
    files?: File[],
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
    handleSubmit: (file: File[]) => Promise<void>
    isUploading: boolean
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
  }) => {
   const docFiles={
    "text/csv": [],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
    "application/pdf": [],
    "text/plain": [],
    "application/vnd.ms-powerpoint": [],
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": [],
    "audio/*": [],
    "video/*": []
  }

  
  

  const [uploadProgress, setUploadProgress] =
    useState<number>(0)
  const { toast } = useToast()



  const startSimulatedProgress = () => {
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval)
          return prevProgress
        }
        return prevProgress + 5
      })
    }, 500)

    return interval
  }
    const { getRootProps, getInputProps, isDragActive  } = useDropzone({
      maxFiles: 1,
      accept:docFiles,
      onDrop: async (acceptedFiles) => {
        setFiles(acceptedFiles);
        setIsUploading(true)
        const progressInterval = startSimulatedProgress()
      
await  handleSubmit(acceptedFiles)
     
        clearInterval(progressInterval)
        setUploadProgress(100)
    
      },

    
    })
  return (

    
        <div
          {...getRootProps({ className: "dropzone" })}
          className='border h-40  border-dashed border-foreground/60 rounded-lg   md:w-full md:max-w-xs'>
          <div className='flex items-center justify-center h-full w-full'>
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-secondary/70 hover:bg-secondary p-2'>
              <div className='flex flex-col items-center justify-center pb-2 pt-2'>
                <Cloud className='h-6 w-6 text-foreground/60 mb-2' />
                <p className='mb-2 text-sm text-foreground/80'>
                  <span className='font-semibold'>
                    Click to upload
                  </span>{' '}
                  or drag and drop file
                </p>
               
              </div>

              {files && files[0] ? (
                <div className='w-full bg-background flex items-center rounded-md overflow-hidden outline outline-[1px] outline-foreground/20 divide-x divide-foreground/20'>
                  <div className='px-3 py-2 h-full grid place-items-center'>
                    <File className='h-4 w-4 text-primary' />
                  </div>
                  <div className='px-3 py-2 h-full text-sm truncate'>
                    {files[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className='w-full mt-4 max-w-xs mx-auto'>
                  <Progress
                    indicatorColor={
                      uploadProgress === 100
                        ? 'bg-green-500'
                        : ''
                    }
                    value={uploadProgress}
                    className='h-1 w-full bg-primary-foreground'
                  />
                  {uploadProgress === 100 ? (
                    <div className='flex gap-1 items-center justify-center text-sm text- text-center pt-2'>
                      <Loader2 className='h-3 w-3 animate-spin' />
                      Redirecting...
                    </div>
                  ) : null}
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type='file'
                id='dropzone-file'
                className='hidden'
              />
            </label>
          </div>

    </div>
  )
}

// const UploadButton = ({
//   isSubscribed,
// }: {
//   isSubscribed: boolean
// }) => {
//   const [isOpen, setIsOpen] = useState<boolean>(false)

//   return (
//     <Dialog
//       open={isOpen}
//       onOpenChange={(v) => {
//         if (!v) {
//           setIsOpen(v)
//         }
//       }}>
//       <DialogTrigger
//         onClick={() => setIsOpen(true)}
//         asChild>
//         <Button>Upload PDF</Button>
//       </DialogTrigger>

//       <DialogContent>
//         <UploadDropzone isSubscribed={isSubscribed} />
//       </DialogContent>
//     </Dialog>
//   )
// }

export default Dropzone