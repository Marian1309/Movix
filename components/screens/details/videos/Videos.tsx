import type { FC } from 'react'
import { useState } from 'react'

import clsx from 'clsx'

import { ContextWrapper, LazyLoadImage, VideoPopup } from '@components/common'
import { PlayIcon } from '@components/icons'

import styles from './Videos.module.scss'

interface VideosProps {
  data: any
}

const Videos: FC<VideosProps> = ({ data }) => {
  const [show, setShow] = useState(false)
  const [videoId, setVideoId] = useState<number | null>(null)

  const loadingSkeleton = () => {
    return (
      <div className={styles.skItem}>
        <div className={clsx(styles.thumb, 'skeleton')} />
        <div className={clsx(styles.row, 'skeleton')} />
        <div className={clsx(styles.row2, 'skeleton')} />
      </div>
    )
  }

  return (
    <div className={styles.videosSection}>
      <ContextWrapper>
        <div className={styles.sectionHeading}>Official Videos</div>

        {!!data ? (
          <div className={styles.videos}>
            {data?.results?.map((video: any) => (
              <div
                className={styles.videoItem}
                key={video.id}
                onClick={() => {
                  setShow(true)
                  setVideoId(video.id)
                  console.log(video.id)
                }}
              >
                <div className={styles.videoThumbnail}>
                  <LazyLoadImage
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                  <PlayIcon />
                </div>
                <div className={styles.videoTitle}>{video.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.videoSkeleton}>
            {loadingSkeleton()} {loadingSkeleton()} {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContextWrapper>

      <VideoPopup
        setShow={setShow}
        setVideoId={setVideoId}
        show={show}
        videoId={videoId}
      />
    </div>
  )
}

export default Videos
