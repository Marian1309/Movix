import type { NextPage } from 'next'

import { HeroBanner, Popular, TopRated, Trending } from '@components/screens/home'

const Home: NextPage = () => {
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
