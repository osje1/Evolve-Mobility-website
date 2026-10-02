import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'

function IconCard({ icon: Icon, title, description, delay = 0, tone = 'light' }) {
  const isDark = tone === 'dark'

  return (
    <Reveal delay={delay} className="h-full">
      <TiltCard
        className={`group h-full rounded-2xl p-8 shadow-base transition-shadow duration-300 ease-premium hover:shadow-raised ${
          isDark
            ? 'border border-white/10 bg-white/5 backdrop-blur-sm'
            : 'border border-ink-100 bg-white'
        }`}
      >
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 ease-premium group-hover:scale-110 ${
            isDark ? 'bg-flare-500/15 text-flare-400' : 'bg-flare-50 text-flare-600'
          }`}
        >
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <h3 className={`mt-6 font-heading text-xl font-semibold ${isDark ? 'text-white' : 'text-ink-950'}`}>
          {title}
        </h3>
        <p className={`mt-3 text-sm leading-relaxed ${isDark ? 'text-ink-300' : 'text-ink-600'}`}>
          {description}
        </p>
      </TiltCard>
    </Reveal>
  )
}

export default IconCard
