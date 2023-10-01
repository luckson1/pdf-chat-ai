'use client'
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";


const Dropzone=({files, setFiles, audio, type }: {
  files: File[],
  setFiles: React.Dispatch<React.SetStateAction<File[]>>,
  audio: boolean
  type: string
}) => {
 const docFiles={
  "text/csv": [],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
  "application/pdf": [],
  "text/plain": [],
  "application/vnd.ms-powerpoint": [],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": []
}
const audioFiles = {
  "audio/*": [],
  "video/*": []

}

    const { getRootProps, getInputProps, isDragActive  } = useDropzone({
      maxFiles: 1,
      accept:audio? audioFiles :docFiles,
      onDrop: (acceptedFiles) => {
        setFiles(acceptedFiles);
     
    
      },

    
    });
 
    return (
      <section className=" item-center flex h-48 justify-center  w-full max-w-xs  flex-col rounded-[0.5rem] border-2 border-dashed border-border  px-4 py-4">
  
      <div
        {...getRootProps({ className: "dropzone" })}
        className="h-full cursor-pointer"
      >
        <label htmlFor="upload" className="h-full w-full cursor-pointer">
          <input {...getInputProps()} />
          <div
            className="flex  h-full  w-full flex-row items-center justify-center gap-3 align-baseline"
            id="upload"
          >
         
              <>
                {isDragActive ? (
                  <p className="text-lg font-bold text-green-500">
                    Drop it here!
                  </p>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center space-y-2">
                    <Button
                      className="flex w-fit space-x-2"
                      role="button"
                      type="button"
                    >
                      {" "}
                      <UploadCloud className="text-sm" />{" "}
                      <p>Select {type} </p>
                    </Button>
                    <p>or drag and drop {type}</p>
                  </div>
                )}
              </>
       
          </div>
        </label>
      </div>

      <aside className=" w-full  ">
    { files.length>0 &&  <strong><h2>File {" "} : {" "}</h2></strong>}
  
         <ul>
  
          { files.map(file => 
          
          
          <li key={file.name} className="w-full overflow-x-hidden">{file.name}</li>)}</ul>
       </aside>
  </section>
    );
};


export default Dropzone