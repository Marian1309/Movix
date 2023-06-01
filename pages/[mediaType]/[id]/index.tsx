import type { GetServerSideProps, NextPage } from 'next'

import fetchFromTMDB from '@utils/helpers/tmdb'

import { Cast, DetailsBanner } from '@components/screens/details'

interface DetailsPageProps {
  videos: any
  credits: any
  details: any
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const videos = await fetchFromTMDB(`/${query?.mediaType}/${query?.id}/videos`)
  const credits = await fetchFromTMDB(`/${query?.mediaType}/${query?.id}/credits`)
  const details = await fetchFromTMDB(`/${query?.mediaType}/${query?.id}`)

  return { props: { videos, credits, details } }
}

const DetailsPage: NextPage<DetailsPageProps> = ({ videos, credits, details }) => {
  return (
    <div>
      <DetailsBanner crew={credits?.crew} data={details} video={videos?.results[0]} />
      <Cast data={credits.cast} />
    </div>
  )
}

export default DetailsPage
