//Niveau le plus haut de l'application, ici tout les composants enfants peuvent en beneficier 
import type { AppProps } from 'next/app'
import { ToastContainer, Flip} from 'react-toastify';
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
  <ToastContainer
    position= "top-center"
    autoClose={8000}
    transition={Flip}
  />
  <Component {...pageProps} />
  </>
  )
}
