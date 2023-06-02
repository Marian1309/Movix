import type { NextPage } from 'next'

import { ContentWrapper } from '@components/common'

import styles from './index.module.scss'

const NotFoundPage: NextPage = () => {
  return (
    <div className={styles.pageNotFound}>
      <ContentWrapper className={styles.contentWrapper}>
        <span className={styles.bigText}>404</span>
        <span className={styles.smallText}>Page not found!</span>
      </ContentWrapper>
    </div>
  )
}

export default NotFoundPage
