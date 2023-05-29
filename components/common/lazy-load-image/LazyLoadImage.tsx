import type { FC } from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

interface LazyLoadImageProps {
  src: string
  className?: string
}

const LazyLoadImg: FC<LazyLoadImageProps> = ({ src, className }) => {
  return <LazyLoadImage alt='' className={className || ''} effect='blur' src={src} />
}

export default LazyLoadImg
