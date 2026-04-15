import { Helmet } from 'react-helmet-async';

export default function WhoWeAre() {
  return (
    <>
      <Helmet>
        <title>Who We Are — Ascender Production</title>
        <meta name="description" content="Meet the founders of Ascender Production — Ken Munoz and Sanjay Suresh. Based in California and Hawaii, creating visual stories that rise above the standard." />
        <meta property="og:title" content="Who We Are — Ascender Production" />
        <meta property="og:description" content="Meet Ken Munoz and Sanjay Suresh, founders of Ascender Production." />
      </Helmet>
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4">
          Our Story
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Who We Are</h1>
        <div className="h-px w-16 bg-foreground/20 mb-10" />
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            Ascender was founded in 2024 by Ken Munoz and Sanjay Suresh to serve Northern California and Honolulu, Hawaii.
          </p>
          <p>
            Ascender and our tagline,{' '}
            <span className="font-semibold text-foreground">&ldquo;RISE N&apos; ASCEND&rdquo;</span>{' '}
            were born out of our company mission: to Rise in a sea of production companies and SMMA agencies, and Ascend above the &ldquo;industry standard.&rdquo;
          </p>
          <p>
            More than a statement, it&apos;s a daily commitment by us and everyone we&apos;re associated with to not only get up, but get up and push the bar higher.
          </p>
        </div>

        {/* Meet our Founders */}
        <div className="mt-20">
          <div className="h-px w-full bg-foreground/10 mb-12" />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: '#F97316' }}>
            The Team
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">Meet our Founders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                name: 'Ken Munoz',
                role: 'Co-Founder',
                bio: "Based in Honolulu, Hawaii, Ken combines his passions of fitness n' filmmaking to understand client visions and bring them to life.",
                bullets: [
                  'Film Degree Graduate from the University of Hawaii Manoa',
                  '2x Ironman 140.6 finisher',
                  '2x Honolulu Marathon finisher',
                  "2x 50-mile ultramarathon finisher (including BPN's Survive the Night 2025 overnight ultramarathon in Austin, Texas)",
                ],
                photo: '/photos/ken-founder page/20251126_COZUMEL-05.JPG',
              },
              {
                name: 'Sanjay Suresh',
                role: 'Co-Founder',
                bio: 'Based in Sacramento, California, Sanjay has travelled the world while creating content in the fitness industry from 2022 to 2026 after graduating from high school, working with some of the most viral influencers and bodybuilders in the industry.',
                bullets: [
                  'Owner and Creative Director of Stoik Gym in Roseville, California',
                  'Creative Director for 4x Mr. Olympia Jeremy Buendia (2022 - 2026)',
                  'Ironman 70.3 Finisher',
                  '2x Honolulu Marathon Finisher',
                ],
                photo: null as string | null,
              },
            ].map((founder) => (
              <div key={founder.name} className="rounded-xl border border-border p-8">
                {founder.photo ? (
                  <img
                    src={founder.photo}
                    alt={founder.name}
                    className="w-32 h-32 rounded-full object-cover mb-6"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-foreground/20 border border-border mb-6" />
                )}
                <h3 className="text-xl font-bold text-foreground">{founder.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mt-1 mb-4" style={{ color: '#F97316' }}>
                  {founder.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{founder.bio}</p>
                {founder.bullets && (
                  <ul className="mt-3 space-y-1.5">
                    {founder.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-500 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Photo grid */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Row 1: wide left + tall right */}
          <div className="col-span-2 aspect-video rounded-xl bg-foreground/10 overflow-hidden">
            <img src="/photos/ultimate duo pics/timeline.00_00_24_13.Still059.jpeg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="row-span-2 rounded-xl bg-foreground/10 overflow-hidden">
            <img src="/photos/ultimate duo pics/20251031_STN_FINISH-04.JPG" alt="" className="w-full h-full object-cover" />
          </div>
          {/* Row 2: two small squares */}
          <div className="aspect-square rounded-xl bg-foreground/10 overflow-hidden">
            <img src="/photos/ultimate duo pics/20250111SSM-078.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-square rounded-xl bg-foreground/10 overflow-hidden">
            <img src="/photos/ultimate duo pics/SSM20240714-002.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          {/* Row 3: three equal */}
          <div className="aspect-square rounded-xl bg-foreground/10 overflow-hidden">
            {/* photo-5 */}
          </div>
          <div className="aspect-square rounded-xl bg-foreground/10 overflow-hidden">
            {/* photo-6 */}
          </div>
          <div className="aspect-square rounded-xl bg-foreground/10 overflow-hidden">
            {/* photo-7 */}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
