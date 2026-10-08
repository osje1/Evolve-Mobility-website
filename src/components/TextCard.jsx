import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'

// Zelfde kaart als IconCard, maar zonder icon-tegel (voor plekken waar het decoratieve
// icon is weggehaald). Los gehouden van IconCard.jsx, dat elders nog met icon wordt
// gebruikt en niet aangepast mag worden.
//
// `compact`: optioneel, standaard uit. Alleen op mobiel (< 640px) minder padding en geen
// schaduw; vanaf sm: altijd de normale p-8/shadow-base, ongeacht deze prop. Bestaande
// gebruiksplekken die `compact` niet meegeven blijven dus volledig ongewijzigd.
function TextCard({ title, description, delay = 0, tone = 'light', compact = false }) {
  const isDark = tone === 'dark'

  return (
    <Reveal delay={delay} className="h-full">
      <TiltCard
        className={`h-full rounded-2xl transition-shadow duration-300 ease-premium hover:shadow-raised ${
          compact ? 'p-5 shadow-none sm:p-8 sm:shadow-base' : 'p-8 shadow-base'
        } ${
          isDark
            ? 'border border-white/10 bg-white/5 backdrop-blur-sm'
            : 'border border-ink-100 bg-white'
        }`}
      >
        <h3 className={`font-heading text-xl font-semibold ${isDark ? 'text-white' : 'text-ink-950'}`}>
          {title}
        </h3>
        <p className={`mt-3 text-sm leading-relaxed ${isDark ? 'text-ink-300' : 'text-ink-600'}`}>
          {description}
        </p>
      </TiltCard>
    </Reveal>
  )
}

export default TextCard
