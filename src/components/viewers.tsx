import mammoth from "mammoth";
import { useEffect, useState } from "react";
import Papa from 'papaparse';
// import {Page, Document} from 'react-pdf'

export function DocxViewer({ data }: {  data: ArrayBuffer}) {
    const [content, setContent] = useState("");

    useEffect(() => {
        mammoth.convertToHtml({ arrayBuffer: data })
            .then((result) => setContent(result.value))
            .catch((error) => console.error(error));
    }, [data]);

    return <div className='w-full' dangerouslySetInnerHTML={{ __html: content }} />;
}


// export function PDFViewer({ data }: {  data: ArrayBuffer;}) {
//     return (
//         <Document file={{ data: data }}>
//             <Page pageNumber={1} />
//         </Document>
//     );
// }

export function CSVViewer({ data }:  {  data: ArrayBuffer}) {
    const [rows, setRows] =useState([]);

   useEffect(() => {
        const results =Papa.parse(new TextDecoder().decode(data), { header: true });
        //@ts-expect-error
        setRows(results?.data);
    }, [data])
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