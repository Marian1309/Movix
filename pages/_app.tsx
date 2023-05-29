import type { FC } from 'react'

import type { AppProps } from 'next/app'
import { DynaPuff } from 'next/font/google'
import Head from 'next/head'

import { Footer, Header } from '@components/common'

import TanstackReactQueryContainer from '@libs/@tanstack-query'

import { ICONS } from '@utils/constants'

import '@styles/globals.scss'

const dynaPyff = DynaPuff({ subsets: ['latin'] })

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className={dynaPyff.className}>
      <Head>
        <title>Movix</title>
        <link href={ICONS.favicon} rel='shortcut icon' />
        <meta content='Movix - Service for movies' name='description' />
      </Head>

      <TanstackReactQueryContainer>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </TanstackReactQueryContainer>
    </div>
  )
}

export default App
