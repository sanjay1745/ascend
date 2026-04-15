import * as React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

type NavItem = { href: string; label: string }

const NAV: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/#selected-work', label: 'Work' },
  { href: '/who-we-are', label: 'Who We Are' },
  { href: '/what-we-offer', label: 'What We Offer' },
  { href: '/contact', label: 'Contact Us' },
]

export default function PromoteHeader() {
  const [open, setOpen] = React.useState(false)
  const [isDark, setIsDark] = React.useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleHashLink = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    const [path, hash] = href.split('#')
    const target = () => {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'instant' })
    }
    if (pathname !== (path || '/')) {
      navigate(path || '/')
      setTimeout(target, 50)
    } else {
      target()
    }
    setOpen(false)
  }

  React.useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    const systemDark =
      typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
    const dark = stored ? stored === 'dark' : !!systemDark
    document.documentElement.classList.toggle('dark', dark)
    setIsDark(dark)
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href)

  const desktopLink = (active: boolean) =>
    [
      'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
      'outline-none focus-visible:ring-2 focus-visible:ring-offset-0',
      'hover:bg-zinc-950/[.03] dark:hover:bg-white/5',
      active
        ? 'text-zinc-950 dark:text-zinc-50 ring-1 ring-inset ring-zinc-950/10 dark:ring-white/10 bg-zinc-950/[.03] dark:bg-white/5'
        : 'text-zinc-600 dark:text-zinc-400',
    ].join(' ')

  const primaryBtn =
    'inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-semibold ' +
    'text-white transition-colors ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40'

  const secondaryBtn =
    'inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium ' +
    'text-zinc-800 dark:text-zinc-200 ' +
    'border border-zinc-950/20 dark:border-white/20 ' +
    'hover:bg-zinc-950/[.03] dark:hover:bg-white/5 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 dark:focus-visible:ring-white/20 ' +
    'transition-colors'

  return (
    <div className="flex flex-col">
      {/* Skip to content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] rounded bg-zinc-900 px-3 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Skip to content
      </a>

      {/* Header */}
      <header
        className={[
          'sticky top-0 z-50 w-full backdrop-blur',
          'bg-white/85 dark:bg-zinc-950/80 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/60',
          'border-b border-zinc-950/20 dark:border-white/20',
        ].join(' ')}
      >
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-950/10 to-transparent dark:via-white/10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 md:h-16 items-center justify-between gap-3">

            {/* Left: burger + brand + desktop nav */}
            <div className="flex items-center gap-4">
              {/* Mobile burger */}
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="md:hidden relative size-9 rounded-md text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 dark:focus-visible:ring-white/20"
              >
                <span className={['absolute inset-x-2 top-[9px] h-[2px] rounded bg-current transition-transform', open ? 'translate-y-[6px] rotate-45' : ''].join(' ')} />
                <span className={['absolute inset-x-2 top-1/2 h-[2px] -translate-y-1/2 rounded bg-current transition-opacity', open ? 'opacity-0' : 'opacity-100'].join(' ')} />
                <span className={['absolute inset-x-2 bottom-[9px] h-[2px] rounded bg-current transition-transform', open ? '-translate-y-[6px] -rotate-45' : ''].join(' ')} />
              </button>

              {/* Brand */}
              <Link to="/" className="inline-flex items-center gap-2" aria-label="Ascender Production Home">
                <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  ASCENDER
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1">
                {NAV.map((item) =>
                  item.href.includes('#') ? (
                    <a
                      key={item.href}
                      href={item.href}
                      className={desktopLink(false)}
                      onClick={(e) => handleHashLink(e, item.href)}
                    >
                      {item.label}
                    </a>
                  ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={desktopLink(isActive(item.href))}
                  >
                    {item.label}
                  </Link>
                  )
                )}
              </nav>
            </div>

            {/* Right: theme toggle + CTA (desktop) */}
            <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                onClick={toggleTheme}
                className={[
                  'inline-flex h-9 w-9 items-center justify-center rounded-md',
                  'border border-zinc-950/20 hover:bg-zinc-950/[.03]',
                  'text-zinc-800 dark:text-zinc-200',
                  'dark:border-white/20 dark:hover:bg-white/5',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 dark:focus-visible:ring-white/20',
                ].join(' ')}
                aria-label="Toggle theme"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 dark:hidden" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 20.5 19 19M5 19l-1.5 1.5M20.5 3.5 19 5" />
                </svg>
                <svg viewBox="0 0 24 24" className="hidden h-4 w-4 dark:block" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>

              <Link to="/who-we-are" className={secondaryBtn}>About</Link>
              <Link to="/contact" className={primaryBtn} style={{ backgroundColor: '#F97316' }}>Get In Touch</Link>
            </div>

            {/* Right (mobile): CTA */}
            <div className="md:hidden">
              <Link to="/contact" className={primaryBtn} style={{ backgroundColor: '#F97316' }}>Contact</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={['fixed inset-0 z-50 md:hidden transition', open ? 'pointer-events-auto' : 'pointer-events-none'].join(' ')}
        aria-hidden={!open}
      >
        <div
          className={['absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity', open ? 'opacity-100' : 'opacity-0'].join(' ')}
          onClick={() => setOpen(false)}
        />
        <aside
          className={[
            'absolute right-0 top-0 h-full w-72 max-w-[calc(100vw-0.75rem)] bg-white/95 p-5 shadow-2xl',
            'backdrop-blur supports-[backdrop-filter]:bg-white/70',
            'border-l border-zinc-950/20',
            'dark:border-white/20 dark:bg-zinc-950/95 dark:supports-[backdrop-filter]:bg-zinc-950/70',
            open ? 'translate-x-0' : 'translate-x-full',
            'transition-transform overflow-y-auto',
          ].join(' ')}
          role="dialog"
          aria-modal="true"
        >
          <div className="mb-5 flex items-center justify-between">
            <Link to="/" onClick={() => setOpen(false)}>
              <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                ASCENDER
              </span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="inline-flex size-9 items-center justify-center rounded-md border border-zinc-950/20 text-zinc-700 hover:bg-zinc-950/[.03] dark:border-white/20 dark:text-zinc-200 dark:hover:bg-white/5"
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-1">
            {NAV.map((item) =>
              item.href.includes('#') ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleHashLink(e, item.href)}
                  className={[
                    'block rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                    'hover:bg-zinc-950/[.03] dark:hover:bg-white/5',
                    'text-zinc-700 dark:text-zinc-300',
                  ].join(' ')}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={[
                    'block rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                    'hover:bg-zinc-950/[.03] dark:hover:bg-white/5',
                    isActive(item.href)
                      ? 'text-zinc-950 dark:text-zinc-50 bg-zinc-950/[.03] dark:bg-white/5 ring-1 ring-inset ring-zinc-950/10 dark:ring-white/10'
                      : 'text-zinc-700 dark:text-zinc-300',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <Link to="/who-we-are" onClick={() => setOpen(false)} className={secondaryBtn}>About</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className={primaryBtn} style={{ backgroundColor: '#F97316' }}>Get In Touch</Link>
          </div>

          <div className="mt-4">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 rounded-md border border-zinc-950/20 px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-950/[.03] dark:border-white/20 dark:text-zinc-200 dark:hover:bg-white/5"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 dark:hidden" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 20.5 19 19M5 19l-1.5 1.5M20.5 3.5 19 5" />
              </svg>
              <svg viewBox="0 0 24 24" className="hidden h-4 w-4 dark:block" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              Toggle theme
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
