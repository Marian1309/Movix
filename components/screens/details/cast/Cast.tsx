import type { FC } from 'react'

import clsx from 'clsx'

import useHomeStore from '@context/homeStore'

import { ICONS } from '@utils/constants'

import { ContextWrapper, LazyLoadImage } from '@components/common'

import styles from './Cast.module.scss'

interface CastProps {
  data: any
}

const Cast: FC<CastProps> = ({ data }) => {
  const { url } = useHomeStore()

  const skeleton = () => {
    return (
      <div className={styles.skItem}>
        <div className={clsx(styles.circle, 'skeleton')} />
        <div className={clsx(styles.row, 'skeleton')} />
        <div className={clsx(styles.row2, 'skeleton')} />
      </div>
    )
  }

  return (
    <div className={styles.castSection}>
      <ContextWrapper>
        <div className={styles.sectionHeading}>Top Cast</div>

        {!!data ? (
          <div className={styles.listItems}>
            {data?.map((item: any) => {
              const imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : ICONS.avatar

              return (
                <div className={styles.listItem} key={item.id}>
                  <div className={styles.profileImg}>
                    <LazyLoadImage src={imgUrl} />
                  </div>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.character}>{item.character}</div>
                </div>
              )
            })}
          </div>
        ) : (
          <div>
            {skeleton()} {skeleton()} {skeleton()} {skeleton()} {skeleton()}
          </div>
        )}
      </ContextWrapper>
    </div>
  )
}

export default Cast
