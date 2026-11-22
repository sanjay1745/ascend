import { Helmet } from 'react-helmet-async'

const ORANGE = '#F97316'

type Package = {
  id: string
  name: string
  film: string
  bestFit: string
  intro?: string
  features: string[]
  featured?: boolean
}

// Ordered highest tier → lowest tier
const packages: Package[] = [
  {
    id: 'full-journey',
    name: 'The Full Journey',
    film: '15–25 minute documentary, scoped to your story',
    bestFit: 'Athletes documenting a goal, a comeback, or a bigger personal journey.',
    intro: 'Everything we offer:',
    features: [
      'Two filmmakers across four race-week dates + 1–2 training sessions',
      'Training coverage: preparation, everyday life and key moments of the build',
      'Two pre-race days: shakeouts, registration, prep & interviews',
      'Race-day coverage tailored to your event',
      'Post-race interview the following day',
      'Two training teasers + two pre-race reels',
      'Race-day Instagram Stories at key milestones',
      'Same-night finish clip + recap within 48 hours',
      'Five documentary cutdowns for social',
      'Film within 6–8 weeks, two rounds of revisions',
    ],
    featured: true,
  },
  {
    id: 'mini-doc',
    name: 'Race Week Mini-Doc',
    film: '5–10 minute mini-documentary',
    bestFit: 'First-timers and athletes with a meaningful story.',
    features: [
      'Two filmmakers across four filming dates',
      'Two pre-race days: shakeouts, registration, prep & interviews',
      'Up to 16 hours of race-day coverage',
      'Post-race interview the following day',
      'Two lead-up reels + race-day Instagram Stories',
      'Same-night finish clip + recap within 48 hours',
      'Three documentary cutdowns for social',
      'Film within 4–6 weeks, two rounds of revisions',
    ],
  },
  {
    id: 'race-day',
    name: 'Race Day Highlight',
    film: '60–90 second cinematic reel',
    bestFit: 'Athletes wanting premium coverage of their race.',
    features: [
      'One filmmaker, one race day',
      'Race morning preparation',
      'Up to 16 hours of race-day coverage',
      'Highlight delivered within 7 days',
      'One round of revisions',
    ],
  },
]

const comparison: { label: string; values: [string, string, string] }[] = [
  { label: 'Crew / production', values: ['One filmmaker / one race day', 'Two filmmakers / four filming dates', 'Two filmmakers / four race-week dates + 1–2 training sessions'] },
  { label: 'Training coverage', values: ['', '', 'Preparation, everyday life and key moments during the build'] },
  { label: 'Pre-race coverage', values: ['Race morning preparation', 'Two days: shakeouts, registration, preparation and interviews; up to 4 hours per day', 'Two days: shakeouts, registration, preparation and interviews'] },
  { label: 'Race-day coverage', values: ['Up to 16 hours', 'Up to 16 hours', 'Tailored to your event'] },
  { label: 'Post-race interview', values: ['', 'Following day; up to 2 hours', 'Following day'] },
  { label: 'Main film', values: ['60–90 second cinematic reel', '5–10 minute mini-documentary', '15–25 minute documentary; scoped to the story'] },
  { label: 'Lead-up posts', values: ['', 'Two reels, one each pre-race day', 'Two training teasers + two pre-race reels'] },
  { label: 'Race-day updates', values: ['', 'Instagram Stories at key milestones', 'Instagram Stories at key milestones'] },
  { label: 'Quick delivery', values: ['Highlight within 7 days', 'Same-night finish clip + recap within 48 hours', 'Same-night finish clip + recap within 48 hours'] },
  { label: 'Additional social edits', values: ['', 'Three documentary cutdowns', 'Five documentary cutdowns'] },
  { label: 'Film / revisions', values: ['Within 7 days / one round', 'Within 4–6 weeks / two rounds', 'Within 6–8 weeks / two rounds'] },
]

const otherServices = [
  {
    title: 'Brand & Social Video',
    description:
      'Years of shooting across every realm of the fitness industry, from shortform social content to branded campaigns, crafted for the right delivery on any platform.',
    link: { label: 'See shortform work', href: '/#selected-work' },
  },
  {
    title: 'Social Media Management',
    description:
      'A dedicated Content Manager to handle posting schedules, cross-posting, captions and content workflows that grow your reach and engagement.',
  },
  {
    title: 'Photography',
    description:
      'Training or competition day, high-quality photos that serve as evergreen content for social media, marketing campaigns and more.',
  },
  {
    title: 'Consulting',
    description:
      "Advice on building your brand, telling your story and content strategy, drawn from work with some of the most influential people in the industry.",
    link: { label: 'Book a call', href: '/contact' },
  },
]

function Check({ featured }: { featured?: boolean }) {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke={featured ? ORANGE : 'currentColor'}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}

function PackageCard({ pkg }: { pkg: Package }) {
  const f = pkg.featured
  return (
    <div
      className={`relative flex flex-col rounded-2xl p-7 ${
        f
          ? 'border-2 bg-orange-500/[0.06] shadow-2xl shadow-orange-500/10 lg:-my-6 lg:py-12'
          : 'border border-border'
      }`}
      style={f ? { borderColor: ORANGE } : undefined}
    >
      {f && (
        <span
          className="absolute -top-3.5 left-7 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white"
          style={{ backgroundColor: ORANGE }}
        >
          Signature Package
        </span>
      )}

      <h3 className={`font-bold tracking-tight ${f ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>{pkg.name}</h3>
      <p
        className={`mt-2 font-semibold ${f ? 'text-base' : 'text-sm text-muted-foreground'}`}
        style={f ? { color: ORANGE } : undefined}
      >
        {pkg.film}
      </p>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        <span className="font-semibold text-foreground">Best for:</span> {pkg.bestFit}
      </p>

      <div className="my-6 h-px w-full bg-border" />

      {pkg.intro && <p className="mb-3 text-sm font-semibold">{pkg.intro}</p>}
      <ul className={`space-y-3 text-sm leading-relaxed ${f ? 'text-foreground' : 'text-muted-foreground'}`}>
        {pkg.features.map((feat) => (
          <li key={feat} className="flex items-start gap-2.5">
            <Check featured={f} />
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <a
          href="/contact"
          className={`inline-flex w-full items-center justify-center rounded-md px-4 font-semibold transition-opacity hover:opacity-85 ${
            f ? 'py-3.5 text-sm text-white' : 'py-2.5 text-xs border border-border text-foreground hover:bg-foreground/5'
          }`}
          style={f ? { backgroundColor: ORANGE } : undefined}
        >
          {f ? 'Start Your Story' : 'Inquire'}
        </a>
      </div>
    </div>
  )
}

export default function WhatWeOffer() {
  return (
    <>
      <Helmet>
        <title>What We Offer — Ascender Production</title>
        <meta name="description" content="Endurance athlete films by Ascender Production: race-day highlights, race-week mini-documentaries and full-journey documentaries for triathletes, marathoners and ultrarunners." />
        <meta property="og:title" content="Endurance Athlete Films — Ascender Production" />
        <meta property="og:description" content="Capture your race. Tell your story. Document your journey. Athlete mini-documentaries from Ascender Production." />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground">
        {/* Hero */}
        <header className="relative overflow-hidden">
          <img
            src="/photos/composed thumbnail.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
          <div className="relative mx-auto max-w-5xl px-6 pt-32 pb-20 sm:pt-40 sm:pb-28">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: ORANGE }}>
              Endurance Athlete Films
            </p>
            <h1 className="max-w-3xl text-4xl sm:text-6xl font-bold tracking-tight text-white">
              Your race deserves a film.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/75 leading-relaxed">
              Capture your race. Tell your story. Document your journey. We make mini-documentaries
              for triathletes, marathoners and ultrarunners, made by filmmakers who race too.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#packages"
                className="inline-flex items-center rounded-md px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
                style={{ backgroundColor: ORANGE }}
              >
                View Packages
              </a>
              <a
                href="/#longform-work"
                className="inline-flex items-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Watch Our Films
              </a>
            </div>
          </div>
        </header>

        {/* Packages */}
        <section id="packages" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Packages
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Choose how much of the story we tell.</h2>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            A race is one day. The story is everything it took to get there. Each package goes
            deeper into your journey, from the finish line back to the first training session.
          </p>

          <div className="mt-16 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3 lg:gap-6">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-muted-foreground">
            Every film is quoted to your race and your story.{' '}
            <a href="/contact" className="font-semibold underline underline-offset-4 hover:text-foreground">
              Reach out for pricing.
            </a>
          </p>
        </section>

        {/* Comparison */}
        <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">Compare packages</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="w-[19%] p-4" />
                  <th className="w-[31%] p-4 font-bold bg-orange-500/10" style={{ color: ORANGE }}>
                    The Full Journey
                  </th>
                  <th className="w-[25%] p-4 font-semibold">Race Week Mini-Doc</th>
                  <th className="w-[25%] p-4 font-semibold">Race Day Highlight</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-0 align-top">
                    <th scope="row" className="p-4 font-semibold">{row.label}</th>
                    {[...row.values].reverse().map((v, i) => (
                      <td
                        key={i}
                        className={`p-4 leading-relaxed ${
                          i === 0 ?'bg-orange-500/10 text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {v || <span className="text-muted-foreground/50">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
          <div className="rounded-2xl border-2 p-8 sm:p-12" style={{ borderColor: ORANGE }}>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">Training for something big?</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              The best stories start months before the start line. Tell us about your race, your goal
              and why it matters, and we&apos;ll build The Full Journey around it.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center rounded-md px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: ORANGE }}
            >
              Start Your Story
            </a>
          </div>
        </section>

        {/* Other services */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Also Available
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-10">More ways we work with athletes and brands</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {otherServices.map((s) => (
                <div key={s.title}>
                  <h3 className="text-base font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  {s.link && (
                    <a
                      href={s.link.href}
                      className="mt-3 inline-block text-sm font-semibold hover:opacity-80"
                      style={{ color: ORANGE }}
                    >
                      {s.link.label} →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
