import React from "react";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

interface Footer7Props {
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Work",
    links: [
      { name: "Select Longform Projects", href: "/#selected-work" },
      { name: "Select Shortform Projects", href: "/#selected-work" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Who We Are", href: "/who-we-are" },
      { name: "What We Offer", href: "/what-we-offer" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "https://www.instagram.com/ascender.productions/?hl=en", label: "Instagram" },
  { icon: <FaYoutube className="size-5" />, href: "https://www.youtube.com/@RISENASCEND", label: "YouTube" },
{ icon: <FaLinkedin className="size-5" />, href: "https://www.linkedin.com/company/ascender-production-company/?viewAsMember=true", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Privacy Policy", href: "#" },
];

export const Footer7 = ({
  sections = defaultSections,
  description = "We create compelling visual stories for brands, athletes, and creators. Based in California.",
  socialLinks = defaultSocialLinks,
  copyright = `© ${new Date().getFullYear()} Ascender Production. All rights reserved.`,
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start">
          {/* Brand + description + socials */}
          <div className="flex w-full flex-col gap-6 lg:max-w-xs">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                ASCENDER
              </h2>
              <p className="mt-4 text-sm text-white/40 leading-relaxed">
                {description}
              </p>
            </div>
            <ul className="flex items-center gap-5 text-white/40">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="hover:text-white transition-colors">
                  <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav sections */}
          <div className="grid w-full gap-8 sm:grid-cols-2 lg:max-w-md lg:gap-16">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/30">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/25 md:flex-row md:items-center">
          <p>{copyright}</p>
          <ul className="flex gap-4">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-white/60 transition-colors">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
