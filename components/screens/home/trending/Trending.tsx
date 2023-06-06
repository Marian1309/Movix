import type { FC } from 'react'
import { useState } from 'react'

import type { Tab } from '@types'

import { useTMDB } from '@hooks'

import { Carousel, ContentWrapper, SwitchTabs } from '@components/common'

import styles from './Trending.module.scss'

const Trending: FC = () => {
  const [endpoint, setEndpoint] = useState<'day' | 'week'>('day')

  const { data, isLoading, refetch } = useTMDB<any>(
    'trending',
    `/trending/all/${endpoint}`
  )

  const onTabChange = (tab: Tab) => {
    setEndpoint(tab === 'Day' ? 'day' : 'week')
    setTimeout(() => {
      refetch()
    }, 10)
  }

  return (
    <div className={styles.carouselSection}>
      <ContentWrapper className='flex items-center justify-between'>
        <span className={styles.carouselTitle}>Trending</span>

        <SwitchTabs data={['Day', 'Week']} onTabChange={onTabChange} />
      </ContentWrapper>

      <Carousel data={data?.results} endpoint={endpoint} isLoading={isLoading} />
    </div>
  )
}

export default Trending
