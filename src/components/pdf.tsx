import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  renderToBuffer,
} from "@joshuajaco/react-pdf-renderer-bundled";
type Uttarance = {
  confidence: number;
  end: number;
  speaker: string;
  start: number;
  text: string;
  words: Array<Word>;
};
type Word= {
  text:string,
start:number,
end:number,
confidence:number,
speaker:string,
}
const styles = StyleSheet.create({
  section: {
    textAlign: "left",
    margin: 30,
    width: "100%",

    "@media max-width: 400": {
      width: 300,
    },
    "@media orientation: landscape": {
      width: 400,
    },
  },
  page: {paddingVertical: '20px'},
});

const MyDocument = ({ uttarances }: { uttarances: Uttarance[] }) => (
  <Document>
    <Page  style={styles.page}>
   
        <Text style={{ width: "100%" }}>
          This is the transcription of your video
        </Text>
        {uttarances.map((u) => (
          <Text style={{ width: "100%" , marginVertical: "20px" , fontSize: '14px' , fontWeight: 'thin'}} key={u.text}>
            {" "}
            Speaker {u.speaker} : {u.text}
          </Text>
        ))}

    </Page>
  </Document>
);
export const BufferValue = async (uttarances: Uttarance[]) => {
  return await renderToBuffer(<MyDocument uttarances={uttarances} />);
};
