import type { FC } from 'react'
import { useRef } from 'react'

import { useRouter } from 'next/router'

import clsx from 'clsx'
import dayjs from 'dayjs'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'

import useHomeStore from '@context/homeStore'

import { ICONS } from '@utils/constants'

import { CircleRating, ContextWrapper, Genres, LazyLoadImage } from '@components/common'

import styles from './Carousel.module.scss'

interface CarouselProps {
  data: any
  isLoading: boolean
}

const Carousel: FC<CarouselProps> = ({ data, isLoading }) => {
  const carouselContainer = useRef<HTMLDivElement>(null)

  const { url } = useHomeStore()
  const router = useRouter()

  const navigation = (dir: 'left' | 'right') => {
    const container: any = carouselContainer.current

    const scrollAmount =
      dir === 'left'
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20)

    container.scrollTo({
      left: scrollAmount,
      behaviour: 'smooth'
    })
  }

  const skItem = () => {
    return (
      <div className={styles.skeletonItem}>
        <div className={clsx(styles.posterBlock)} />
        <div className={styles.textBlock}>
          <div className={clsx(styles.title)} />
          <div className={clsx(styles.date)} />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.carousel}>
      <ContextWrapper className='relative'>
        <BsFillArrowLeftCircleFill
          className={clsx(styles.arrow, styles.carouselLeftNav)}
          onClick={() => navigation('left')}
        />
        <BsFillArrowRightCircleFill
          className={clsx(styles.arrow, styles.carouselRighttNav)}
          onClick={() => navigation('right')}
        />

        {!isLoading ? (
          <div className={styles.carouselItems} ref={carouselContainer}>
            {data.map((item: any) => {
              const posterUrl = item.poster_path
                ? `${url.poster}${item.poster_path}`
                : ICONS['no-poster']
              const formattedDate = dayjs(item.release_Date).format('MMM D, YYYY')

              return (
                <div
                  className={styles.carouselItem}
                  key={item.id}
                  onClick={() => router.push(`/${item.media_type}/${item.id}`)}
                >
                  <div className={styles.posterBlock}>
                    <LazyLoadImage src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids} />
                  </div>

                  <div className={styles.textBlock}>
                    <span className={styles.title}>{item.title || item.name}</span>
                    <span className={styles.date}>{formattedDate}</span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className={styles.loadingSkeleton}>
            {skItem()} {skItem()} {skItem()} {skItem()} {skItem()}
          </div>
        )}
      </ContextWrapper>
    </div>
  )
}

export default Carousel
