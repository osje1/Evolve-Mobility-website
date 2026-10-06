import { Children, useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const MOBILE_QUERY = '(max-width: 639px)'

// Horizontale scroll-snap carrousel, alleen actief onder 640px. Vanaf 640px (`sm:`) schakelt
// dezelfde markup terug naar een gewoon grid-raster — `gridColsClassName` geeft de kolommen
// door (bijv. "md:grid-cols-2 lg:grid-cols-3"), precies zoals de rasters elders op de site.
// Alle kaarten (children) staan altijd in de DOM; er wordt niets lazy geladen of verwijderd.
function MobileCarousel({ children, gridColsClassName = '', autoplayMs = 6500 }) {
  const items = Children.toArray(children)
  const count = items.length

  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const cardRefs = useRef([])
  const intervalRef = useRef(null)
  const userInteractedRef = useRef(false)

  const [activeIndex, setActiveIndex] = useState(0)

  const isInView = useInView(sectionRef, { amount: 0.4 })
  const prefersReducedMotion = useReducedMotion()

  function scrollToIndex(index) {
    const container = containerRef.current
    const card = cardRefs.current[index]
    if (!container || !card) return
    container.scrollLeft = card.offsetLeft - container.offsetLeft
  }

  function goToIndex(index) {
    userInteractedRef.current = true
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setActiveIndex(index)
    scrollToIndex(index)
  }

  function handleUserInteraction() {
    userInteractedRef.current = true
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // Houdt de actieve stip bij terwijl de bezoeker zelf veegt/scrollt.
  function handleScroll() {
    const container = containerRef.current
    if (!container) return
    let nearest = 0
    let smallestDistance = Infinity
    cardRefs.current.forEach((card, index) => {
      if (!card) return
      const distance = Math.abs(card.offsetLeft - container.offsetLeft - container.scrollLeft)
      if (distance < smallestDistance) {
        smallestDistance = distance
        nearest = index
      }
    })
    setActiveIndex((current) => (current === nearest ? current : nearest))
  }

  // Automatisch doorschuiven: alleen onder 640px, alleen zonder "beweging verminderen",
  // alleen zolang de bezoeker nog niet zelf heeft aangeraakt/geveegd of op een stip heeft
  // geklikt, en gepauzeerd (niet gestopt) zolang de sectie niet in beeld is.
  useEffect(() => {
    if (prefersReducedMotion || count <= 1) return undefined
    if (typeof window === 'undefined' || !window.matchMedia(MOBILE_QUERY).matches) return undefined
    if (!isInView || userInteractedRef.current) return undefined

    intervalRef.current = setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % count
        scrollToIndex(next)
        return next
      })
    }, autoplayMs)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, prefersReducedMotion, count, autoplayMs])

  return (
    <div ref={sectionRef}>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onTouchStart={handleUserInteraction}
        onPointerDown={handleUserInteraction}
        className={`flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth sm:grid sm:snap-none sm:gap-6 sm:overflow-visible ${gridColsClassName}`}
      >
        {items.map((child, index) => (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el
            }}
            className="w-[85%] shrink-0 snap-start sm:w-auto sm:shrink"
          >
            {child}
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="mt-6 flex justify-center gap-2 sm:hidden">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToIndex(index)}
              aria-label={`Ga naar kaart ${index + 1} van ${count}`}
              aria-current={index === activeIndex}
              className={`h-2 w-2 rounded-full transition-colors duration-200 ease-premium ${
                index === activeIndex ? 'bg-flare-500' : 'bg-ink-200'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MobileCarousel
