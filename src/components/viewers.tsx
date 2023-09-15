import mammoth from "mammoth";
import { useEffect, useState } from "react";
import Papa from 'papaparse';
// import {Page, Document} from 'react-pdf'

export function DocxViewer({ signedUrl }: { signedUrl: string }) {
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        fetch(signedUrl)
            .then(response => response.blob())
            .then(blob => {
                blob.arrayBuffer()
                    .then(arrayBuffer => {
                        const buffer = new Uint8Array(arrayBuffer);

                        mammoth.convertToHtml({ arrayBuffer: buffer })
                            .then(displayResult => {
                                setContent(displayResult.value);
                            });
                    });
            });
    }, [signedUrl]);

    return (
        <div dangerouslySetInnerHTML={{ __html: content }} />
    );
}
// export function PDFViewer({ data }: {  data: ArrayBuffer;}) {
//     return (
//         <Document file={{ data: data }}>
//             <Page pageNumber={1} />
//         </Document>
//     );
// }

type CsvData = {
    [key: string]: string;
};

interface CsvDisplayProps {
    signedUrl: string;
}

export const CSVViewer: React.FC<CsvDisplayProps> = ({ signedUrl }) => {
    const [data, setData] = useState<CsvData[]>([]);

    useEffect(() => {
        fetch(signedUrl)
            .then(response => response.text())
            .then(csvData => {
                const parsedData = Papa.parse<CsvData>(csvData, { header: true, skipEmptyLines: true });
                setData(parsedData.data);
            });
    }, [signedUrl]);

    return (
        <table>
            <thead>
                <tr>
                    {data[0] && Object.keys(data[0]).map((key, index) => (
                        <th key={index}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.values(row).map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}