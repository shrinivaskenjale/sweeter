import Head from "next/head";
const Meta = (props) => (
  <Head>
    <title>{props.title}</title>
    <meta
      name="description"
      content="Sweeter helps you connect and share with the people in your life."
    />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content="Sweeter" />
    <meta
      name="og:description"
      property="og:description"
      content="Sweeter helps you connect and share with the people in your life."
    />
    <meta property="og:site_name" content="Sweeter" />
    <meta property="og:url" content="https://sweeter.vercel.app/" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Sweeter" />
    <meta
      name="twitter:description"
      content="Sweeter helps you connect and share with the people in your life."
    />
    <meta name="twitter:site" content="Sweeter" />
    <meta name="twitter:creator" content="Sweeter" />
    <link rel="icon" type="image/png" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/favicon.ico" />
    <meta property="og:image" content="/homepage.png" />
    <meta name="twitter:image" content="/homepage.png" />
    <link rel="canonical" href="https://sweeter.vercel.app/" />
  </Head>
);
export default Meta;
// title
