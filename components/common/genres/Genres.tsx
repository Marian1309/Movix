import type { FC } from 'react'

import clsx from 'clsx'

import useHomeStore from '@context/homeStore'

import styles from './Genres.module.scss'

interface GenresProps {
  data: any
  className?: string
}

const Genres: FC<GenresProps> = ({ data, className }) => {
  const { genres } = useHomeStore()

  return (
    <div className={clsx(styles.genres, className)}>
      {data?.map((g: any, index: number) => {
        if (!genres[g]?.name) return

        return (
          <div className={styles.genre} key={index}>
            {genres[g]?.name}
          </div>
        )
      })}
    </div>
  )
}

export default Genres
