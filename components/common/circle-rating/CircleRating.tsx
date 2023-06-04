import type { FC } from 'react'

import clsx from 'clsx'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import styles from './CircleRating.module.scss'

interface CircleRatingProps {
  rating: number
  className?: string
}

const CircleRating: FC<CircleRatingProps> = ({ rating, className }) => {
  return (
    <div className={clsx(styles.circleRating, className)}>
      <CircularProgressbar
        maxValue={10}
        styles={buildStyles({
          pathColor: rating < 5 ? 'red' : rating < 7 ? 'orange' : 'green',
          textColor: 'white',
          trailColor: 'var(--black3)',
          textSize: '24px'
        })}
        text={`${rating}`}
        value={rating}
      />
    </div>
  )
}

export default CircleRating
