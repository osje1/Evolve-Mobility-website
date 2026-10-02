import { motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import Eyebrow from './Eyebrow.jsx'
import useIsDesktop from '../hooks/useIsDesktop.js'

const DESKTOP_DRIFT_SCALE = 1.5

function NetworkCoverage({ eyebrow, title, description, children }) {
  const prefersReducedMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const xScale = isDesktop ? DESKTOP_DRIFT_SCALE : 1

  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 lg:py-32">
      <motion.div
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-flare-500/20 blur-3xl"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          ...(prefersReducedMotion ? {} : { x: [0, -45 * xScale, 30 * xScale, 0], y: [0, 42, -25, 0] }),
        }}
        viewport={{ once: true }}
        transition={{
          opacity: { duration: 1 },
          scale: { duration: 1 },
          x: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {eyebrow && (
          <Reveal>
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <Reveal delay={0.08}>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white lg:text-5xl">{title}</h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-300">{description}</p>
        </Reveal>
        {children && <Reveal delay={0.24}>{children}</Reveal>}
      </div>
    </section>
  )
}

export default NetworkCoverage
