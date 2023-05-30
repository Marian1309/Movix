import type { FC } from 'react'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import styles from './CircleRating.module.scss'

interface CircleRatingProps {
  rating: number
}

const CircleRating: FC<CircleRatingProps> = ({ rating }) => {
  return (
    <div className={styles.circleRating}>
      <CircularProgressbar
        className={styles['CircularProgressbar-text']}
        maxValue={10}
        styles={buildStyles({
          pathColor: rating < 5 ? 'red' : rating < 7 ? 'orange' : 'green'
        })}
        text={`${rating}`}
        value={rating}
      />
    </div>
  )
}

export default CircleRating
