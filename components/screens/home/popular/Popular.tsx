import type { FC } from 'react'
import { useState } from 'react'

import { useTMDB } from '@hooks'

import { Carousel, ContextWrapper, SwitchTabs } from '@components/common'

import styles from './Popular.module.scss'

const Popular: FC = () => {
  const [endpoint, setEndpoint] = useState<'movie' | 'tv'>('movie')

  const { data, isLoading, refetch } = useTMDB('popular', `/${endpoint}/popular`)

  const onTabChange = (tab: string) => {
    console.log(tab)
    setEndpoint(tab === 'Movies' ? 'movie' : 'tv')
    setTimeout(() => {
      refetch()
    }, 10)
  }

  return (
    <div className={styles.carouselSection}>
      <ContextWrapper className='flex items-center justify-between'>
        <span className={styles.carouselTitle}>What is on Popular</span>

        <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
      </ContextWrapper>

      <Carousel data={data?.results} endpoint={endpoint} isLoading={isLoading} />
    </div>
  )
}

export default Popular
