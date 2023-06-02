import type { FC } from 'react'

import clsx from 'clsx'

import useHomeStore from '@context/homeStore'

import styles from './Genres.module.scss'

interface GenresProps {
  data: number[]
  className?: string
}

type Genres = {
  [key: number]: {
    id: number
    name: string
  }
}

const Genres: FC<GenresProps> = ({ data, className }) => {
  const { genres }: { genres: Genres } = useHomeStore()

  return (
    <div className={clsx(styles.genres, className)}>
      {data?.map((g) => {
        if (!genres[g]?.name) return

        return (
          <div className={styles.genre} key={g}>
            {genres[g]?.name}
          </div>
        )
      })}
    </div>
  )
}

export default Genres
