import type { FC } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import clsx from 'clsx'
import dayjs from 'dayjs'

import useHomeStore from '@context/homeStore'

import { ICONS } from '@utils/constants'

import {
  CircleRating,
  ContextWrapper,
  Genres,
  LazyLoadImage,
  VideoPopup
} from '@components/common'

import styles from './DetailsBanner.module.scss'
import PlayIcon from './PlayIcon'

interface DetailsBannerProps {
  video: any
  crew: any[]
  data: any
}

const DetailsBanner: FC<DetailsBannerProps> = ({ video, crew, data }) => {
  const [show, setShow] = useState(false)
  const [videoId, setVideoId] = useState<null | number>(null)
  const [mounted, setMounted] = useState(false)

  const { url } = useHomeStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  const _genres = data?.genres?.map((g: any) => g.id)

  const director = crew?.filter((f) => f.job === 'Director')
  const writer = crew?.filter(
    (f) => f.job === 'Screenplay' || f.job === 'Story' || f.job === 'Writer'
  )

  const toHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`
  }

  return (
    <>
      {mounted && (
        <div className={styles.detailsBanner}>
          {data ? (
            <>
              <LazyLoadImage
                className={styles['backdrop-img']}
                src={`${url?.backdrop}${data?.backdrop_path}`}
              />

              <div className={styles['opacity-layer']} />

              <ContextWrapper>
                <div className={styles.content}>
                  <div className={styles.left}>
                    {data.poster_path ? (
                      <LazyLoadImage
                        className={styles.posterImg}
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <LazyLoadImage
                        className={styles.posterImg}
                        src={ICONS['no-poster']}
                      />
                    )}

                    <div className='relative top-0'>
                      <CircleRating rating={data.vote_average?.toFixed(1)} />
                    </div>
                  </div>

                  <div className={styles.right}>
                    <div className={styles.title}>
                      {`${data.name || data.title} (${dayjs(data?.release_date).format(
                        'YYYY'
                      )})`}
                    </div>

                    <div className={styles.subtitle}>{data.tagline}</div>

                    <div className={clsx(styles.row)}>
                      <div
                        className={styles.playbtn}
                        onClick={() => {
                          setShow(true)
                          setVideoId(video.key)
                        }}
                      >
                        <PlayIcon />
                        <span className={styles.text}>Watch Trailer</span>
                      </div>
                    </div>

                    <div className={styles.overview}>
                      <div className='flex items-center justify-between mb-[5px]'>
                        <div className={styles.heading}>Overview</div>
                        <Genres data={_genres} />
                      </div>
                      <div className={styles.description}>{data.overview}</div>
                    </div>

                    <div className={styles.info}>
                      {data.status && (
                        <div className={styles.infoItem}>
                          <span className={clsx(styles.text, styles.bold)}>Status: </span>
                          <span className={styles.text}>{data.status}</span>
                        </div>
                      )}

                      {data.release_date && (
                        <div className={styles.infoItem}>
                          <span className={clsx(styles.text, styles.bold)}>
                            Release Date:
                          </span>
                          <span className={styles.text}>
                            {dayjs(data.release_date).format('MMM D, YYYY')}
                          </span>
                        </div>
                      )}

                      {data.runtime && (
                        <div className={styles.infoItem}>
                          <span className={clsx(styles.text, styles.bold)}>Runtime:</span>
                          <span className={styles.text}>
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className={styles.info}>
                        <span className={clsx(styles.text, styles.bold)}>Director: </span>
                        <span className={styles.text}>
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ', '}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className={styles.info}>
                        <span className={clsx(styles.text, styles.bold)}>Writer: </span>
                        <span className={styles.text}>
                          {writer?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writer.length - 1 !== i && ', '}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className={styles.info}>
                        <span className={clsx(styles.text, styles.bold)}>Creator: </span>
                        <span className={styles.text}>
                          {data?.created_by?.map((d: any, i: any) => (
                            <span key={i}>
                              {d.name}
                              {data?.created_by.length - 1 !== i && ', '}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <VideoPopup
                  setShow={setShow}
                  setVideoId={setVideoId}
                  show={show}
                  videoId={videoId}
                />
              </ContextWrapper>
            </>
          ) : (
            <div className={styles.detailsBannerSkeleton}>
              <ContextWrapper className={styles.contentWrapper}>
                <div className={clsx(styles.left, 'skeleton')} />
                <div className={styles.right}>
                  <div className={clsx(styles.row, 'skeleton')} />
                  <div className={clsx(styles.row, 'skeleton')} />
                  <div className={clsx(styles.row, 'skeleton')} />
                  <div className={clsx(styles.row, 'skeleton')} />
                  <div className={clsx(styles.row, 'skeleton')} />
                  <div className={clsx(styles.row, 'skeleton')} />
                  <div className={clsx(styles.row, 'skeleton')} />
                </div>
              </ContextWrapper>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default DetailsBanner
