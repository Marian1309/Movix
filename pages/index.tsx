import { useEffect } from 'react'

import type { NextPage } from 'next'

import useHomeStore from '@context/homeStore'

import { fetchFromTMDB } from '@utils/helpers'

import { HeroBanner, Popular, TopRated, Trending } from '@components/screens/home'

const Home: NextPage = () => {
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
    <>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </>
  )
}

export default Home
