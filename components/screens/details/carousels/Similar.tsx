import type { FC } from 'react'

import { useTMDB } from '@hooks'

import { Carousel } from '@components/common'

interface SimilarProps {
  mediaType: 'movie' | 'tv'
  id: string
}

type Similar = {
  page: number
  results: unknown[]
  total_pages: number
  total_results: number
}

const Similar: FC<SimilarProps> = ({ mediaType, id }) => {
  const { data, isLoading } = useTMDB<Similar>('similar', `/${mediaType}/${id}/similar`)

  const title = mediaType === 'tv' ? 'Similar TV Shows' : ' Similar Movies'

  if (!data?.results?.length) {
    return null
  }

  return (
    <Carousel
      data={data?.results}
      endpoint={mediaType}
      isLoading={isLoading}
      title={title}
    />
  )
}

export default Similar
