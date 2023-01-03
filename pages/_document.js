import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            id="mcjs"
            type="text/javascript"
            dangerouslySetInnerHTML={{
              // eslint-disable-next-line max-len
              __html: '!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/e957837febcb93fc8cc489fe5/f93b44946bc2e00d26c1a3ba5.js");',
            }}
          />
          {/* <meta name="viewport" content="width=device-width,minimum-scale=1, initial-scale=1" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
