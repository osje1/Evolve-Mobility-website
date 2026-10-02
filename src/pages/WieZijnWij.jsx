import {
  GraduationCap,
  Rocket,
  Handshake,
  CalendarRange,
  BatteryCharging,
  UserCheck,
  Wrench,
  BadgeCheck,
  Compass,
  MapPin,
  Star,
} from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import Hero from '../components/Hero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import NetworkCoverage from '../components/NetworkCoverage.jsx'
import ProfilePhoto from '../components/ProfilePhoto.jsx'
import Reveal from '../components/Reveal.jsx'

const expertises = [
  'Elektrische auto’s',
  'Automotive',
  'Voertuigtechnologie',
  'Klantcommunicatie',
  'Productpresentaties',
  'Dealerondersteuning',
  'Evenementen',
]

const specialiteiten = [
  { icon: GraduationCap, title: 'EV-gebruikerstraining', description: 'Persoonlijke, praktische uitleg over wat een elektrische auto kan en hoe je hem optimaal gebruikt.' },
  { icon: Rocket, title: 'Automotive productintroducties', description: 'Ondersteuning bij de demonstratie van nieuwe modellen en technologie naar klanten toe.' },
  { icon: Handshake, title: 'Dealerondersteuning', description: 'Wij regelen de planning, uitvoering en kwaliteitsbewaking van klantgerichte trainingen. Dat versterkt ook de merkbeleving.' },
  { icon: CalendarRange, title: 'Mobiliteitsevenementen', description: 'Trainers en begeleiders voor evenementen waar uitleg en demonstratie centraal staan.' },
  { icon: BatteryCharging, title: 'EV- en laadtechnologie', description: 'Diepgaande kennis van laadtechniek, actieradius, energiemanagement en verschillende accutechnologieën.' },
]

const kernwaarden = [
  { icon: UserCheck, label: 'Persoonlijk' },
  { icon: Wrench, label: 'Praktisch' },
  { icon: BadgeCheck, label: 'Professioneel' },
  { icon: Compass, label: 'Onafhankelijk' },
  { icon: MapPin, label: 'Landelijk inzetbaar' },
  { icon: Star, label: 'Kwaliteit' },
]

function WieZijnWij() {
  return (
    <>
      <PageMeta
        title="Wie zijn wij | Evolve Mobility"
        description="Landelijk netwerk van gespecialiseerde EV-trainers en automotive professionals, met één centraal aanspreekpunt."
      />

      <Hero
        tone="light"
        eyebrow="Wie zijn wij"
        title="Wij helpen mensen het maximale uit hun elektrische auto te halen."
        subtitle="Elektrisch rijden brengt nieuwe technologie met zich mee, en daarmee ook nieuwe vragen. Wij zijn er om die vragen te beantwoorden. Praktisch, persoonlijk en onafhankelijk van merk of dealer. Van individuele gebruikerstrainingen tot landelijke dealerintroducties en mobiliteitsevenementen."
      />

      <section className="bg-white px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
          <SectionHeading
            title="Trainers en automotive professionals"
            description="Ons team bestaat uit een netwerk van automotive professionals met ervaring op uiteenlopende vlakken binnen de sector."
          />
          <div className="flex flex-wrap content-start gap-3">
            {expertises.map((item, index) => (
              <Reveal key={item} delay={index * 0.05} direction="right">
                <span className="inline-flex rounded-full border border-ink-200 bg-ink-50 px-4 py-2 text-sm font-medium text-ink-700">
                  {item}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[auto,1fr] md:items-start md:gap-16">
          <Reveal>
            <ProfilePhoto className="h-32 w-32 lg:h-40 lg:w-40" />
          </Reveal>
          <div>
            <SectionHeading title="Wie is Oscar?" />
            <Reveal delay={0.2}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-600">
                <p>
                  Mijn naam is Oscar Spermon. Auto&apos;s zijn al van jongs af aan mijn passie.
                </p>
                <p>
                  Op mijn achttiende begon ik als verkoper bij Škoda. Daar merkte ik al snel
                  hoeveel vragen klanten hebben bij de overstap naar elektrisch rijden. Als
                  verkoper weet ik als geen ander hoe de aanschaf en aflevering van een
                  elektrische auto verloopt en welke vragen klanten daarbij hebben.
                </p>
                <p>
                  Klanten vinden het vaak fantastisch dat ze na de aanschaf een training kunnen
                  volgen waarbij er echt tijd voor hen wordt genomen, en waarin ze al hun vragen
                  kunnen stellen. In mijn rol als trainer zie ik vervolgens hoeveel ze daar in de
                  praktijk echt aan hebben.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink-50 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Waar wij goed in zijn"
            align="center"
            className="mx-auto"
          />
          <div className="mx-auto mt-14 max-w-2xl space-y-8">
            {specialiteiten.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="group border-l-2 border-ink-200 py-2 pl-6 transition-colors duration-300 ease-premium hover:border-flare-500">
                  <div className="flex items-center gap-3">
                    <item.icon
                      className="h-5 w-5 flex-shrink-0 text-ink-400 transition-colors duration-300 ease-premium group-hover:text-flare-600"
                      strokeWidth={1.75}
                    />
                    <h3 className="font-heading text-lg font-semibold text-ink-950">{item.title}</h3>
                  </div>
                  <p className="mt-2 pl-8 text-sm leading-relaxed text-ink-600">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <NetworkCoverage
        title="Eén organisatie, landelijk vertegenwoordigd"
        description="Door heel Nederland werken wij samen met een geselecteerd netwerk van gespecialiseerde trainers. Een landelijk netwerk zodat er altijd iemand in de buurt is."
      />

      <section className="bg-white px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading title="Waar wij voor staan" align="center" className="mx-auto" />
          <div className="mt-14 flex flex-wrap items-stretch justify-center gap-4">
            {kernwaarden.map((waarde, index) => (
              <Reveal key={waarde.label} delay={index * 0.06}>
                <div className="flex items-center gap-3 rounded-full border border-ink-200 bg-ink-50 px-6 py-4">
                  <waarde.icon className="h-5 w-5 text-flare-600" strokeWidth={1.75} />
                  <span className="font-heading text-sm font-semibold text-ink-950">{waarde.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default WieZijnWij
