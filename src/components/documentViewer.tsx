'use client'
import * as mammoth from 'mammoth';
import React, { useEffect, useState } from 'react';
import { env } from '@/lib/env.mjs';
import * as AWS from 'aws-sdk';
import { Document, Page } from 'react-pdf';
import Papa from 'papaparse';
import { useSearchParams } from 'next/navigation';
import { api } from '@/app/api/_trpc/client';


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



function PDFViewer({ data }: {  data: ArrayBuffer;}) {
    return (
        <Document file={{ data: data }}>
            <Page pageNumber={1} />
        </Document>
    );
}



function DocxViewer({ data }: {  data: ArrayBuffer}) {
    const [content, setContent] = useState("");

    useEffect(() => {
        mammoth.convertToHtml({ arrayBuffer: data })
            .then((result) => setContent(result.value))
            .catch((error) => console.error(error));
    }, [data]);

    return <div className='w-full' dangerouslySetInnerHTML={{ __html: content }} />;
}




function CSVViewer({ data }:  {  data: ArrayBuffer}) {
    const [rows, setRows] =useState([]);

   useEffect(() => {
        const results =Papa.parse(new TextDecoder().decode(data), { header: true });
        //@ts-expect-error
        setRows(results?.data);
    }, [data]);

    return (
        <table className='w-full'>
            <thead>
                {/* Dynamically generate header using first row keys */}
                <tr>
                    {rows[0] && Object.keys(rows[0]).map((key) => <th key={key}>{key}</th>)}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                      
                        {Object.values(row).map((cell, idx) => <td key={idx}>
                       
                            {cell as any}
                            
                            </td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}


function DocumentViewer({key}: {key: string}) {
    const [data, setData] =useState<ArrayBuffer>();
const {data: doc}= api.documents.getOne.useQuery({key})
const type=doc?.type
   useEffect(() => {
        fetchDocumentFromS3(key)
            .then((arrayBuffer) => setData(arrayBuffer))
            .catch((error) => console.error(error));
    }, [key]);

if(!data) return null
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

 
 export default function MainDocumentViewer() {
    const params=useSearchParams()
const id=params?.get('id')
if(!id) {
    return null
}
   return (
     <div className='w-full'>
        <DocumentViewer key={id}/>
     </div>
   )
 }
 