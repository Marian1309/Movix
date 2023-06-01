import type { FC } from 'react'

import useAxiosQuery from 'hooks/useTMDB'

import { Carousel } from '@components/common'

interface SimilarProps {
  mediaType: 'movie' | 'tv'
  id: number | string
}

const Similar: FC<SimilarProps> = ({ mediaType, id }) => {
  const { data, isLoading } = useAxiosQuery(
    'recommendations',
    `/${mediaType}/${id}/similar`
  )

  const title = mediaType === 'tv' ? 'Similar TV Shows' : ' Similar Movies'

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
