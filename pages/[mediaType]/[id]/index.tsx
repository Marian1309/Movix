import { useEffect, useState } from 'react'

import type { GetServerSideProps, NextPage } from 'next'

import fetchFromTMDB from '@utils/helpers/tmdb'

import { Cast, DetailsBanner, Videos } from '@components/screens/details'
import { Recommendations, Similar } from '@components/screens/details/carousels'

interface DetailsPageProps {
  videos: any
  credits: any
  details: any
  mediaType: 'movie' | 'tv'
  id: number | string
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const videos = await fetchFromTMDB(`/${query?.mediaType}/${query?.id}/videos`)
  const credits = await fetchFromTMDB(`/${query?.mediaType}/${query?.id}/credits`)
  const details = await fetchFromTMDB(`/${query?.mediaType}/${query?.id}`)

  return {
    props: { videos, credits, details, mediaType: query?.mediaType, id: query?.id }
  }
}

const DetailsPage: NextPage<DetailsPageProps> = ({
  videos,
  credits,
  details,
  mediaType,
  id
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {mounted && (
        <>
          <DetailsBanner crew={credits?.crew} data={details} video={videos?.results[0]} />
          <Cast data={credits.cast} />
          <Videos data={videos} />
          <Similar id={id} mediaType={mediaType} />
          <Recommendations id={id} mediaType={mediaType} />
        </>
      )}
    </>
  )
}

export default DetailsPage
