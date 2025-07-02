import "@/styles/globals.css";
import Header from "./componetns/Header";
import Footer from './componetns/Footer';
import { SessionProvider } from "next-auth/react"

export default function App({ Component,   pageProps: { session, ...pageProps },
 }) {
  return (
    <>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />

        <Footer />
      </SessionProvider>
    </>

  )
}
