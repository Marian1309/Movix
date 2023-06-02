import type { FC } from 'react'

import clsx from 'clsx'

import styles from './Spinner.module.scss'

interface SpinnerProps {
  initial?: boolean
}

const Spinner: FC<SpinnerProps> = ({ initial }) => {
  return (
    <div className={clsx(styles.loadingSpinner, initial && styles.initial)}>
      <svg className={styles.spinner} viewBox='0 0 50 50'>
        <circle
          className={styles.path}
          cx='25'
          cy='25'
          fill='none'
          r='20'
          strokeWidth='5'
        />
      </svg>
    </div>
  )
}

export default Spinner
