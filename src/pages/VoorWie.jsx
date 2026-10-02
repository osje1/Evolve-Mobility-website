import { Handshake, GraduationCap, Rocket, Check } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import Hero from '../components/Hero.jsx'
import Button from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'

const doelgroepen = [
  {
    icon: Handshake,
    eyebrow: 'Voor dealers',
    title: 'Maak de klantervaring van iedere verkochte EV compleet.',
    description:
      'Wij verzorgen gebruikerstrainingen, dealerondersteuning en modelintroducties, zodat uw klanten na de aflevering echt weten wat hun auto kan.',
    cta: { label: 'Ontdek wat wij voor dealers kunnen betekenen', to: '/voor-dealers' },
    tone: 'light',
  },
  {
    icon: GraduationCap,
    eyebrow: 'Voor particulieren',
    title: 'Meer begrijpen. Meer vertrouwen. Meer uit je elektrische auto halen.',
    description:
      'Tijdens een persoonlijke gebruikerstraining nemen we de tijd om je auto écht uit te leggen. Zodat je alle functies optimaal kunt benutten.',
    cta: { label: 'Bekijk wat wij voor jou kunnen betekenen', to: '/voor-particulieren' },
    tone: 'dark',
  },
  {
    icon: Rocket,
    eyebrow: 'Voor automotive & importeurs',
    title: 'Landelijke ondersteuning bij modelintroducties en demonstraties.',
    description: 'Wij ondersteunen bij:',
    bullets: ['Nieuwe modelintroducties', 'Dealerintroducties', 'Roadshows', 'Productdemonstraties'],
    extra: 'Onze trainers en begeleiders zijn door heel Nederland inzetbaar.',
    tone: 'light',
    id: 'automotive-mobiliteitsevenementen',
  },
]

function VoorWie() {
  return (
    <>
      <PageMeta
        title="Voor wie | EV-gebruikerstraining voor elke doelgroep | Evolve Mobility"
        description="EV-gebruikerstraining en ondersteuning op maat: voor dealers en dealergroepen, particuliere EV-rijders, en automotive-importeurs met mobiliteitsevenementen."
        path="/voor-wie"
      />

      <Hero
        tone="dark"
        title="Eén organisatie, meerdere doelgroepen."
        subtitle="Wij ondersteunen iedereen die te maken heeft met elektrisch rijden, van individuele bestuurders en landelijke dealerorganisaties tot automotive-evenementen."
      />

      {doelgroepen.map((groep, index) => {
        const isDark = groep.tone === 'dark'
        return (
          <section
            key={groep.eyebrow}
            id={groep.id}
            className={`scroll-mt-24 px-6 py-20 lg:px-10 lg:py-28 ${isDark ? 'bg-ink-950' : 'bg-white'}`}
          >
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    isDark ? 'bg-flare-500/15 text-flare-400' : 'bg-flare-50 text-flare-600'
                  }`}
                >
                  <groep.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <p
                  className={`mt-6 text-xs font-semibold uppercase tracking-[0.2em] ${
                    isDark ? 'text-flare-400' : 'text-flare-600'
                  }`}
                >
                  {groep.eyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <h2
                  className={`mt-3 text-3xl font-semibold tracking-tight lg:text-4xl ${
                    isDark ? 'text-white' : 'text-ink-950'
                  }`}
                >
                  {groep.title}
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${isDark ? 'text-ink-300' : 'text-ink-600'}`}>
                  {groep.description}
                </p>
              </Reveal>

              {groep.bullets && (
                <Reveal delay={0.26}>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {groep.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className={`flex items-center gap-2.5 text-sm font-medium ${
                          isDark ? 'text-ink-200' : 'text-ink-700'
                        }`}
                      >
                        <Check className="h-4 w-4 flex-shrink-0 text-flare-500" strokeWidth={2.5} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {groep.extra && (
                <Reveal delay={0.32}>
                  <p className={`mt-6 max-w-2xl text-sm leading-relaxed ${isDark ? 'text-ink-400' : 'text-ink-500'}`}>
                    {groep.extra}
                  </p>
                </Reveal>
              )}

              {groep.cta && (
                <Reveal delay={0.32}>
                  <div className="mt-8">
                    <Button to={groep.cta.to} variant={isDark ? 'ghostOnDark' : 'secondary'}>
                      {groep.cta.label}
                    </Button>
                  </div>
                </Reveal>
              )}
            </div>
          </section>
        )
      })}

      <section className="bg-ink-50 px-6 py-24 text-center lg:px-10 lg:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-xl font-heading text-3xl font-semibold text-ink-950 lg:text-4xl">
            Een andere vraag of een oplossing op maat?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-600">Wij denken graag mee.</p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-8 flex justify-center">
            <Button to="/contact" variant="primary">
              Neem contact op
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}

export default VoorWie
