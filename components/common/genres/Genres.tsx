import type { FC } from 'react'

import useHomeStore from '@context/homeStore'

import styles from './Genres.module.scss'

interface GenresProps {
  data: any
}

const Genres: FC<GenresProps> = ({ data }) => {
  const { genres } = useHomeStore()

  return (
    <div className={styles.genres}>
      {data.map((g: any, index: number) => {
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
