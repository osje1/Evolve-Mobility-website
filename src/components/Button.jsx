import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const variants = {
  primary:
    'bg-flare-500 text-white shadow-raised hover:-translate-y-0.5 hover:bg-flare-600 active:translate-y-0',
  secondary:
    'border border-ink-300 text-ink-900 hover:-translate-y-0.5 hover:border-ink-900 active:translate-y-0',
  ghostOnDark:
    'border border-white/25 text-white hover:-translate-y-0.5 hover:border-white/60 active:translate-y-0',
}

function Button({ to, href, onClick, type = 'button', variant = 'primary', icon = true, className = '', children }) {
  const classes = `group inline-flex w-fit items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-transform duration-300 ease-premium ${variants[variant]} ${className}`

  const content = (
    <>
      {children}
      {icon && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
          strokeWidth={2.5}
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  )
}

export default Button
