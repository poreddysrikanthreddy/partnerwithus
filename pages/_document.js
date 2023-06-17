import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>        
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />        
        <link
          href="https://site-assets.fontawesome.com/releases/v6.1.1/css/all.css"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}