import { useEffect } from 'react'

import type { NextPage } from 'next'

import useHomeStore from '@context/homeStore'

import { fetchFromTMDB } from '@utils/helpers'

import { HeroBanner, Trending } from '@components/screens/home'

const Home: NextPage = () => {
  const { getApiConfiguration } = useHomeStore()

  const fetchConfiguration = async () => {
    const response = await fetchFromTMDB('/configuration')
    const url = {
      backdrop: `${response.images.secure_base_url}original`,
      poster: `${response.images.secure_base_url}original`,
      profile: `${response.images.secure_base_url}original`
    }

    getApiConfiguration(url)
  }

  useEffect(() => {
    fetchConfiguration()
  }, [])

  return (
    <>
      <HeroBanner />
      <Trending />
    </>
  )
}

export default Home
