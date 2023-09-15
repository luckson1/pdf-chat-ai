import { api } from "@/app/api/_trpc/client";
import { env } from '@/lib/env.mjs';
import * as AWS from 'aws-sdk';
import { CSVViewer, DocxViewer } from "./viewers";
// Setting AWS config
AWS.config.update({
    accessKeyId: env.ACCESS_KEY,
    secretAccessKey: env.SECRET_KEY,
    region:env.REGION
});

const s3 = new AWS.S3();

async function fetchDocumentFromS3( key: string): Promise<ArrayBuffer> {
    const params = {
        Bucket: env.BUCKET_NAME,
        Key: key
    };

    return new Promise((resolve, reject) => {
        s3.getObject(params, (err, data) => {
            if (err) reject(err);
            else resolve(data.Body as ArrayBuffer);
        });
    });
}



export async function DocumentViewer({key}: {key: string}) {
const {data: doc}= api.documents.getOne.useQuery({key})
function getFileExtension(filename?: string) {
    if (!filename) return undefined
    return filename.split('.').pop();
  }
const type=getFileExtension(doc?.name)
   
const data= await  fetchDocumentFromS3(key)
    
if(!data  ) return null
if(!type) return null
    switch (type) {
        // case 'pdf':
        //     return <PDFViewer data={data} />;
        case 'docx':
            return <DocxViewer data={data} />;
        case 'csv':
            return <CSVViewer data={data} />;
        case 'ppt':
            return <div>PowerPoint presentations are not supported for direct viewing. Please download to view.</div>;
        default:
            return <div>Unsupported format.</div>;
    }
}
