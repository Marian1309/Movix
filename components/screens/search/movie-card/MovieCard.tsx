import type { FC } from 'react'

import { useRouter } from 'next/router'

import dayjs from 'dayjs'

import useHomeStore from '@context/homeStore'

import { ICONS } from '@utils/constants'

import { CircleRating, Genres, LazyLoadImage } from '@components/common'

import styles from './MovieCard.module.scss'

interface MovieCardProps {
  data: {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    media_type: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }
  fromSearch: boolean
  mediaType?: string
}

const MovieCard: FC<MovieCardProps> = ({ data, fromSearch, mediaType }) => {
  const router = useRouter()
  const { url } = useHomeStore()

  const posterUrl = data.poster_path
    ? `${url.poster}${data.poster_path}`
    : ICONS['no-poster']

  const changeRoute = () => {
    router.push(`/${data.media_type || mediaType}/${data.id}`)
  }

  return (
    <div className={styles.movieCard} onClick={changeRoute}>
      <div className={styles.posterBlock}>
        <LazyLoadImage src={posterUrl} />

        {!fromSearch && (
          <>
            <CircleRating rating={+data?.vote_average.toFixed(1)} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </>
        )}
      </div>

      <div className={styles.textBlock}>
        <span className={styles.title}>{data.title || data.original_title}</span>
        <span className={styles.date}>
          {dayjs(data.release_date).format('MMM D, YYYY')}
        </span>
      </div>
    </div>
  )
}

export default MovieCard
