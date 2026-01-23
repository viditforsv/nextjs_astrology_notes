import type { AppProps } from "next/app"
import Head from "next/head"
import '../styles/globals.css'
import 'katex/dist/katex.min.css'

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Mukta:wght@400;500;600;700&family=Hind:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
