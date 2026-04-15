import { useState } from 'react'

interface Project {
  id: number
  title: string
  client: string
  year: string
  category: string
  gradient: string
  size: 'wide' | 'tall' | 'normal'
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Carry Us',
    client: 'RIVIAN',
    year: '2023',
    category: 'Branded Content',
    gradient: 'from-zinc-900 via-slate-800 to-zinc-900',
    size: 'wide',
  },
  {
    id: 2,
    title: 'NIL Anthem',
    client: 'CELSIUS × ESPN',
    year: '2025',
    category: 'Branded Content',
    gradient: 'from-zinc-800 via-neutral-900 to-stone-900',
    size: 'tall',
  },
  {
    id: 3,
    title: '4EVR',
    client: 'ISOKNOCK',
    year: '2023',
    category: 'Short Film',
    gradient: 'from-stone-900 via-zinc-800 to-neutral-900',
    size: 'normal',
  },
  {
    id: 4,
    title: 'Back In Time',
    client: 'SOUNDMINT',
    year: '2022',
    category: 'Music Video',
    gradient: 'from-neutral-900 via-zinc-700 to-stone-900',
    size: 'normal',
  },
  {
    id: 5,
    title: 'Beyond This Atmosphere II',
    client: 'ORIGINAL',
    year: '2023',
    category: 'Short Film',
    gradient: 'from-zinc-900 via-slate-700 to-zinc-800',
    size: 'normal',
  },
  {
    id: 6,
    title: 'Altered State',
    client: 'ADOBE',
    year: '2021',
    category: 'Branded Content',
    gradient: 'from-stone-800 via-neutral-900 to-zinc-900',
    size: 'wide',
  },
  {
    id: 7,
    title: 'This Is Bluehour',
    client: 'ORIGINAL',
    year: '2021',
    category: 'Short Film',
    gradient: 'from-zinc-800 via-slate-900 to-neutral-800',
    size: 'normal',
  },
  {
    id: 8,
    title: 'Ascension',
    client: 'MEA INFERNO',
    year: '2022',
    category: 'Music Video',
    gradient: 'from-neutral-800 via-zinc-900 to-stone-800',
    size: 'normal',
  },
  {
    id: 9,
    title: 'Hypebeast × Porsche',
    client: 'HYPEBEAST',
    year: '2023',
    category: 'Branded Content',
    gradient: 'from-zinc-700 via-neutral-900 to-zinc-900',
    size: 'wide',
  },
]

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-10 w-10 text-white/80"
      fill="currentColor"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  const heightClass =
    project.size === 'tall' ? 'h-[480px]' : 'h-[320px]'

  return (
    <div
      className={`relative overflow-hidden cursor-pointer group ${heightClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Placeholder image — gradient bg */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 ease-out ${
          hovered ? 'scale-105' : 'scale-100'
        }`}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Year tag — always visible */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase">
          {project.year}
        </span>
      </div>

      {/* Play button — center, fades in */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
          <PlayIcon />
        </div>
      </div>

      {/* Bottom info overlay — slides up on hover */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-10 p-5 transition-all duration-400 ease-out ${
          hovered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
        }}
      >
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
          {project.category} — Director
        </p>
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/60">
          {project.client}
        </p>
        <h3 className="mt-0.5 text-xl font-bold leading-tight text-white">
          {project.title}
        </h3>
      </div>

      {/* Subtle border */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none" />
    </div>
  )
}

export default function Gallery() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between border-b border-white/10 pb-8">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/30">
              Ascender Production
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
              Selected Work
            </h1>
          </div>
          <p className="hidden text-sm text-white/30 md:block">
            {projects.length} Projects · 2021–2025
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* Row 1: wide + tall */}
        <div className="mb-2 grid grid-cols-1 gap-2 md:grid-cols-3">
          <div className="md:col-span-2">
            <ProjectCard project={projects[0]} />
          </div>
          <div>
            <ProjectCard project={{ ...projects[1], size: 'tall' }} />
          </div>
        </div>

        {/* Row 2: three equal */}
        <div className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <ProjectCard project={projects[2]} />
          <ProjectCard project={projects[3]} />
          <ProjectCard project={projects[4]} />
        </div>

        {/* Row 3: normal + wide */}
        <div className="mb-2 grid grid-cols-1 gap-2 md:grid-cols-3">
          <div>
            <ProjectCard project={projects[5]} />
          </div>
          <div className="md:col-span-2">
            <ProjectCard project={{ ...projects[6], size: 'normal' }} />
          </div>
        </div>

        {/* Row 4: two equal */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <ProjectCard project={projects[7]} />
          <ProjectCard project={projects[8]} />
        </div>
      </div>

      {/* Footer line */}
      <div className="mx-auto max-w-7xl border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-white/20">
          All Work · Director
        </p>
      </div>
    </div>
  )
}
