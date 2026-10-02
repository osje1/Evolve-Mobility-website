import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import useIsDesktop from '../hooks/useIsDesktop.js'

function VideoBackground({ src, poster, overlayClassName = 'bg-ink-950/80', className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '800px' })
  const prefersReducedMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  // Op mobiel/tablet blijft het bij de poster-afbeelding: zelfde beeld, maar zonder de
  // videodownload (enkele MB's) die op kleinere schermen vooral data en laadtijd kost.
  const shouldLoadVideo = isInView && !prefersReducedMotion && isDesktop

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {poster && (
        <img
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {shouldLoadVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  )
}

export default VideoBackground
