import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { ToastWarn } from '@libs/react-toastify'

import useHomeStore from '@context/homeStore'

import { useTMDB } from '@hooks'

import { ContentWrapper, LazyLoadImage } from '@components/common'

import styles from './HeroBanner.module.scss'

const HeroBanner: FC = () => {
  const [background, setBackground] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const router = useRouter()

  const { data, isLoading } = useTMDB<{ results: any[] }>('upcoming', '/movie/upcoming')
  const { url } = useHomeStore()

  useEffect(() => {
    setBackground(
      `${url.backdrop}${data?.results[Math.floor(Math.random() * 20)]?.backdrop_path}`
    )
  }, [data])

  const route = () => router.push(`/search/${query}`)

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

      <ContentWrapper>
        <div className={styles.heroBannerContent}>
          <span className={styles.title}>Welcome.</span>
          <span className={styles.subTitle}>
            Millions of movies, TV shows and people to discover. Explore now.
          </span>

          <div className={styles.searchInput}>
            <input
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={(e) => {
                if (query.length === 0 && e.key === 'Enter') {
                  ToastWarn('Type Something')
                }
                if (query.length > 0 && e.key === 'Enter') {
                  route()
                }
              }}
              placeholder='Search for a movie or tv show ...'
              type='text'
            />

            <button
              onClick={() => {
                if (query.length > 0) {
                  route()
                } else {
                  ToastWarn('Type something')
                }
              }}
            >
              Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner
