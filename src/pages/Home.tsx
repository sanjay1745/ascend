import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CircularGallery, type GalleryItem } from '@/components/ui/circular-gallery';

const galleryData: GalleryItem[] = [
  { common: '1', binomial: '', photo: { url: '/photos/homepage1.jpg',      text: '', by: '' } },
  { common: '2', binomial: '', photo: { url: '/photos/homepage2.jpg',      text: '', by: '' } },
  { common: '3', binomial: '', photo: { url: '/photos/homepage-3.jpg',     text: '', by: '' } },
  { common: '4', binomial: '', photo: { url: '/photos/homepage-4.jpg',     text: '', by: '' } },
  { common: '5', binomial: '', photo: { url: '/photos/homepage-5.jpg',     text: '', by: '' } },
  { common: '6', binomial: '', photo: { url: '/photos/homepage-6.jpg',     text: '', by: '' } },
  { common: '7', binomial: '', photo: { url: '/photos/homepage-7.jpg',     text: '', by: '' } },
  { common: '8', binomial: '', photo: { url: '/photos/homepage-8.jpg',     text: '', by: '' } },
  { common: '9', binomial: '', photo: { url: '/photos/homepage-9.jpg',     text: '', by: '' } },
  { common: '10', binomial: '', photo: { url: '/photos/homepage-10.jpg',   text: '', by: '' } },
];

const slogan = (
  <div className="relative flex flex-col items-center justify-center text-center">
    {/* Orange glow orb */}
    <div
      className="absolute inset-0 -z-10 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse 140% 120% at 50% 50%, rgba(249,115,22,0.75) 0%, rgba(249,115,22,0.35) 45%, transparent 75%)',
        filter: 'blur(24px)',
      }}
    />
    <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-2" style={{ color: '#F97316' }}>
      Ascender Production
    </p>
    <h1 className="text-5xl md:text-6xl font-bold leading-tight text-foreground drop-shadow-lg">
      RISE N&apos; ASCEND
    </h1>
    <div className="mt-3 h-px w-24 bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
  </div>
);

interface Project {
  id: number;
  title: string;
  client: string;
  year: string;
  category: string;
  gradient: string;
  size: 'wide' | 'tall' | 'normal' | 'video';
  youtubeId: string; // YouTube video ID (e.g. 'dQw4w9WgXcQ' from youtube.com/watch?v=dQw4w9WgXcQ)
  thumbnail?: string; // optional custom thumbnail path (relative to /public), overrides YouTube thumbnail
}

const projects: Project[] = [
  { id: 1, title: 'Nathan Fri attempting to beat David Goggins record of 4,100 pull ups in 24 hours', client: 'NATHAN FREIHOFER', year: '2024', category: 'Mini Documentary', gradient: 'from-zinc-900 via-slate-800 to-zinc-900', size: 'wide', youtubeId: 'tWLAIfWObHs' },
  { id: 2, title: 'LATMAN in Texas', client: 'JAKE LEONARD', year: '2024', category: 'Lifestyle Content', gradient: 'from-zinc-800 via-neutral-900 to-stone-900', size: 'tall', youtubeId: 'rUl-GX-OMBo' },
  { id: 3, title: 'Road to Sub 3, Cerebral Palsy, and Bodybuilding: Matt Hughes', client: 'BXACTIV', year: '2025', category: 'Short Film', gradient: 'from-stone-900 via-zinc-800 to-neutral-900', size: 'normal', youtubeId: 'x21RqEW9w-Y', thumbnail: '/photos/matt cim thumbnail.jpg' },
  { id: 4, title: 'The Itch', client: 'FOUNDER CONTENT: KEN MUNOZ', year: '2025', category: 'Documentary', gradient: 'from-neutral-900 via-zinc-700 to-stone-900', size: 'normal', youtubeId: 'wiZtRZtoPaQ' },
  { id: 5, title: 'The first BXACTIV athlete week', client: 'PAUL PEARCEY', year: '2024', category: 'Brand Content', gradient: 'from-zinc-900 via-slate-700 to-zinc-800', size: 'normal', youtubeId: 'QC8jzkglQ8M' },
  { id: 6, title: 'Altered State', client: 'ADOBE', year: '2021', category: 'Branded Content — Director', gradient: 'from-stone-800 via-neutral-900 to-zinc-900', size: 'wide', youtubeId: '' },
  { id: 7, title: 'This Is Bluehour', client: 'ORIGINAL', year: '2021', category: 'Short Film — Director', gradient: 'from-zinc-800 via-slate-900 to-neutral-800', size: 'normal', youtubeId: '' },
  { id: 8, title: 'Ascension', client: 'MEA INFERNO', year: '2022', category: 'Music Video — Director', gradient: 'from-neutral-800 via-zinc-900 to-stone-800', size: 'normal', youtubeId: '' },
  { id: 9, title: 'Hypebeast × Porsche', client: 'HYPEBEAST', year: '2023', category: 'Branded Content — Director', gradient: 'from-zinc-700 via-neutral-900 to-zinc-900', size: 'wide', youtubeId: '' },
];

interface ShortformProject {
  id: number;
  title: string;
  client?: string;
  projectLabel?: string;
  videoSrc: string; // path relative to /public, e.g. '/videos/my-video.mp4'
  thumbnail?: string; // optional custom poster image, relative to /public
  thumbnailScale?: string; // optional Tailwind scale class e.g. 'scale-125'
  gradient: string;
}

const shortformProjects: ShortformProject[] = [
  { id: 1, title: 'HIDrate Electrolytes social promo', client: 'HIDrate Electrolytes', projectLabel: '2-Year Anniversary Reel', videoSrc: 'https://pub-532f48d14a0d4c10bf1c9c84f11b24e5.r2.dev/20260409_HIDRATE_AD_V2.mp4', thumbnail: '/photos/covers for shortform/hidrate.jpeg', gradient: 'from-zinc-900 via-slate-800 to-zinc-900' },
  { id: 2, title: 'BXACTIV LA Fit Expo Recap', client: 'BXACTIV', projectLabel: '2026 LA Fit Expo Recap', videoSrc: 'https://pub-532f48d14a0d4c10bf1c9c84f11b24e5.r2.dev/BXACTIV LA FIT EXPO RECAP 2026.mp4', thumbnail: '/photos/covers for shortform/20260111_EXPODAY1-48.jpg', thumbnailScale: 'scale-150', gradient: 'from-zinc-800 via-neutral-900 to-stone-900' },
  { id: 3, title: 'Hardeep Rai at Stoik Gym', client: 'Hardeep Rai', projectLabel: 'Hardeep Rai at Stoik Gym', videoSrc: 'https://pub-532f48d14a0d4c10bf1c9c84f11b24e5.r2.dev/Hardeep Rai Workout Reel at Stoik Gym.mp4', thumbnail: '/photos/covers for shortform/Hardeep at Stoik.jpg', gradient: 'from-zinc-800 via-slate-900 to-neutral-800' },
  { id: 4, title: 'Honolulu Marathon Merch Promo', client: 'Honolulu Marathon', projectLabel: '2025 Honolulu Marathon Merch Promo', videoSrc: 'https://pub-532f48d14a0d4c10bf1c9c84f11b24e5.r2.dev/20251208_HNLMARY_v3.mp4', thumbnail: '/photos/covers for shortform/hnl mary.png', gradient: 'from-zinc-900 via-slate-700 to-zinc-800' },
  { id: 5, title: 'LATMAN Chest Workout with Paul Pearcey', client: 'PAUL PEARCEY // BXACTIV', projectLabel: 'Workout Reel with Jake LATMAN Leonard', videoSrc: 'https://pub-532f48d14a0d4c10bf1c9c84f11b24e5.r2.dev/LATMAN Chest Workout with Paul Pearcey BXACTIV.mp4', thumbnail: '/photos/covers for shortform/Paul and Jake in Florida 2024.jpg', gradient: 'from-neutral-900 via-zinc-700 to-stone-900' },
  { id: 6, title: 'Roy Simonson Announcement Teaser', client: 'Skelcore', projectLabel: 'Roy Simonson Announcement Teaser', videoSrc: 'https://pub-532f48d14a0d4c10bf1c9c84f11b24e5.r2.dev/20260309_ROY SIMONSON ANNOUNCEMENT.mp4', thumbnail: '/photos/covers for shortform/Roy Simonson.jpg', gradient: 'from-stone-800 via-neutral-900 to-zinc-900' },
  { id: 7, title: 'Modern Fuel Electrolyte Promo', client: 'Modern Fuel', projectLabel: 'Electrolyte Promo Reel', videoSrc: 'https://pub-532f48d14a0d4c10bf1c9c84f11b24e5.r2.dev/20260202_MODERNFUEL_V1.mp4', thumbnail: '/photos/covers for shortform/modern fuel.jpg', gradient: 'from-stone-900 via-zinc-800 to-neutral-900' },
  { id: 8, title: 'Hardeep Rai at S.M.T.F. Folsom', client: 'Hardeep Rai', projectLabel: 'Hardeep Rai at S.M.T.F. Folsom', videoSrc: 'https://pub-532f48d14a0d4c10bf1c9c84f11b24e5.r2.dev/20250809_JEALOUS.mp4', thumbnail: '/photos/homepage-3.jpg', thumbnailScale: 'scale-125', gradient: 'from-neutral-800 via-zinc-900 to-stone-800' },
];

function ShortformCard({ project }: { project: ShortformProject }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  useEffect(() => {
    if (modalOpen) {
      const t = setTimeout(() => setVisible(true), 80);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [modalOpen]);

  return (
    <>
      {/* Card (facade) */}
      <div
        className="relative flex-shrink-0 w-full aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer hover-float"
        onClick={() => { if (project.videoSrc) setModalOpen(true); }}
      >
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.title} className={`absolute inset-0 w-full h-full object-cover ${project.thumbnailScale ?? ''}`} />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
        )}

        {project.title && (
          <div
            className="absolute bottom-0 left-0 right-0 z-10 p-3"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)' }}
          >
            <h3 className="text-[11px] font-bold leading-tight text-white">{project.title}</h3>
          </div>
        )}

        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
      </div>

      {/* Modal lightbox */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setModalOpen(false)}
        >
          <button
            className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={() => setModalOpen(false)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Mobile: video on top, text below. Desktop: text left, video right */}
          <div
            className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video */}
            <div
              className={`shrink-0 w-full max-w-[260px] md:max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden bg-black transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0 md:translate-x-0' : 'opacity-0 translate-y-6 md:translate-x-8'}`}
              style={{ transitionDelay: '60ms' }}
            >
              <video
                src={project.videoSrc}
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
              />
            </div>

            {/* Text blocks */}
            <div className="flex flex-col gap-5 text-center md:text-left">
              {project.client && (
                <div
                  className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0 md:translate-x-0' : 'opacity-0 translate-y-4 md:-translate-x-8'}`}
                  style={{ transitionDelay: '0ms' }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40 mb-1">Client</p>
                  <p className="text-xl md:text-2xl font-bold text-white">{project.client}</p>
                </div>
              )}
              {project.projectLabel && (
                <div
                  className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0 md:translate-x-0' : 'opacity-0 translate-y-4 md:-translate-x-8'}`}
                  style={{ transitionDelay: '120ms' }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40 mb-1">Project</p>
                  <p className="text-xl md:text-2xl font-bold text-white">{project.projectLabel}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const heightClass = project.size === 'tall' ? 'h-[480px]' : project.size === 'video' ? 'aspect-video' : 'h-[320px]';

  return (
    <div
      className={`relative overflow-hidden ${heightClass} ${playing ? '' : 'cursor-pointer'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { if (!playing && project.youtubeId) setPlaying(true); }}
    >
      {playing ? (
        /* YouTube iframe — only mounts on click (facade pattern) */
        <iframe
          src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0`}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          title={project.title}
        />
      ) : (
        <>
          {/* Background: custom thumbnail > YouTube thumbnail > gradient */}
          {(project.thumbnail || project.youtubeId) ? (
            <img
              src={project.thumbnail ?? `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`}
              alt={project.title}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
                hovered ? 'scale-105' : 'scale-100'
              }`}
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 ease-out ${
                hovered ? 'scale-105' : 'scale-100'
              }`}
            />
          )}

          {/* Year tag */}
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase">
              {project.year}
            </span>
          </div>

          {/* Play button — visible on hover (only when a video is linked) */}
          {project.youtubeId && (
            <div
              className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300 ${
                hovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                <svg viewBox="0 0 24 24" className="h-10 w-10 text-white/80" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* Bottom overlay — title always visible */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 p-5"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)' }}
          >
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
              {project.category}
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/60">
              {project.client}
            </p>
            <h3 className="mt-0.5 text-xl font-bold leading-tight text-white">
              {project.title}
            </h3>
          </div>

          {/* Border */}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none" />
        </>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Ascender Production — Rise N' Ascend</title>
        <meta name="description" content="Video production for brands, athletes, and creators. Based in California and Hawaii. Rise N' Ascend." />
        <meta property="og:title" content="Ascender Production — Rise N' Ascend" />
        <meta property="og:description" content="Video production for brands, athletes, and creators. Based in CA & HI." />
      </Helmet>
    <div className="w-full bg-background text-foreground">
      {/* Circular gallery — sticky scroll section */}
      <div className="h-screen">
        <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
          <div className="w-full h-full scale-[0.55] md:scale-100 origin-center">
            <CircularGallery items={galleryData} centerContent={slogan} />
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 z-10 flex flex-col items-center gap-1 opacity-50 pointer-events-none select-none">
            <p className="text-xs text-muted-foreground">Scroll to explore</p>
            <svg className="h-4 w-4 animate-bounce text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Logo marquee banner */}
      <div className="bg-zinc-950 border-y border-white/10 py-8 overflow-hidden">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-white/25 mb-6">
          Trusted by
        </p>
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex items-center gap-16 px-8">
              {[
                { src: '/logos/hidrate.png',                   alt: 'HiDrate',           cls: 'grayscale' },
                { src: '/logos/youngla.png',                   alt: 'YoungLA',           cls: ''          },
                { src: '/logos/skelcore.png',                  alt: 'Skelcore',          cls: ''          },
                { src: '/logos/bsn.png',                       alt: 'BSN',               cls: ''          },
                { src: '/logos/bxactiv.png',                   alt: 'Bxactiv',           cls: ''          },
                { src: '/logos/honolulu marathon logo.webp',   alt: 'Honolulu Marathon', cls: 'grayscale' },
                { src: '/logos/ufc-logo-png.png',              alt: 'UFC',               cls: ''          },
                { src: '/logos/mount to coast logo.png',       alt: 'Mount to Coast',    cls: ''          },
              ].map((logo) => (
                <div key={logo.alt} className="flex items-center justify-center w-24 h-10 shrink-0">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`max-h-full max-w-full object-contain opacity-50 hover:opacity-100 transition-opacity duration-300 ${logo.cls || 'brightness-0 invert'}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Select Shortform Projects section */}
      <div id="selected-work" className="bg-zinc-950 text-white">
        {/* Section header */}
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b border-white/10 pb-8">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: '#F97316' }}>
                Ascender Production
              </p>
              <h2 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
                Select Shortform Projects
              </h2>
            </div>
          </div>
        </div>

        {/* 8 portrait cards — carousel on mobile, grid on desktop */}
        <div className="pb-24">
          {/* Mobile: swipeable carousel */}
          <div className="md:hidden flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {shortformProjects.map((project) => (
              <div key={project.id} className="snap-start shrink-0 w-[72vw]">
                <ShortformCard project={project} />
              </div>
            ))}
          </div>

          {/* Desktop: original 8-column grid */}
          <div className="hidden md:grid md:grid-cols-8 gap-2 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {shortformProjects.map((project) => (
              <ShortformCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>

      {/* Selected Work section */}
      <div className="bg-zinc-950 text-white">
        {/* Section header */}
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b border-white/10 pb-8">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: '#F97316' }}>
                Ascender Production
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white md:text-6xl">
                Select Longform Projects
              </h2>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          {/* Mobile: single column list of compact cards */}
          <div className="flex flex-col gap-2 md:hidden">
            {[projects[0], projects[3], projects[1], projects[2], projects[4]].map((p) => (
              <ProjectCard key={p.id} project={{ ...p, size: 'video' }} />
            ))}
          </div>

          {/* Desktop: original 2-row layout */}
          <div className="hidden md:block">
            <div className="mb-2 grid grid-cols-2 gap-2">
              <ProjectCard project={{ ...projects[0], size: 'tall' }} />
              <ProjectCard project={{ ...projects[3], size: 'tall' }} />
            </div>
            <div className="mb-2 grid grid-cols-3 gap-2">
              <ProjectCard project={{ ...projects[1], size: 'video' }} />
              <ProjectCard project={{ ...projects[2], size: 'video' }} />
              <ProjectCard project={{ ...projects[4], size: 'video' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
