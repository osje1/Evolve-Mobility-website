import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'

function StepCard({ number, title, description, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <TiltCard className="relative h-full rounded-2xl border border-ink-100 bg-white p-8 shadow-base transition-shadow duration-300 ease-premium hover:shadow-raised">
        <span className="font-heading text-5xl font-semibold text-ink-100">{number}</span>
        <h3 className="mt-4 font-heading text-lg font-semibold text-ink-950">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-600">{description}</p>
      </TiltCard>
    </Reveal>
  )
}

export default StepCard
