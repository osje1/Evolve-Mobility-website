import { motion, useReducedMotion } from 'framer-motion'
import Eyebrow from './Eyebrow.jsx'
import useIsDesktop from '../hooks/useIsDesktop.js'

const DESKTOP_DRIFT_SCALE = 1.5

function Hero({ tone = 'dark', eyebrow, title, subtitle, children }) {
  const isDark = tone === 'dark'
  const prefersReducedMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const xScale = isDesktop ? DESKTOP_DRIFT_SCALE : 1

  const drift = prefersReducedMotion
    ? {}
    : {
        primary: {
          x: [0, 110 * xScale, 230 * xScale, -30 * xScale, 0],
          y: [0, -85, 60, 120, 0],
        },
        secondary: { x: [0, -45 * xScale, 25 * xScale, 0], y: [0, 35, -28, 0] },
      }

  return (
    <section
      className={`relative overflow-hidden ${
        isDark ? 'bg-ink-950' : 'bg-ink-50'
      } px-6 pb-24 pt-20 lg:px-10 lg:pb-32 lg:pt-28`}
    >
      <motion.div
        className={`pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full blur-3xl ${
          isDark ? 'bg-flare-500/20' : 'bg-flare-300/30'
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, ...drift.primary }}
        transition={{
          opacity: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
          x: { duration: 22, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
        }}
        aria-hidden="true"
      />
      <motion.div
        className={`pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full blur-3xl ${
          isDark ? 'bg-white/[0.06]' : 'bg-ink-900/5'
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, ...drift.secondary }}
        transition={{
          opacity: { duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
          x: { duration: 13, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`mt-5 text-4xl font-semibold leading-[1.05] tracking-tight lg:text-7xl ${
            isDark ? 'text-white' : 'text-ink-950'
          }`}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={`mt-7 max-w-2xl text-lg leading-relaxed lg:text-xl ${
              isDark ? 'text-ink-300' : 'text-ink-600'
            }`}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Hero
