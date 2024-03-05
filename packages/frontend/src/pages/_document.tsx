import type { DocumentContext } from 'next/document';
import type { DocumentHeadTagsProps } from '@mui/material-nextjs/v14-pagesRouter';

import { Html, Head, Main, NextScript } from 'next/document';
import { documentGetInitialProps, DocumentHeadTags } from '@mui/material-nextjs/v14-pagesRouter';

export default function Document(props: DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const initProps = await documentGetInitialProps(ctx);
  return initProps;
};
