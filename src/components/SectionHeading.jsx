import Reveal from './Reveal.jsx'
import Eyebrow from './Eyebrow.jsx'

function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
  className = '',
  children,
}) {
  const isDark = tone === 'dark'
  const isCenter = align === 'center'

  return (
    <div className={`max-w-2xl ${isCenter ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow && (
        <Reveal>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          className={`mt-4 text-3xl font-semibold tracking-tight lg:text-5xl ${
            isDark ? 'text-white' : 'text-ink-950'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-lg leading-relaxed ${isDark ? 'text-ink-300' : 'text-ink-600'}`}>
            {description}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  )
}

export default SectionHeading
