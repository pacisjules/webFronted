import '../styles/globals.css'
import { store } from '../store/store'
import { Provider } from 'react-redux'
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps, session}) {
  return (

    <SessionProvider session={session}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </SessionProvider>
  );
}

export default MyApp



