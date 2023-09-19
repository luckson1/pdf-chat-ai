import React from 'react';
import { Page, Text, View, Document, StyleSheet,  renderToStream} from '@joshuajaco/react-pdf-renderer-bundled';

const styles = StyleSheet.create({
  section: {
    color: '#f1f5f9', textAlign: 'center', margin: 30,
    width: 500,
    
    '@media max-width: 400': {
      width: 300,
    },
    '@media orientation: landscape': {
      width: 400,
    },
  },
  page: { backgroundColor: '#f1f5f9' },
});

 const MyDocument = ({text}: {text:string}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
      <Text style={{width: "100%", backgroundColor: "blue"}}>This is the transcription of your video</Text>
      <Text  style={{width: "100%"}}>{text}</Text>
      </View>
    </Page>
  </Document>
);
export const streamValue = async (text: string)=>  {
    return await renderToStream(<MyDocument text={text}/>)
    
}