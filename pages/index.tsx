import { useEffect } from 'react'

import type { NextPage } from 'next'

import useHomeStore from '@context/homeStore'

import { fetchFromTMDB } from '@utils/helpers'

import { HeroBanner } from '@components/screens/home'

const Home: NextPage = () => {
  const { url, getApiConfiguration } = useHomeStore()

  useEffect(() => {
    fetchFromTMDB('/configuration').then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original'
      }

      getApiConfiguration(url)
    })
  }, [])

  return (
    <>
      <HeroBanner />
      <div className='h-screen' />
    </>
  )
}

export default Home
