import Head from 'next/head'

export default (props) => (
  <Head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="/static/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport"/>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png"/>
    <link rel="manifest" href="/static/site.webmanifest"/> 
    <link rel="mask-icon" href="%PUBLIC_URL%/safari-pinned-tab.svg" color="#5bbad5"/>
    <meta name="msapplication-TileColor" content="#2b5797"/>
    <meta name="theme-color" content="#ffffff"/>
  </Head>
)