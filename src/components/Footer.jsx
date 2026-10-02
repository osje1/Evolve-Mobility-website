import { NavLink } from 'react-router-dom'
import logo from '../assets/evolve-mobility-logo.png'

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/wie-zijn-wij', label: 'Wie zijn wij' },
  { to: '/voor-wie', label: 'Voor wie' },
  { to: '/voor-particulieren', label: 'Voor particulieren' },
  { to: '/voor-dealers', label: 'Voor dealers' },
  { to: '/contact', label: 'Contact' },
]

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink-800 bg-ink-950 text-ink-200">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <img src={logo} alt="Evolve Mobility" className="h-7 w-auto" />
            <p className="mt-3 text-sm leading-relaxed text-ink-300">
              Landelijk netwerk van eigen trainers voor EV-gebruikerstrainingen en dealerintroducties.
            </p>
          </div>

          <nav aria-label="Footer navigatie">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className="text-sm text-ink-300 transition-colors duration-200 ease-premium hover:text-flare-400"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-ink-800 pt-6">
          <p className="text-xs text-ink-400">&copy; {year} Evolve Mobility. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
