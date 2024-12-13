import { useEffect, useState } from 'react'

import type { GetServerSideProps, NextPage } from 'next'

import type { Credits, Details, Video } from '@types'

import fetchFromTMDB from '@utils/helpers/tmdb'

import { Cast, DetailsBanner, Videos } from '@components/screens/details'
import { Recommendations, Similar } from '@components/screens/details/carousels'

export const runtime = 'edge';

interface DetailsPageProps {
  videos: Video
  credits: Credits
  details: Details
  mediaType: 'movie' | 'tv'
  id: string
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { mediaType, id }
}) => {
  const videos = await fetchFromTMDB(`/${mediaType}/${id}/videos`)
  const credits = await fetchFromTMDB(`/${mediaType}/${id}/credits`)
  const details = await fetchFromTMDB(`/${mediaType}/${id}`)

  return {
    props: { videos, credits, details, mediaType, id }
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
          <DetailsBanner crew={credits.crew} data={details} video={videos.results[0]} />
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
