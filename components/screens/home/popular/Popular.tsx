import type { FC } from 'react'
import { useState } from 'react'

import type { Tab } from '@types'

import { useTMDB } from '@hooks'
import { useSwitchTabsPopularStore } from '@hooks/zustand'

import { Carousel, ContentWrapper, SwitchTabs } from '@components/common'

import styles from './Popular.module.scss'

const Popular: FC = () => {
  const [endpoint, setEndpoint] = useState<'movie' | 'tv'>('movie')
  const { data, isLoading, refetch } = useTMDB<any>('popular', `/${endpoint}/popular`)
  const store = useSwitchTabsPopularStore()

  const onTabChange = (tab: Tab) => {
    setEndpoint(tab === 'Movies' ? 'movie' : 'tv')
    setTimeout(() => {
      refetch()
    }, 10)
  }

  return (
    <div className={styles.carouselSection}>
      <ContentWrapper className='flex items-center justify-between'>
        <span className={styles.carouselTitle}>What is on Popular</span>

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

export default Popular
