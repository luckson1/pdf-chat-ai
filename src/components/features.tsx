
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { BookIcon, Mic2Icon } from 'lucide-react'
import { IconOpenAI } from './ui/icons'

export default function Features() {
  const featureslist= [
    {title: 'Chat with any document' , icon: BookIcon, content: "Get information and facts with citations from your own document. Type of documents supported include: PDFs, word documents, excels, power point presentation and text files."},
    {title: 'Create notes from audio files' , icon: Mic2Icon, content: "Our AI can accurately transcribe audio files. You can record a lecture, a brainstorming session or a study session and create notes from the audio file. "},
    {title: 'Use powerful AI' , icon: IconOpenAI, content: "We use a combination of several several state of the art AI models to help you save time in  your research and studys"},
  ]
  return (
    <div className=' w-full max-w-6xl mx-auto h-auto  flex flex-col'>
     
        <Card className='flex-1 ring-1 ring-inset ring-foreground/10 p-2 g:p-4 bg-foreground/5 '>
        <video controls loop autoPlay muted    className='rounded-md bg-background p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-foreground/10'>
                    <source src={'/introv1.2.mp4'} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
        </Card>
      
       <div className='w-full h-auto flex flex-col my-16 justify-center items-center'>
       <h2 className=" text-xl md:text-3xl lg:text-5xl  font-bold tracking-normal leading-loose  h-auto my-5"> Features</h2>
       <div className='grid grid-cols-1 lg:grid-cols-3  space-x-0 space-y-5  lg:space-y-0 lg:space-x-5 w-full  mx-auto '>
        {featureslist.map((f, index)=> (
           <Card key={index}>
           <CardHeader>
             <CardTitle>
{<f.icon className='w-8 h-8'/>}
             </CardTitle>
             <CardDescription >
             {f.title}
             </CardDescription>
           </CardHeader>
           <CardContent className='leading-loose'>
{f.content}
           </CardContent>
         </Card>
        ))}

        </div>
       </div>

    </div>
  )
}
