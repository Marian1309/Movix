import type { FC, KeyboardEvent } from 'react'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { ContextWrapper, LazyLoadImage } from '@components/common'

import useHomeStore from '@context/homeStore'

import { useTMDB } from '@hooks'

import styles from './HeroBanner.module.scss'

interface HeroBannerProps {}

const HeroBanner: FC<HeroBannerProps> = ({}) => {
  const [background, setBackground] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const router = useRouter()

  const { data, isLoading } = useTMDB('upcoming', '/movie/upcoming')

  const { url } = useHomeStore()

  useEffect(() => {
    setBackground(
      `${url.backdrop}${data?.results[Math.floor(Math.random() * 20)]?.backdrop_path}`
    )
  }, [data])

  const searchQueryHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.length > 0) {
      router.push(`/search/${query}`)
    }
  }

  return (
    <div className={styles.heroBanner}>
      {!isLoading && (
        <div className={styles['backdrop-img']}>
          <LazyLoadImage
            className={styles['lazy-load-image-background']}
            src={background}
          />
        </div>
      )}

      <div className={styles['opacity-layer']} />

      <ContextWrapper>
        <div className={styles.heroBannerContent}>
          <span className={styles.title}>Welcome.</span>
          <span className={styles.subTitle}>
            Millions of movies, TV shows and people to discover. Explore now.
          </span>

          <div className={styles.searchInput}>
            <input
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              placeholder='Search for a movie or tv show ...'
              type='text'
            />

            <button>Search</button>
          </div>
        </div>
      </ContextWrapper>
    </div>
  )
}

export default HeroBanner
