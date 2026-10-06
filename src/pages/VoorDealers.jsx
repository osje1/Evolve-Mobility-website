import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import PageMeta from '../components/PageMeta.jsx'
import Hero from '../components/Hero.jsx'
import Button from '../components/Button.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import TextCard from '../components/TextCard.jsx'
import NetworkCoverage from '../components/NetworkCoverage.jsx'
import TiltCard from '../components/TiltCard.jsx'
import Reveal from '../components/Reveal.jsx'
import useIsDesktop from '../hooks/useIsDesktop.js'

const DESKTOP_DRIFT_SCALE = 1.5

const complexiteit = [
  'Lane Assist',
  'Automatisch noodremmen',
  'Adaptieve cruisecontrol',
  'Actieve aandachtsassistent',
  'Snelheidswaarschuwingen',
  'Regeneratief remmen',
  'Laden en laadplanning',
  'Actieradius',
  'Connected services',
  'Verschillende rijmodi',
]

// Op mobiel staan alleen de eerste zoveel onderwerpen meteen zichtbaar, de rest blijft in de
// HTML staan maar is visueel verborgen tot "Toon alle onderwerpen". Vanaf sm: altijd alles.
const ZICHTBARE_ONDERWERPEN_MOBIEL = 5

const nietZelf = [
  'Trainers zoeken',
  'Trainers inplannen',
  'Klanten inhoudelijk trainen',
  'Individuele trainers aansturen',
]

const wijRegelen = ['Planning', 'Trainer', 'Communicatie', 'Uitvoering', 'Administratie', 'Kwaliteitsbewaking']

const voordelen = [
  { title: 'Hogere klanttevredenheid', description: 'De klant krijgt extra persoonlijke aandacht na de aankoop.' },
  { title: 'Hogere merkretentie', description: 'Klanten worden extra enthousiast over hun auto na de aankoop en komen daardoor eerder terug bij een volgende aankoop.' },
  { title: 'Minder nazorg', description: 'Veel praktische vragen worden tijdens de training al beantwoord.' },
  { title: 'Onderscheidend vermogen', description: 'U onderscheidt zich als dealer door klanten extra begeleiding te bieden bij de aanschaf van een elektrische auto.' },
  { title: 'Betere merkbeleving', description: 'De klant ontdekt functies die anders mogelijk onbenut blijven.' },
  { title: 'Veiliger gebruik', description: 'De klant begrijpt beter hoe actieve veiligheidssystemen werken.' },
]

const traject = [
  { number: '01', title: 'Aflevering van de auto', description: 'De klant krijgt van de verkoper uitleg over de belangrijkste basisfuncties.' },
  { number: '02', title: 'Uitnodiging voor de training', description: 'Binnen 48 uur ontvangt de klant van ons een e-mail om een tijdslot te plannen bij de vestiging naar keuze.' },
  { number: '03', title: 'Tijd om vragen te laten ontstaan', description: 'De training vindt meestal twee weken tot drie maanden na de aflevering plaats. In die periode ontdekt de klant vanzelf waar de vragen zitten.' },
  { number: '04', title: 'Een vertrouwd gezicht', description: 'De klant komt naar de vestiging en treft daar vaak ook de verkoper weer — een kort, herkenbaar moment dat een welkom en prettig gevoel geeft.' },
  { number: '05', title: 'De training', description: 'Een persoonlijke training van 75 minuten. Daarna kent de klant alle ins en outs van de auto en wordt hij een enthousiaste ambassadeur — goed voor de klanttevredenheid en voor uw naam als dealer.' },
]

const overigeDiensten = [
  {
    title: 'Dealerintroducties',
    description:
      'Wanneer een nieuw automodel langs verschillende Nederlandse showrooms gaat, leveren wij trainers en begeleiders die het dealernetwerk ondersteunen bij de introductie.',
  },
  {
    title: 'Mobiliteitsevenementen',
    description: 'Wij leveren trainers en automotive begeleiders voor mobiliteits- en automotive-evenementen.',
  },
  {
    title: 'Productdemonstraties',
    description: 'Ondersteuning bij het demonstreren en uitleggen van nieuwe voertuigtechnologie.',
  },
]

function VoorDealers() {
  const prefersReducedMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const xScale = isDesktop ? DESKTOP_DRIFT_SCALE : 1
  const [toonAlleOnderwerpen, setToonAlleOnderwerpen] = useState(false)

  return (
    <>
      <PageMeta
        title="EV-gebruikerstraining voor dealers | Evolve Mobility"
        description="Complete dienstverlening rondom EV-gebruikerstraining voor dealers en dealergroepen: planning, trainer, uitvoering en kwaliteitsbewaking, landelijk uitgevoerd."
        path="/voor-dealers"
      />

      <Hero
        tone="dark"
        eyebrow="Voor dealers"
        title="U levert de auto aan de klant af. Wij zorgen dat uw klant ermee overweg kan."
        subtitle="Moderne elektrische auto's beschikken over tientallen veiligheids-, assistentie- en comfortsystemen. Dat roept bij veel klanten vragen op. Wij zorgen ervoor dat deze vragen beantwoord worden en klanten alle functies begrijpen en kunnen toepassen, zodat ze optimaal gebruik kunnen maken van hun nieuwe auto."
      >
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm">
          Bijna elke klant leert iets nieuws tijdens de training
        </div>
        <Button to="/contact" variant="primary">
          Bespreek de mogelijkheden
        </Button>
      </Hero>

      <section className="relative overflow-hidden bg-white px-6 py-24 lg:px-10 lg:py-32">
        <motion.div
          className="pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full bg-flare-300/50 blur-3xl"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            ...(prefersReducedMotion ? {} : { x: [0, 40 * xScale, -30 * xScale, 0], y: [0, 26, -20, 0] }),
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
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-16 md:grid-cols-[1.1fr,0.9fr] md:items-start">
            <SectionHeading
              eyebrow="Het probleem"
              title="Steeds meer techniek, dezelfde afleverafspraak."
              description="Tijdens een aflevering moet een verkoper de auto uitleggen, instellingen doornemen, laadmogelijkheden toelichten, infotainment laten zien, veiligheidssystemen bespreken, vragen beantwoorden én de administratie afronden, allemaal binnen dezelfde afspraak."
            >
              <Reveal delay={0.2}>
                <p className="mt-8 rounded-2xl border border-white/60 bg-white/50 p-6 text-lg font-medium leading-relaxed text-ink-950 shadow-raised backdrop-blur-xl backdrop-saturate-150">
                  De aflevering is voor de klant een bijzonder moment, maar er komt veel op meneer/mevrouw
                  af. De echte vragen komen dan ook vaak pas later, als de klant zelf rijdt. Wij nemen dan
                  echt de tijd voor de klant, terug bij u in de showroom.
                </p>
              </Reveal>
            </SectionHeading>

            <div className="flex flex-col gap-5">
              <Reveal>
                <p className="font-heading font-semibold text-ink-950">
                  Een greep uit alles wat een verkoper moet uitleggen:
                </p>
              </Reveal>
              <div className="flex flex-wrap content-start gap-3">
                {complexiteit.map((item, index) => (
                  <Reveal
                    key={item}
                    delay={index * 0.04}
                    direction="right"
                    className={
                      !toonAlleOnderwerpen && index >= ZICHTBARE_ONDERWERPEN_MOBIEL
                        ? 'hidden sm:!block'
                        : undefined
                    }
                  >
                    <span className="inline-flex rounded-full border border-ink-200 bg-ink-50 px-4 py-2 text-sm font-medium text-ink-700">
                      {item}
                    </span>
                  </Reveal>
                ))}
              </div>
              {complexiteit.length > ZICHTBARE_ONDERWERPEN_MOBIEL && (
                <button
                  type="button"
                  onClick={() => setToonAlleOnderwerpen((v) => !v)}
                  aria-expanded={toonAlleOnderwerpen}
                  className="text-left text-sm font-semibold text-flare-600 hover:text-flare-700 sm:hidden"
                >
                  {toonAlleOnderwerpen ? 'Toon minder' : 'Toon alle onderwerpen'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-50 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="De meerwaarde"
            title="Wat levert het u als dealer op?"
            align="center"
            className="mx-auto"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {voordelen.map((voordeel, index) => (
              <TextCard key={voordeel.title} {...voordeel} delay={index * 0.07} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Hoe werkt het"
            title="Wanneer vindt een training plaats?"
            description="Van de aflevering van de auto tot een klant die precies weet wat hij in handen heeft."
            align="center"
            className="mx-auto"
          />
          <div className="relative mx-auto mt-16 max-w-2xl">
            <div className="absolute bottom-2 left-4 top-2 w-px bg-ink-200" aria-hidden="true" />
            <div className="space-y-6 sm:space-y-10">
              {traject.map((stap, index) => (
                <Reveal key={stap.number} delay={index * 0.08}>
                  <div className="relative flex gap-6">
                    <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-flare-500 bg-white font-heading text-xs font-semibold text-flare-600">
                      {stap.number}
                    </span>
                    <div className="pb-1 pt-0.5">
                      <h3 className="font-heading text-lg font-semibold text-ink-950">{stap.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">{stap.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-50 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="De oplossing"
            title="Een complete dienstverlening rondom EV-gebruikerstraining."
            description="Wij verzorgen de gebruikerstraining volledig. Niet alleen een trainer, maar de hele organisatie eromheen."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Reveal className="h-full">
              <TiltCard className="h-full rounded-2xl border border-ink-200 bg-white p-8 shadow-base">
                <h3 className="font-heading text-lg font-semibold text-ink-950">U hoeft zelf niet:</h3>
                <ul className="mt-5 space-y-3">
                  {nietZelf.map((item) => (
                    <li key={item} className="text-sm text-ink-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <TiltCard className="h-full rounded-2xl border border-flare-200 bg-flare-50 p-8 shadow-base">
                <h3 className="font-heading text-lg font-semibold text-ink-950">Wij zorgen voor:</h3>
                <ul className="mt-5 space-y-3">
                  {wijRegelen.map((item) => (
                    <li key={item} className="text-sm font-medium text-ink-800">
                      {item}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      <NetworkCoverage
        title="Eén organisatie, landelijk vertegenwoordigd"
        description="Door heel Nederland werken wij samen met een geselecteerd netwerk van gespecialiseerde trainers. Een landelijk netwerk zodat er altijd iemand in de buurt is."
      />

      <section id="dealerintroducties" className="scroll-mt-24 bg-white px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading title="Andere diensten voor dealers" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {overigeDiensten.map((dienst, index) => (
              <TextCard key={dienst.title} {...dienst} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink-950 px-6 py-24 text-center lg:px-10 lg:py-36">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-0 ml-[-18rem] h-72 w-[36rem] rounded-full bg-flare-500/20 blur-3xl"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            ...(prefersReducedMotion ? {} : { x: [0, 60 * xScale, -50 * xScale, 0], y: [0, 24, -18, 0] }),
          }}
          viewport={{ once: true }}
          transition={{
            opacity: { duration: 1 },
            scale: { duration: 1 },
            x: { duration: 13, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 11, repeat: Infinity, ease: 'easeInOut' },
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-2xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold text-white lg:text-5xl">
              Benieuwd wat wij voor uw dealerorganisatie kunnen betekenen?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-ink-300">
              Tevreden klanten worden ambassadeurs van uw dealerschap. Wij bespreken graag hoe
              gebruikerstrainingen en onze andere diensten binnen uw organisatie kunnen worden ingezet.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex justify-center">
              <Button to="/contact" variant="primary">
                Neem contact op
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default VoorDealers
