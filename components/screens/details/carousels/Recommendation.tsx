import type { FC } from 'react'

import useAxiosQuery from 'hooks/useTMDB'

import { Carousel } from '@components/common'

interface RecommendationProps {
  mediaType: 'movie' | 'tv'
  id: number | string
}

const Recommendation: FC<RecommendationProps> = ({ mediaType, id }) => {
  const { data, isLoading } = useAxiosQuery(
    'recommendations',
    `/${mediaType}/${id}/recommendations`
  )

  return (
    <Carousel
      data={data?.results}
      endpoint={mediaType}
      isLoading={isLoading}
      title='Recommendations'
    />
  )
}

export default Recommendation
