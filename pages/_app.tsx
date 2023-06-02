import type { FC } from 'react'
import { useEffect } from 'react'

import type { AppProps } from 'next/app'
import { DynaPuff } from 'next/font/google'

import TanstackReactQueryContainer from '@libs/@tanstack-query'
import ToastContainer from '@libs/react-toastify'

import useHomeStore from '@context/homeStore'

import { ICONS } from '@utils/constants'
import { fetchFromTMDB } from '@utils/helpers'

import { Footer, Head, Header } from '@components/common'

import '@styles/globals.scss'

const dynaPyff = DynaPuff({ subsets: ['latin'] })

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const { getApiConfiguration, getGenres } = useHomeStore()

  const fetchConfiguration = async () => {
    const response = await fetchFromTMDB('/configuration')
    const url = {
      backdrop: `${response.images.secure_base_url}original`,
      poster: `${response.images.secure_base_url}original`,
      profile: `${response.images.secure_base_url}original`
    }

    getApiConfiguration(url)
  }

  const genresCall = async () => {
    const promises: any[] = []
    const endPoints: string[] = ['tv', 'movie']
    const allGenres: any = {}

    endPoints.forEach((endPoint) =>
      promises.push(fetchFromTMDB(`/genre/${endPoint}/list`))
    )

    const data = await Promise.all(promises)

    data.map(({ genres }) => genres.map((item: any) => (allGenres[item.id] = item)))

    getGenres(allGenres)
  }

  useEffect(() => {
    Promise.all([genresCall(), fetchConfiguration()])
  }, [])

  return (
    <div className={dynaPyff.className}>
      <Head
        description='Movix - Service for movies'
        favicon={ICONS.favicon}
        title='Movix'
      />

      <ToastContainer>
        <TanstackReactQueryContainer>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </TanstackReactQueryContainer>
      </ToastContainer>
    </div>
  )
}

export default App
