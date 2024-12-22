import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
  Container,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
      <Html lang="en" dir="ltr">
          <Head>
              <title>Verification Code</title>
              <Font
                  fontFamily="Roboto"
                  fallbackFontFamily="Verdana"
                  webFont={{
                      url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                      format: 'woff2',
                  }}
                  fontWeight={400}
                  fontStyle="normal"
              />
              <style>
                  {`
          body {
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            font-family: Roboto, Verdana, sans-serif;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #0073e6;
            color: #ffffff;
            padding: 10px 20px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }
          .header h2 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 20px;
            line-height: 1.6;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #777777;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #0073e6;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
        `}
              </style>
          </Head>
          <Preview>Here's your verification code: {otp}</Preview>
          <Container className="container">
              <Section className="header">
                  <Heading as="h2">Learnix Verification</Heading>
              </Section>
              <Section className="content">
                  <Row>
                      <Text>Hello {username},</Text>
                  </Row>
                  <Row>
                      <Text>
                          Thank you for registering at Learnix. Please use the following verification code to complete your registration:
                      </Text>
                  </Row>
                  <Row>
                      <Text>
                          <strong>{otp}</strong>
                      </Text>
                  </Row>
                  <Row>
                      <Text>
                          If you did not request this code, please ignore this email.
                      </Text>
                  </Row>
              </Section>
              <Section className="footer">
                  <Text>© 2024 Learnix. All rights reserved.</Text>
              </Section>
          </Container>
      </Html>
  );
}