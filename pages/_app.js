import "@/styles/globals.css";
import Header from "./componetns/Header";
import Footer from './componetns/Footer';

export default function App({ Component, pageProps }) {
  return(
  <>
    <Header/>
  <Component {...pageProps} />

<Footer/>

</>

)
}
