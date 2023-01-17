import "../styles/globals.css";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import Layout from "../app/layouts/Layout.js";
import { useRouter } from "next/router";
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps, session }) {
  const router = useRouter();



  if (router.pathname === "/") {
    return (
      <SessionProvider session={session}>
        <Provider store={store}>
        <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    );
  } else if (router.pathname === "/homes") {
    return (
      <SessionProvider session={session}>
        <Provider store={store}>
        <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    );
  }else if (router.pathname === "/success") {
    return (
      <SessionProvider session={session}>
        <Provider store={store}>
        <NextNProgress color="green" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    );
  } else {
    return (
      <SessionProvider session={session}>
        <Provider store={store}>
          <Layout>
          <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SessionProvider>
    );
  }
}

export default MyApp;
