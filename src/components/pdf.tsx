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
      <Text>This is the transcription of your video</Text>
      <Text>{text}</Text>
      </View>
    </Page>
  </Document>
);
export const streamValue = async (text: string)=>  {
    const value= await renderToStream(<MyDocument text={text}/>)
    return value
}