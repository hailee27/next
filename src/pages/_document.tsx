import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <meta
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1, minimum-scale=1"
          name="viewport"
        />
        <meta charSet="UTF-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,900&family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link href="/assets/images/favicon.png" rel="icon" type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
