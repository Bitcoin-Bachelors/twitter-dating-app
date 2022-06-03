import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '../lib/UserProvider'

import { Amplify } from "aws-amplify";
//import awsExports from "../src/aws-exports";
Amplify.configure({
  Auth: {
    region: 'us-east-2',
    userPoolId: 'us-east-2_UutiICTkY',
    userPoolWebClientId: 'eokl957afi5c806aq0vsvtbr1',
  }, ssr: true
});

function MyApp({ Component, pageProps }: AppProps) {
  return <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
}

export default MyApp
