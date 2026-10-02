import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

// Op smalle (telefoon-)schermen is de sectie eromheen vaak veel hoger dan breed. Met
// object-cover moet een liggende video dan zo sterk bijgesneden worden om die hoogte te
// vullen dat hij overdreven ingezoomd oogt. object-contain laat op die breedtes het hele
// beeld zien (geen crop); vanaf sm: (tablet/desktop) blijft het bestaande object-cover
// gedrag ongewijzigd.
const MEDIA_CLASSNAME =
  'absolute inset-0 h-full w-full object-contain object-top sm:object-cover sm:object-center'

function VideoBackground({ src, poster, overlayClassName = 'bg-ink-950/80', className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '800px' })
  const prefersReducedMotion = useReducedMotion()
  const shouldLoadVideo = isInView && !prefersReducedMotion

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {poster && <img src={poster} alt="" loading="lazy" decoding="async" className={MEDIA_CLASSNAME} />}

      {shouldLoadVideo && (
        <video autoPlay muted loop playsInline preload="none" poster={poster} aria-hidden="true" className={MEDIA_CLASSNAME}>
          <source src={src} type="video/mp4" />
        </video>
      )}

      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  )
}

export default VideoBackground
