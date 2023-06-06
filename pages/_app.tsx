import type { FC } from 'react'
import { useEffect } from 'react'

import type { AppProps } from 'next/app'
import { DynaPuff } from 'next/font/google'

import TanstackReactQueryContainer from '@providers/@tanstack-query'
import HotToastProvider from '@providers/react-hot-toast'

import { ICONS } from '@utils/constants'

import { useHomeStore } from '@hooks/zustand'

import { Footer, Head, Header } from '@components/common'

import '@styles/globals.scss'

const dynaPyff = DynaPuff({ subsets: ['latin'], fallback: ['system-ui', 'arial'] })

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const { getApiConfiguration, getGenres } = useHomeStore()

  useEffect(() => {
    Promise.all([getApiConfiguration(), getGenres()])
  }, [])

  return (
    <div className={dynaPyff.className}>
      <Head
        description='Movix - Service for movies'
        favicon={ICONS.favicon}
        title='Movix'
      />

      <HotToastProvider />

      <TanstackReactQueryContainer>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </TanstackReactQueryContainer>
    </div>
  )
}

export default App
