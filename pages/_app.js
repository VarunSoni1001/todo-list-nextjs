import Footer from '@/components/Footer'
import Header from '@/components/Header'
import TopProgressBar from '@/components/TopProgressBar'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return (
    <>
    <TopProgressBar />
    <Toaster />
  <Header />
  <div className='container min-h-screen mx-auto'>
  <Component {...pageProps} />
  </div>
  <Footer />
  </>
  )
}
