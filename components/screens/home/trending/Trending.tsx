import type { FC } from 'react'
import { useState } from 'react'

import { useTMDB } from '@hooks'

import { Carousel, ContextWrapper, SwitchTabs } from '@components/common'

import styles from './Trending.module.scss'

const Trending: FC = () => {
  const [endpoint, setEndpoint] = useState<'day' | 'week'>('day')

  const { data, isLoading } = useTMDB('trending-all', `/trending/all/${endpoint}`)

  const onTabChange = (tab: string) => {
    setEndpoint(tab === 'Day' ? 'day' : 'week')
  }

  return (
    <div className={styles.carouselSection}>
      <ContextWrapper className='flex items-center justify-between'>
        <span className={styles.carouselTitle}>Trending</span>

        <SwitchTabs data={['Day', 'Week']} onTabChange={onTabChange} />
      </ContextWrapper>

      <Carousel data={data?.results} isLoading={isLoading} />
    </div>
  )
}

export default Trending
