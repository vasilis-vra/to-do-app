// import App from 'next/app'
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import { Provider } from "next-auth/client";

//global styles
import styles from "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.main}>
      <Provider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </div>
  );

  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // MyApp.getInitialProps = async (appContext) => {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }
}
export default MyApp;
