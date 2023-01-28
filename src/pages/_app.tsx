import '@/styles/globals.css'
import TopNavBar from 'components/topNavBar'
import type { AppProps } from 'next/app'
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";   
import Auth from 'components/auth';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Auth>
        <TopNavBar />
        <Component {...pageProps} />
      </Auth>
      
    </div>
    );
}
