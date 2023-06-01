import type { FC } from 'react'

import styles from './DetailsBanner.module.scss'

const PlayIcon: FC = () => {
  return (
    <svg
      enableBackground='new 0 0 213.7 213.7'
      height='80px'
      version='1.1'
      viewBox='0 0 213.7 213.7'
      width='80px'
      x='0px'
      xmlSpace='preserve'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      y='0px'
    >
      <polygon
        className={styles.triangle}
        fill='none'
        points='73.5,62.5 148.5,105.8 73.5,149.1 '
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='7'
      />
      <circle
        className={styles.circle}
        cx='106.8'
        cy='106.8'
        fill='none'
        r='103.3'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='7'
      />
    </svg>
  )
}

export default PlayIcon
