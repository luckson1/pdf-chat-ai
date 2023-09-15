import mammoth from "mammoth";
import { useEffect, useState } from "react";
import Papa from 'papaparse';
import {  Document, Page } from 'react-pdf';

interface DocxViewerProps {
    signedUrl: string;
}

export const DocxViewer: React.FC<DocxViewerProps> = ({ signedUrl }) => {
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        let isMounted = true;

        fetch(signedUrl)
            .then(response => {
                if (isMounted) {
                    return response.blob();
                }
                return null;
            })
            .then(blob => {
                if (blob && isMounted) {
                    return blob.arrayBuffer();
                }
                return null;
            })
            .then(arrayBuffer => {
                if (arrayBuffer && isMounted) {
                    const buffer = new Uint8Array(arrayBuffer);
                    mammoth.convertToHtml({ arrayBuffer: buffer })
                        .then(displayResult => {
                            if (isMounted) {
                                setContent(displayResult.value);
                            }
                        });
                }
            });

        // Cleanup function
        return () => {
            isMounted = false;
        };
    }, [signedUrl]);

    return (
        <div dangerouslySetInnerHTML={{ __html: content }} />
    );
}


export function PDFViewer({ url }: { url:string}) {
    console.log("pdf" ,url)

    return (
        // <Document file={{ url }}>
        //     <Page pageNumber={1}/>
        // </Document>
        <div>
            File
        </div>
    );
}

type CsvData = {
    [key: string]: string;
};

interface CSVViewerProps {
    signedUrl: string;
}

export const CSVViewer: React.FC<CSVViewerProps> = ({ signedUrl }) => {
    const [data, setData] = useState<CsvData[]>([]);

    useEffect(() => {
        let isMounted = true;

        fetch(signedUrl)
            .then(response => {
                if (isMounted) {
                    return response.text();
                }
                return null;
            })
            .then(csvData => {
                if (csvData && isMounted) {
                    const parsedData = Papa.parse<CsvData>(csvData, { header: true, skipEmptyLines: true });
                    setData(parsedData.data);
                }
            });

        // Cleanup function
        return () => {
            isMounted = false;
        };
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
