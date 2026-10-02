import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/evolve-mobility-logo.png'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/wie-zijn-wij', label: 'Wie zijn wij' },
  { to: '/voor-wie', label: 'Voor wie' },
  { to: '/voor-particulieren', label: 'Voor particulieren' },
  { to: '/voor-dealers', label: 'Voor dealers' },
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150 transition-[box-shadow,border-color,background-color] duration-300 ease-premium ${
        isScrolled
          ? 'border-white/10 bg-black/85 shadow-floating'
          : 'border-transparent bg-black'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <NavLink
          to="/"
          className="transition-opacity duration-200 ease-premium hover:opacity-80 focus-visible:opacity-80"
          onClick={() => setIsOpen(false)}
        >
          <img src={logo} alt="Evolve Mobility" className="h-6 w-auto lg:h-7" />
        </NavLink>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-medium transition-[color,transform] duration-200 ease-premium hover:text-flare-400 hover:-translate-y-px ${
                    isActive ? 'text-flare-400' : 'text-ink-200'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Menu openen of sluiten"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform duration-200 ease-premium hover:-translate-y-px lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-6 bg-current transition-transform duration-200 ease-premium ${
                isOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-opacity duration-200 ease-premium ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-transform duration-200 ease-premium ${
                isOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {isOpen && (
        <ul className="flex flex-col gap-1 border-t border-white/10 bg-black px-6 py-4 lg:hidden">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 ease-premium hover:bg-white/5 ${
                    isActive ? 'text-flare-400' : 'text-ink-200'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

export default Navbar
