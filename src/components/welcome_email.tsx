import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';
  
  export const WelcomeEmail = () => (
    <Html>
      <Head />
      <Preview>You are now ready supercharge your research or studies!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img
              src={ "https://res.cloudinary.com/dhciks96e/image/upload/v1686921534/Screen_Shot_2023-06-16_at_1.45.31_PM-removebg-preview_r97cfc.png"}
              width="49"
              height="21"
              alt="Chat Paperz"
            />
            <Hr style={hr} />
            <Text style={paragraph}>
           Hello! Jack here.
            </Text>
            <Text style={paragraph}>
            I am the founder of Chatpaperz. I created this app to save you time with mundane tasks during your research, so that you can concentrate on what matters. 
            </Text>
            <Text style={paragraph}>
            Enjoy your interactions with documents on the app.
            </Text>
         
            <Text style={paragraph}>
            I value your feedback and support. Let me know how I can improve this app.
            </Text>
            <Text style={paragraph}>
            You can always contact me using this email.
            </Text>
            <Text style={paragraph}>
         Regards,
            </Text>
            <Text style={paragraph}>
            Jack 
            </Text>
            <Text style={paragraph}>
            Founder
            </Text>
          </Section>
          
        </Container>
      </Body>
    </Html>
  );
  
  export default WelcomeEmail;
  
  const main = {
    backgroundColor: '#f6f9fc',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  };
  
  const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
  };
  
  const box = {
    padding: '0 48px',
  };
  
  const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
  };
  
  const paragraph = {
    color: '#525f7f',
  
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'left' as const,
  };
  
  const anchor = {
    color: '#556cd6',
  };
  
  const button = {
    backgroundColor: '#656ee8',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '100%',
  };
  
  const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
  };
  