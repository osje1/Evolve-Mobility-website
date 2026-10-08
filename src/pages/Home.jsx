import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'
import Hero from '../components/Hero.jsx'
import Button from '../components/Button.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import VideoBackground from '../components/VideoBackground.jsx'
import TextCard from '../components/TextCard.jsx'
import NetworkCoverage from '../components/NetworkCoverage.jsx'
import Reveal from '../components/Reveal.jsx'
import TiltCard from '../components/TiltCard.jsx'

const technologieën = [
  'Automatisch noodremmen',
  'Lane Assist',
  'Adaptieve cruisecontrol',
  'Aandachtsassistent',
  'Snelheidswaarschuwingen',
  'Regeneratief remmen',
  'Laden en laadplanning',
  'Actieradius',
  'Connected functies',
]

// Op mobiel staan alleen de eerste zoveel onderwerpen meteen zichtbaar; de rest blijft in de
// HTML staan (voor zoekmachines) maar is visueel verborgen tot de bezoeker op "Toon alle
// onderwerpen" tikt. Vanaf sm: (640px) altijd alles zichtbaar, zoals nu.
const ZICHTBARE_ONDERWERPEN_MOBIEL = 5

const pijlers = [
  {
    title: 'Veiligheid',
    description:
      'De bestuurder begrijpt hoe actieve veiligheidssystemen werken en wanneer ze ingrijpen.',
  },
  {
    title: 'Efficiëntie',
    description:
      'De bestuurder leert hoe hij slim omgaat met energie, laden, regeneratief remmen en actieradius.',
  },
  {
    title: 'Zekerheid',
    description: 'De bestuurder kan alle vragen stellen en leert alle ins en outs van de auto kennen.',
  },
]

const diensten = [
  { title: 'EV-gebruikerstrainingen', to: '/voor-particulieren#wat-leer-je-tijdens-de-training' },
  { title: 'Dealerintroducties', to: '/voor-dealers#dealerintroducties' },
  { title: 'Automotive- en mobiliteitsevenementen', to: '/voor-wie#automotive-mobiliteitsevenementen' },
  { title: 'Particuliere trainingen', to: '/voor-particulieren' },
]

function Home() {
  const [toonAlleOnderwerpen, setToonAlleOnderwerpen] = useState(false)

  return (
    <>
      <PageMeta
        title="Evolve Mobility | EV-gebruikerstraining voor dealers en particulieren"
        description="Landelijk netwerk van eigen trainers voor EV-gebruikerstraining, dealerintroducties en mobiliteitsevenementen. Eén centraal aanspreekpunt, door heel Nederland."
        path="/"
      />

      <Hero
        tone="dark"
        title="Elektrisch rijden begint met begrijpen wat de auto kan."
        subtitle="Moderne elektrische auto's zitten vol slimme technologie, veiligheidssystemen en nieuwe functies. Wij zorgen ervoor dat bestuurders weten wat hun auto kan en hoe ze er optimaal gebruik van maken."
      >
        <Button to="/voor-dealers" variant="primary">
          Voor dealers
        </Button>
        <Button to="/voor-particulieren" variant="ghostOnDark">
          Voor particulieren
        </Button>
      </Hero>

      <section className="relative overflow-hidden bg-ink-950 px-6 py-24 lg:px-10 lg:py-32">
        <VideoBackground src="/videos/problem-section-bg.mp4" poster="/videos/problem-section-poster.jpg" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr,0.9fr] lg:items-center">
          <SectionHeading
            tone="dark"
            eyebrow="Het probleem"
            title="Hoe slimmer de auto, hoe belangrijker de uitleg."
            description="Elke nieuwe generatie elektrische auto's brengt meer systemen met zich mee. Tegelijkertijd heeft een verkoper bij aflevering maar beperkte tijd om alles te laten zien en uit te leggen."
          >
            <Reveal delay={0.24}>
              <p className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 font-heading text-xl font-medium leading-snug text-white backdrop-blur-sm">
                Wij vullen het gat tussen de aflevering en het moment waarop de bestuurder de auto
                daadwerkelijk begrijpt.
              </p>
            </Reveal>
          </SectionHeading>

          <div className="flex flex-col gap-5">
            <Reveal>
              <p className="font-heading font-semibold text-white">
                Een greep uit de onderwerpen die tijdens een training aan bod komen:
              </p>
            </Reveal>
            <div className="flex flex-wrap content-start gap-3">
              {technologieën.map((item, index) => (
                <Reveal
                  key={item}
                  delay={index * 0.05}
                  direction="right"
                  className={
                    !toonAlleOnderwerpen && index >= ZICHTBARE_ONDERWERPEN_MOBIEL
                      ? 'hidden sm:!block'
                      : undefined
                  }
                >
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                    {item}
                  </span>
                </Reveal>
              ))}
            </div>
            {technologieën.length > ZICHTBARE_ONDERWERPEN_MOBIEL && (
              <button
                type="button"
                onClick={() => setToonAlleOnderwerpen((v) => !v)}
                aria-expanded={toonAlleOnderwerpen}
                aria-label={toonAlleOnderwerpen ? 'Toon minder onderwerpen' : 'Toon alle onderwerpen'}
                className="flex h-8 w-8 items-center justify-center text-flare-400 hover:text-flare-300 sm:hidden"
              >
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ease-premium ${
                    toonAlleOnderwerpen ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2.5}
                />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="bg-ink-50 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Onze uitgangspunten"
            description="Iedere training bouwt voort op dezelfde uitgangspunten, ongeacht het merk of model."
            align="center"
            className="mx-auto"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {pijlers.map((pijler, index) => (
              <TextCard key={pijler.title} {...pijler} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Onze diensten" title="Meer dan alleen gebruikerstrainingen" />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {diensten.map((dienst, index) => (
              <Reveal key={dienst.title} delay={index * 0.08} className="h-full">
                <TiltCard className="h-full">
                  <Link
                    to={dienst.to}
                    className="flex h-full flex-col justify-between rounded-2xl border border-ink-100 bg-ink-50 p-7 shadow-base transition-shadow duration-300 ease-premium hover:shadow-raised"
                  >
                    <p className="font-heading text-base font-semibold text-ink-950">{dienst.title}</p>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <NetworkCoverage
        title="Eén organisatie, landelijk vertegenwoordigd"
        description="Door heel Nederland werken wij samen met een geselecteerd netwerk van gespecialiseerde trainers. Een landelijk netwerk zodat er altijd iemand in de buurt is."
      />

      <section className="bg-ink-950 px-6 pb-24 pt-4 text-center lg:px-10 lg:pb-32">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-heading text-2xl font-semibold text-white lg:text-4xl">
            Benieuwd wat dit voor uw dealerorganisatie kan betekenen?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex justify-center">
            <Button to="/voor-dealers" variant="primary">
              Voor dealers
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}

export default Home
