import '../styles/globals.css'
import 'antd/dist/antd.css';
import Head from "next/head";
import Footer from '../src/components/atoms/Footer';
import type { AppProps } from 'next/app'
import {Layout} from "antd";

function MyApp({ Component, pageProps }: AppProps) {
  return (<>
    <Head>
      <title>Transient Secret | Share secrets</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:type" content="website" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
    </Head>
    <Layout>
      <Layout.Content className="container">
        <Component {...pageProps} />
      </Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
    </>);
}
export default MyApp
