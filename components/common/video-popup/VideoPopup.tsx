import type { Dispatch, FC, SetStateAction } from 'react'

import clsx from 'clsx'
import ReactPlayer from 'react-player/youtube'

import styles from './VideoPopup.module.scss'

interface VideoPopupProps {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
  videoId: null | number | string
  setVideoId: Dispatch<SetStateAction<null | number | string>>
}

const VideoPopup: FC<VideoPopupProps> = ({ setShow, setVideoId, show, videoId }) => {
  const hidePopup = () => {
    setShow(false)
    setVideoId(null)
  }

  return (
    <div className={clsx(styles.videoPopup, show && styles.visibility)}>
      <div className={styles.opacityLayer} onClick={hidePopup} />

      <div className={styles.videoPlayer}>
        <span className={styles.closeBtn} onClick={hidePopup}>
          Close
        </span>

        <ReactPlayer
          controls
          height='100%'
          url={`https://www.youtube.com/watch?v=${videoId}`}
          width='100%'
        />
      </div>
    </div>
  )
}

export default VideoPopup
