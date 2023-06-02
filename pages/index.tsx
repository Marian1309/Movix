import { useEffect } from 'react'

import type { NextPage } from 'next'

import useHomeStore from '@context/homeStore'

import { fetchFromTMDB } from '@utils/helpers'

import { HeroBanner, Popular, TopRated, Trending } from '@components/screens/home'

type Genre = {
  id: number
  name: string
}

const Home: NextPage = () => {
  const { getApiConfiguration, getGenres } = useHomeStore()

  const fetchConfiguration = async () => {
    const {
      images: { secure_base_url }
    } = await fetchFromTMDB('/configuration')

    const original = `${secure_base_url}original`

    const url = {
      backdrop: original,
      poster: original,
      profile: original
    }

    getApiConfiguration(url)
  }

  const genresCall = async () => {
    const promises: Promise<{ genres: Genre[] }>[] = []
    const endPoints: ['tv', 'movie'] = ['tv', 'movie']
    const allGenres: { [id: number]: Genre } = {}

    endPoints.forEach((endPoint) =>
      promises.push(fetchFromTMDB(`/genre/${endPoint}/list`))
    )

    const data = await Promise.all(promises)

    data.map(({ genres }) => genres.map((genre) => (allGenres[genre.id] = genre)))

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
