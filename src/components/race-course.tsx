import { useEffect, useRef, useState } from 'react'

const ORANGE = '#F97316'

type Chapter = {
  id: string
  img: string
  pos: string // object-position, mostly matters for portrait/mobile crops
  eyebrow: string
  title: string
  body?: string
  // race telemetry at the END of this chapter (miles, seconds)
  miles: number
  seconds: number
}

const CHAPTERS: Chapter[] = [
  {
    id: 'start',
    img: 'start',
    pos: '40% center',
    eyebrow: "Rise N' Ascend · Endurance Athlete Films",
    title: 'Every finish line has a story.',
    body: 'Scroll to start the race.',
    miles: 0,
    seconds: 0,
  },
  {
    id: 'raceweek',
    img: 'raceweek',
    pos: '48% center',
    eyebrow: 'Race Week',
    title: 'Months of training come down to one day.',
    body: "We're there before the start line: registration, shakeouts, the nerves and the why.",
    miles: 0,
    seconds: 0,
  },
  {
    id: 'swim',
    img: 'swim',
    pos: '32% center',
    eyebrow: 'Swim · 2.4 mi',
    title: 'The cannon goes off.',
    body: 'Open water, race-morning nerves, and nowhere to hide.',
    miles: 2.4,
    seconds: 1 * 3600 + 4 * 60 + 12,
  },
  {
    id: 'bike',
    img: 'bike',
    pos: '55% center',
    eyebrow: 'Bike · 112 mi',
    title: 'Head down. Hold the line.',
    body: "Hours of wind, heat and lava fields, and we're out there for every mile of it.",
    miles: 114.4,
    seconds: 6 * 3600 + 18 * 60 + 40,
  },
  {
    id: 'run',
    img: 'run',
    pos: '66% center',
    eyebrow: 'Run · 26.2 mi',
    title: 'Mile 18 is where it gets honest.',
    body: "It's the part everyone remembers, and the part most cameras miss.",
    miles: 140.6,
    seconds: 10 * 3600 + 2 * 60 + 41,
  },
  {
    id: 'finish',
    img: 'finish',
    pos: '55% center',
    eyebrow: 'Finish · 140.6 mi',
    title: 'Your race deserves a film.',
    miles: 140.6,
    seconds: 10 * 3600 + 2 * 60 + 41,
  },
]

const N = CHAPTERS.length
const LEGS = [
  { label: 'Swim', chapter: 2 },
  { label: 'Bike', chapter: 3 },
  { label: 'Run', chapter: 4 },
]

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))

function formatClock(totalSeconds: number) {
  const s = Math.floor(totalSeconds)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export function RaceCourse({ onWatchFilms }: { onWatchFilms?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = sectionRef.current
      const stage = stageRef.current
      if (!el || !stage) return
      // The stage sticks just below the nav bar, so measure against that offset
      const stickyTop = parseFloat(getComputedStyle(stage).top) || 0
      const scrollable = el.offsetHeight - stage.offsetHeight
      const travelled = stickyTop - el.getBoundingClientRect().top
      setProgress(scrollable > 0 ? clamp(travelled / scrollable) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Which chapter is active, and how far through it we are
  const scaled = progress * N
  const active = Math.min(N - 1, Math.floor(scaled))
  const local = clamp(scaled - active)

  // Telemetry interpolates from the previous chapter's end values to this chapter's
  const prev = CHAPTERS[Math.max(0, active - 1)]
  const cur = CHAPTERS[active]
  const from = active === 0 ? cur : prev
  const miles = from.miles + (cur.miles - from.miles) * local
  const seconds = from.seconds + (cur.seconds - from.seconds) * local

  // Course bar fills across the swim → bike → run chapters
  const courseFill = clamp((scaled - LEGS[0].chapter) / LEGS.length)
  const finished = active === N - 1

  const skipToEnd = () => {
    const el = sectionRef.current
    const stage = stageRef.current
    if (!el || !stage) return
    const stickyTop = parseFloat(getComputedStyle(stage).top) || 0
    const sectionTop = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: sectionTop + el.offsetHeight - stage.offsetHeight - stickyTop, behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Ascender Production: endurance athlete films"
      style={{ height: `${N * 90 + 100}vh` }}
      className="relative bg-black"
    >
      <div
        ref={stageRef}
        className="sticky top-14 md:top-16 h-[calc(100svh-3.5rem)] md:h-[calc(100svh-4rem)] w-full overflow-hidden text-white"
      >
        {/* Background stills */}
        {CHAPTERS.map((c, i) => {
          const isActive = i === active
          const zoom = reducedMotion ? 1 : isActive ? 1.1 - 0.1 * local : 1.1
          return (
            <img
              key={c.id}
              src={`/photos/race/${c.img}.webp`}
              srcSet={`/photos/race/${c.img}-sm.webp 1080w, /photos/race/${c.img}.webp 1920w`}
              sizes="100vw"
              alt=""
              aria-hidden="true"
              fetchPriority={i === 0 ? 'high' : undefined}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                objectPosition: c.pos,
                opacity: isActive ? 1 : 0,
                transform: `scale(${zoom})`,
                transition: 'opacity 700ms ease, transform 200ms linear',
              }}
            />
          )
        })}

        {/* Legibility gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Race telemetry */}
        <div className="absolute right-5 top-6 sm:right-10 sm:top-8 text-right font-mono tabular-nums">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">Distance</p>
          <p className="text-2xl sm:text-4xl font-semibold">
            {miles.toFixed(1)}
            <span className="ml-1 text-sm sm:text-base text-white/50">/ 140.6 mi</span>
          </p>
          <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/50">Race clock</p>
          <p className="text-lg sm:text-2xl font-semibold" style={{ color: seconds > 0 ? ORANGE : undefined }}>
            {formatClock(seconds)}
          </p>
        </div>

        {/* Chapter captions */}
        <div className="absolute inset-x-0 bottom-36 sm:bottom-40 mx-auto max-w-7xl px-5 sm:px-10">
          <div className="relative min-h-[230px] sm:min-h-[260px] max-w-3xl">
            {CHAPTERS.map((c, i) => {
              const isActive = i === active
              const Heading = i === 0 ? 'h1' : 'h2'
              return (
                <div
                  key={c.id}
                  aria-hidden={!isActive}
                  className="absolute inset-x-0 bottom-0"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: `translateY(${isActive ? 0 : i < active ? -24 : 24}px)`,
                    transition: 'opacity 500ms ease, transform 500ms ease',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
                    {c.eyebrow}
                  </p>
                  <Heading className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight drop-shadow-lg">
                    {c.title}
                  </Heading>
                  {c.body && (
                    <p className="mt-4 max-w-xl text-base sm:text-lg text-white/75 leading-relaxed">{c.body}</p>
                  )}
                  {c.id === 'finish' && (
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href="/what-we-offer"
                        tabIndex={isActive ? 0 : -1}
                        className="inline-flex items-center rounded-md px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
                        style={{ backgroundColor: ORANGE }}
                      >
                        View Packages
                      </a>
                      <button
                        type="button"
                        tabIndex={isActive ? 0 : -1}
                        onClick={onWatchFilms}
                        className="inline-flex items-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                      >
                        Watch Our Films
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Course map */}
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-8 sm:px-10 sm:pb-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">Start</span>
            <div className="relative flex-1">
              {/* Track */}
              <div className="relative">
              <div className="grid grid-cols-3 gap-1">
                {LEGS.map((leg, i) => {
                  const legFill = clamp(courseFill * LEGS.length - i)
                  return (
                    <div key={leg.label} className="relative h-1 overflow-hidden rounded-full bg-white/20">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ width: `${legFill * 100}%`, backgroundColor: ORANGE }}
                      />
                    </div>
                  )
                })}
              </div>
              {/* Athlete marker */}
              <div
                className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
                style={{
                  left: `${courseFill * 100}%`,
                  backgroundColor: ORANGE,
                  boxShadow: `0 0 0 6px rgba(249,115,22,0.25)`,
                }}
              />
              </div>
              {/* Leg labels */}
              <div className="mt-3 grid grid-cols-3 gap-1">
                {LEGS.map((leg) => (
                  <span
                    key={leg.label}
                    className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] transition-colors"
                    style={{ color: active === leg.chapter ? ORANGE : 'rgba(255,255,255,0.45)' }}
                  >
                    {leg.label}
                  </span>
                ))}
              </div>
            </div>
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.25em] transition-colors"
              style={{ color: finished ? ORANGE : 'rgba(255,255,255,0.6)' }}
            >
              Finish
            </span>
          </div>
        </div>

        {/* Skip */}
        {!finished && (
          <button
            type="button"
            onClick={skipToEnd}
            className="absolute left-5 top-6 sm:left-10 sm:top-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-white"
          >
            Skip to finish ↓
          </button>
        )}
      </div>
    </section>
  )
}
