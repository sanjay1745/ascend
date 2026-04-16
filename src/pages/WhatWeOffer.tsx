import { Helmet } from 'react-helmet-async'

export default function WhatWeOffer() {
  const offerings = [
    {
      title: 'Videography',
      description:
        "With several years of experience shooting in every realm of the fitness industry, we've got the expertise to bring your vision to life. If you're looking for a team that goes beyond holding the camera for you, we're here to help — with knowledge in a variety of mediums, from mainstream social media content to documentary-style filmmaking, we'll help shape your ideas and craft them for the right delivery on any platform.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.82v6.36a1 1 0 0 1-1.447.89L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" />
        </svg>
      ),
      links: [
        { label: 'Shortform Work Samples', href: '/#selected-work' },
        { label: 'Longform Work Samples', href: '/#selected-work' },
      ],
    },
    {
      title: 'Social Media Marketing',
      description:
        "We offer full-scale social media packages, tailored to fit your needs. Don't want to manage posting schedules, cross-posting to every platform, optimizing captions, and everything else that comes with trying to stay afloat on social today? You don't have to anymore. We'll set you up with a dedicated Content Manager to oversee all your social media needs, and create content workflows to expand your reach and engagement.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M7 8h10M7 12h4m1 8a9 9 0 1 1 0-18 9 9 0 0 1 0 18zm-4-4h.01M17 16h.01" />
        </svg>
      ),
    },
    {
      title: 'Photography',
      description:
        "Capture the moment — whether it's training or competition day, we're here to help you document it with high-quality photos that can serve as evergreen content for social media, marketing campaigns, and more.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M3 9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" /><circle cx="12" cy="13" r="3" />
        </svg>
      ),
    },
    {
      title: 'Consulting',
      description:
        "We've been there. Schedule a consultation call to get advice on building your brand, telling your story, creating content strategies, or anything else in production and marketing. We've had the opportunity to create and collaborate with some of the most influential people in the industry, and we love sharing what we've learned with others.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      links: [
        { label: 'Contact Us', href: '/contact' },
      ],
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
              {item.links && (
                <div className="mt-4 flex flex-col gap-2">
                  {item.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="inline-flex items-center justify-center rounded-md px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-80"
                      style={{ backgroundColor: '#F97316' }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
