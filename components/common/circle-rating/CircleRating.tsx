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
        maxValue={10}
        styles={buildStyles({
          pathColor: rating < 5 ? 'red' : rating < 7 ? 'orange' : 'green',
          textColor: 'white',
          trailColor: 'var(--black3)',
          textSize: '32px'
        })}
        text={`${rating}`}
        value={rating}
      />
    </div>
  )
}

export default CircleRating
