import type { DocumentContext } from 'next/document';
import { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentHeadTagsProps } from '@ease-trip/easy-ui/next';
import { documentGetInitialProps, DocumentHeadTags } from '@ease-trip/easy-ui/next';

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
