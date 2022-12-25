import { GoogleOAuthProvider } from '@react-oauth/google'
import { useEffect, useState } from 'react'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {

  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  if (isSSR) return null;
  
  return (
  <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
  <Component {...pageProps} />
  </GoogleOAuthProvider>
  )
}
