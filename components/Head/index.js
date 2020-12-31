import Head  from 'next/head';

const HeadComponent = () => {
  return (
    <Head>
      <title>Lucas Lima</title>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta content="My personal site." name="description" />

      <meta property="og:title" content="Lucas Lima" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content="My personal site." />
      <meta
        property="og:image"
        content="https://lukeflima.dev.br/lucaslima.png"
      />
    </Head>
  );
};

export default HeadComponent;