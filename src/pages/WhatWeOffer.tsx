import { Helmet } from 'react-helmet-async'

export default function WhatWeOffer() {
  const offerings = [
    {
      title: 'Strategy & Consulting',
      description:
        'We work alongside you to define a clear path forward — identifying opportunities, removing obstacles, and building a roadmap that translates vision into action.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z" />
        </svg>
      ),
    },
    {
      title: 'Creative Production',
      description:
        'From concept to delivery, we handle the full production process — bringing your brand story to life through compelling visuals, content, and experiences.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 1 1 3.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
    },
    {
      title: 'Brand Development',
      description:
        'We help you build a brand that resonates — from identity and positioning to messaging and visual systems that stand out and endure.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z" />
        </svg>
      ),
    },
    {
      title: 'Growth & Execution',
      description:
        'Ideas without execution are just dreams. We roll up our sleeves and work in the trenches with you — building momentum, tracking metrics, and iterating until results come.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Coaching & Development',
      description:
        'Personalized coaching for leaders, entrepreneurs, and high-performers who want to level up — in mindset, skills, and results.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        </svg>
      ),
    },
    {
      title: 'Events & Experiences',
      description:
        'We design and produce events that inspire, connect, and move people — from intimate workshops to large-scale productions.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
        </svg>
      ),
    },
  ]

  return (
    <>
      <Helmet>
        <title>What We Offer — Ascender Production</title>
        <meta name="description" content="Explore Ascender Production's services — video production, brand content, documentaries, and more for brands, athletes, and creators." />
        <meta property="og:title" content="What We Offer — Ascender Production" />
        <meta property="og:description" content="Video production services for brands, athletes, and creators. Based in CA & HI." />
      </Helmet>
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4">
          Services
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">What We Offer</h1>
        <div className="h-px w-16 bg-foreground/20 mb-6" />
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-16">
          We offer a range of services designed to help you rise — whether you&apos;re launching
          something new, scaling what works, or reinventing what isn&apos;t.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border p-6 hover:border-foreground/30 transition-colors group"
            >
              <div className="mb-4 text-muted-foreground group-hover:text-foreground transition-colors">
                {item.icon}
              </div>
              <h3 className="text-base font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
