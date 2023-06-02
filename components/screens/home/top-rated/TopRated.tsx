import type { FC } from 'react'
import { useState } from 'react'

import { useTMDB } from '@hooks'

import { Carousel, ContentWrapper, SwitchTabs } from '@components/common'

import styles from './TopRated.module.scss'

const TopRated: FC = () => {
  const [endpoint, setEndpoint] = useState<'movie' | 'tv'>('movie')

  const { data, isLoading, refetch } = useTMDB('top-rated', `/${endpoint}/top_rated`)

  const onTabChange = (tab: string) => {
    console.log(tab)
    setEndpoint(tab === 'Movies' ? 'movie' : 'tv')
    setTimeout(() => {
      refetch()
    }, 10)
  }

  return (
    <div className={styles.carouselSection}>
      <ContentWrapper className='flex items-center justify-between'>
        <span className={styles.carouselTitle}>What is on Popular</span>

        <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
      </ContentWrapper>

      <Carousel data={data?.results} endpoint={endpoint} isLoading={isLoading} />
    </div>
  )
}

export default TopRated
