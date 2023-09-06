import type { FC } from 'react'
import { useState } from 'react'

import type { Tab } from '@types'

import { useTMDB } from '@hooks'
import { useSwitchTabsTopRatedStore } from '@hooks/zustand'

import { Carousel, ContentWrapper, SwitchTabs } from '@components/common'

import styles from './TopRated.module.scss'

const TopRated: FC = () => {
  const [endpoint, setEndpoint] = useState<'movie' | 'tv'>('movie')
  const { data, isLoading, refetch } = useTMDB<any>('top-rated', `/${endpoint}/top_rated`)
  const store = useSwitchTabsTopRatedStore()

  const onTabChange = (tab: Tab) => {
    setEndpoint(tab === 'Movies' ? 'movie' : 'tv')
    setTimeout(() => {
      refetch()
    }, 10)
  }

  return (
    <div className={styles.carouselSection}>
      <ContentWrapper className='flex items-center justify-between'>
        <span className={styles.carouselTitle}>Top Rated</span>

        <SwitchTabs
          data={['Movies', 'TV Shows']}
          onTabChange={onTabChange}
          store={store}
        />
      </ContentWrapper>

      <Carousel data={data?.results} endpoint={endpoint} isLoading={isLoading} />
    </div>
  )
}

export default TopRated
