// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { seo, personLd, websiteLd, businessLd, crumbs } from '@/lib/seo';
import { createFileRoute, Link, useRouterState } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, ExternalLink, Leaf, MapPin, Menu, X } from 'lucide-react';
import { SiteLayout } from '@/components/site/Layout';
import { ArtSection } from '@/components/site/Sections';
import { ContactSection } from '@/components/site/ContactForm';
import {
  MobileHome,
  LogoVideo,
  FontStyle,
  menuLinks,
  credCards,
  businessCards,
  serviceCardsData,
  useFeatured,
} from '@/components/mobile';
import { journey } from '@/lib/portfolio';
import portrait from '@/assets/portrait.png';
import siteAsset from '@/assets/green-constructions-site.png';
import { useEffect, useState, type ReactNode } from 'react';

export const Route = createFileRoute('/')({
  head: () =>
    seo({
      path: '/',
      title: 'Anmay Saha | Civil Engineer, Building Planner & Construction Professional in Agartala, Tripura',
      description:
        'Anmay Saha is a Civil Engineer, Building Planner and Construction Professional based in Agartala, Tripura, working across building planning, construction, interior design and project execution.',
      jsonLd: [personLd, websiteLd],
    }),
  component: Home,
});

const SIGN_IMAGE_URL = '/assets/sign.png';
const FULL_ADDRESS = 'Sakuntala Road Extension, near N.S. Road, Agartala, Tripura (W), India';

const roles = [
  'Civil Engineer',
  'Material Science Engineer',
  'Artist',
  'Interior Designer',
  'Writer',
  'Social Activist',
  'Proprietor of Green Constructions',
  'Proprietor of Cretoverse',
];

const processSteps = [
  { t: 'Discover', d: 'Understand requirements, vision and project needs.' },
  { t: 'Plan', d: 'Develop layouts, concepts and technical planning.' },
  { t: 'Design', d: 'Refine functionality, aesthetics and details.' },
  { t: 'Build', d: 'Coordinate execution, quality and construction.' },
  { t: 'Deliver', d: 'Complete the project with attention to detail.' },
];

/* ---------------- Signature Image ---------------- */

function AnmaySignature({ className = '' }: { className?: string }) {
  return (
    <img
      src={SIGN_IMAGE_URL}
      alt="Anmay Saha signature"
      loading="lazy"
      className={`mx-auto h-20 w-auto max-w-full object-contain select-none ${className}`}
    />
  );
}

/* ---------------- Desktop styles: grid lines + header override + hero slide ---------------- */

function DesktopStyle() {
  return (
    <style>{`
      /* Only one sticky header on desktop: ours. */
      @media (min-width: 768px) {
        header[class*="sticky"]:not([data-anmay-header]),
        header[class*="fixed"]:not([data-anmay-header]) { display: none !important; }
      }
      .d-checker { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
      .d-checker::before {
        content: ""; position: absolute; inset: 0;
        background-image:
          linear-gradient(to right, rgba(106, 46, 192, 0.055) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(106, 46, 192, 0.055) 1px, transparent 1px);
        background-size: 36px 36px;
        -webkit-mask-image: linear-gradient(to bottom, #000 0, #000 72%, transparent 100%);
                mask-image: linear-gradient(to bottom, #000 0, #000 72%, transparent 100%);
      }
      .d-checker::after {
        content: ""; position: absolute; inset: 0;
        background-image:
          linear-gradient(to right, rgba(44, 53, 43, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(44, 53, 43, 0.04) 1px, transparent 1px);
        background-size: 144px 144px;
        -webkit-mask-image: radial-gradient(ellipse at 70% 15%, #000 0, transparent 70%);
                mask-image: radial-gradient(ellipse at 70% 15%, #000 0, transparent 70%);
      }
      @keyframes dHeroSlideIn {
        0% {
          opacity: 0;
          transform: translateX(64px);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }
      .d-hero-slide {
        animation: dHeroSlideIn 850ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      @media (prefers-reduced-motion: reduce) {
        .d-hero-slide { animation: none; opacity: 1; transform: none; }
      }
    `}</style>
  );
}

/* ---------------- Header ---------------- */

function DesktopHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(to + '/'));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const linkBase = 'whitespace-nowrap text-[13px] font-semibold tracking-wide transition-colors';

  return (
    <header data-anmay-header className="font-montserrat sticky top-0 z-50 border-b border-forest-deep/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        {/* Brand: logo + AnmayArt | Visual Art / Design & Construction */}
        <Link to="/" aria-label="Anmay Art home" className="flex shrink-0 items-center gap-4 leading-none">
          <span className="flex flex-col items-center justify-center gap-1">
            <LogoVideo onDone={() => {}} />
            <span className="text-[13px] font-bold tracking-tight text-primary">AnmayArt</span>
          </span>
          <span aria-hidden className="block h-14 w-px shrink-0 bg-primary" />
          <span className="leading-tight">
            <span className="block whitespace-nowrap text-[20px] font-bold text-ink">Visual Art Design</span>
            <span className="mt-0.5 block whitespace-nowrap text-[16.5px] text-muted-foreground">&amp; Construction</span>
          </span>
        </Link>

        {/* Full links (same as mobile hamburger menu) */}
        <nav aria-label="Main" className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {menuLinks.map((l) =>
            'href' in l ? (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={`${linkBase} text-ink/75 hover:text-primary`}>
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.to}
                className={`${linkBase} ${isActive(l.to) ? 'text-primary' : 'text-ink/75 hover:text-primary'}`}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            to="/contact"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-forest-deep px-5 text-[12.5px] font-bold tracking-[0.08em] text-cream transition hover:opacity-90 sm:inline-flex"
          >
            Get a Quote <ArrowUpRight size={15} />
          </Link>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid h-11 w-11 place-items-center rounded-full border border-forest-deep/15 text-primary lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Tablet dropdown */}
      {open && (
        <div className="border-t border-forest-deep/10 bg-cream lg:hidden">
          <nav aria-label="Menu" className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 px-6 py-4">
            {menuLinks.map((l, i) =>
              'href' in l ? (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-3 border-b border-forest-deep/10 text-sm font-semibold text-ink">
                  <span className="w-6 text-xs text-primary">0{i + 1}</span>
                  {l.label}
                  <ExternalLink size={14} className="ml-auto text-primary" />
                </a>
              ) : (
                <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-3 border-b border-forest-deep/10 text-sm font-semibold text-ink">
                  <span className="w-6 text-xs text-primary">0{i + 1}</span>
                  {l.label}
                  <ArrowRight size={14} className="ml-auto text-primary" />
                </Link>
              ),
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------------- Shared bits ---------------- */

function DHead({ label, title, right }: { label: string; title: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <div className="flex items-center gap-3">
          <span className="h-0.75 w-8 bg-gold" />
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-primary">{label}</p>
        </div>
        <h2 className="mt-3 font-serif text-[2.4rem] font-semibold leading-[1.15] text-ink">{title}</h2>
      </div>
      {right}
    </div>
  );
}

const wrap = 'relative z-10 mx-auto max-w-7xl px-6 lg:px-8';
const btnDark =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-forest-deep bg-forest-deep px-7 text-[13px] font-bold tracking-[0.08em] text-cream shadow-sm transition hover:-translate-y-0.5 hover:shadow-md';
const btnLight =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-forest-deep/30 bg-white px-7 text-[13px] font-bold tracking-[0.08em] text-forest-deep shadow-sm transition hover:-translate-y-0.5 hover:shadow-md';

/* ---------------- Sections ---------------- */

function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(90);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = roles[currentRoleIndex]!;

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(45);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(85);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <section className={`${wrap} grid items-center gap-16 pb-24 pt-16 lg:grid-cols-[1.1fr_0.9fr]`}>
      <div>
        {/* <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary">CIVIL ENGINEER &amp; BUILDING PLANNER</p> */}
        <span className="mt-4 block font-serif text-[clamp(2.4rem,4vw,3.6rem)] font-normal leading-tight text-ink">Hello!</span>
        <h1 className="font-serif text-[clamp(2.8rem,5vw,4.6rem)] font-bold leading-[1.05] text-ink">
          I'm <span className="text-primary">Anmay Saha</span>
        </h1>

        <div className="mt-4 flex h-10 items-center">
          <p className="text-xl font-semibold tracking-wide text-primary">
            {currentText}
            <span className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-primary align-middle" />
          </p>
        </div>

        <p className="mt-4 max-w-lg text-base leading-8 text-muted-foreground">
          Designing thoughtful spaces, planning with precision, and building with purpose.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/about" className={btnDark}>
            About Me <ArrowRight size={16} />
          </Link>
          <Link to="/contact" className={btnLight}>
            Contact me <ArrowUpRight size={16} />
          </Link>
        </div>

        <p className="mt-10 flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
          <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
          <span>{FULL_ADDRESS}</span>
        </p>
      </div>

      <div className="d-hero-slide relative mx-auto w-full max-w-md lg:max-w-none">
        <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-[28px] border-2 border-primary/40" />
        <img
          src={portrait}
          alt="Anmay Saha - Civil Engineer & Building Planner"
          fetchPriority="high"
          className="relative aspect-4/5 w-full rounded-[28px] object-cover object-top shadow-soft"
        />
        <Link
          to="/green-constructions"
          className="absolute -bottom-6 left-6 right-6 flex items-center gap-4 rounded-2xl bg-forest-deep/95 px-5 py-4 text-cream shadow-lift backdrop-blur transition hover:-translate-y-0.5"
        >
          <Leaf size={26} className="shrink-0 text-cream/80" />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block text-[13px] font-bold tracking-[0.14em]">ANMAY SAHA</span>
            <span className="mt-0.5 block text-[12px] text-cream/75">Founder &amp; Proprietor</span>
            <span className="block text-[12.5px] font-semibold">Green Constructions</span>
          </span>
          <ArrowRight size={18} className="shrink-0 text-cream/80" />
        </Link>
      </div>
    </section>
  );
}

function Credentials() {
  return (
    <section aria-label="Credentials" className={`${wrap} pb-20`}>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {credCards.map(({ t, s, Icon }) => (
          <div key={t + s} className="flex items-center gap-4 rounded-2xl border border-forest-deep/10 bg-white/80 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon size={22} strokeWidth={1.6} />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block text-[15px] font-bold text-forest-deep">{t}</span>
              <span className="mt-1 block text-[12px] text-ink/70">{s}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className={`${wrap} pb-24`}>
      <div className="grid items-center gap-12 rounded-[32px] border border-forest-deep/10 bg-white/85 p-12 shadow-soft backdrop-blur lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-0.75 w-8 bg-gold" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-primary">About me</p>
          </div>
          <h2 className="mt-4 font-serif text-[2.35rem] font-semibold leading-[1.16] tracking-[-0.02em] text-ink">
            Anmay Saha, an Engineer &amp; an Artist with Wide Experience in the Field
          </h2>
          <p className="mt-6 text-[16px] leading-8 text-[#1e1b4b]">
            Anmay Saha is a B.Tech Civil Engineer and M.Tech Engineer in Materials Science, an AMC approved Building Planner, and Associate Member of the Institution of Engineers (India).
          </p>
          <p className="mt-4 text-[16px] leading-8 text-[#1e1b4b]">
            He is doing all his businesses under the name of anmayarts.com. He is the proprietor of “Green Constructions”, a professionally managed firm offering comprehensive building planning, construction, and interior design services, with a strong commitment to quality, structural integrity, and sustainable design practices.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects" className={btnDark}>
              Explore my work <ArrowRight size={16} />
            </Link>
            <Link to="/achievement" className={btnLight}>
              Achievement
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-primary/15 bg-cream/80 p-10 text-center shadow-sm">
          <blockquote className="font-serif text-[1.1rem] italic leading-7 text-ink">
            “Life is not about earning money, but about creating something for humanity that helps, entertains, and elevates the way we live.”
          </blockquote>
          <span className="mx-auto mt-5 block h-0.75 w-10 bg-gold" />
          <div className="mt-5">
            <AnmaySignature />
          </div>
          <div className="mt-4 space-y-2 text-[12px] font-semibold tracking-[0.2em] text-muted-foreground">
            <p>CIVIL ENGINEER</p>
            <p>BUILDING PLANNER</p>
            <p>CONSTRUCTION PROFESSIONAL</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="relative z-10 bg-card/90 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <DHead label="Professional journey" title={<>A Practice Built on Purpose.</>} />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {journey.map((j, i) => (
            <li key={j.role + j.organization} className="relative rounded-2xl border border-forest-deep/10 bg-white p-7 shadow-sm">
              <span className="font-serif text-4xl font-semibold text-primary/25">0{i + 1}</span>
              <p className="mt-3 text-[17px] font-semibold text-ink">{j.role}</p>
              <p className="mt-1 text-[13px] font-semibold text-primary">{j.organization}</p>
              <p className="mt-3 text-[14.5px] leading-7 text-muted-foreground">{j.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className={`${wrap} scroll-mt-24 py-24`}>
      <DHead label="My services" title="What I Do" />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {serviceCardsData.map(({ t, desc, items, etc, Icon, img }, i) => (
          <Link
            key={t}
            to="/"
            hash="contact"
            className="group relative flex min-h-60 overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative z-10 flex w-[58%] flex-col pr-2">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                  <Icon size={15} strokeWidth={1.75} />
                </span>
                <span className="text-[11px] font-medium tracking-widest text-stone-400">0{i + 1}</span>
                <span className="h-px w-4 bg-stone-300" />
              </div>
              <h3 className="font-serif text-[18px] font-semibold leading-tight text-stone-900 group-hover:text-primary">{t}</h3>
              {items ? (
                <ol className="mt-3 space-y-1 text-[13px] leading-snug text-stone-600">
                  {items.map((it, j) => (
                    <li key={it}>
                      <span className="font-semibold text-primary">{String.fromCharCode(97 + j)}.</span> {it}
                    </li>
                  ))}
                  {etc && <li className="italic text-stone-400">etc.</li>}
                </ol>
              ) : (
                <p className="mt-3 text-[13.5px] leading-relaxed text-stone-500">{desc}</p>
              )}
            </div>
            <div className="absolute inset-y-0 right-0 w-[42%] overflow-hidden rounded-[52%_0_0_52%/50%_0_0_50%] bg-stone-100">
              <img src={img} alt={t} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className={`${wrap} pb-24`}>
      <div className="relative overflow-hidden rounded-[32px] bg-forest-deep px-12 py-14 text-cream">
        <Leaf aria-hidden size={180} strokeWidth={0.6} className="absolute -bottom-6 right-6 text-cream/10" />
        <div className="relative flex flex-wrap items-center justify-between gap-8">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-cream/75">Let's work together</p>
            <h2 className="mt-3 font-serif text-[2.4rem] font-semibold leading-tight">Have a Project in Mind?</h2>
            <p className="mt-2 text-[15px] text-cream/75">Let's create something thoughtful together.</p>
          </div>
          <a href="#contact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-cream px-7 text-[13px] font-bold tracking-[0.08em] text-forest-deep transition hover:-translate-y-0.5">
            GET FREE CONSULTATION <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Business() {
  return (
    <section className={`${wrap} pb-24`}>
      <DHead label="Ventures" title="My Business" />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {businessCards.map(({ t, d, Icon, logo }) => (
          <div key={t} className="rounded-2xl border border-forest-deep/10 bg-card/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-forest-deep text-cream ring-4 ring-forest-deep/10">
              {logo ? <img src={logo} alt="" className="h-8 w-8 object-contain" /> : <Icon size={24} strokeWidth={1.6} />}
            </span>
            <p className="mt-5 text-[13px] font-bold uppercase tracking-[0.12em] text-ink">{t}</p>
            <p className="mt-2 text-[14px] leading-7 text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const featured = useFeatured().slice(0, 4);
  if (featured.length === 0) return null;
  return (
    <section className={`${wrap} pb-24`}>
      <DHead
        label="Selected work"
        title="Some of my recent work."
        right={
          <Link to="/projects" className="inline-flex items-center gap-2 text-[13px] font-bold text-forest-deep hover:text-primary">
            View all projects <ArrowRight size={16} />
          </Link>
        }
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {featured.map((p) => (
          <a key={p.key} href={`/projects/${p.key}`} className="group overflow-hidden rounded-2xl border border-forest-deep/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="aspect-4/3 overflow-hidden bg-stone-100">
              <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">{p.category}</p>
              <h3 className="mt-1 font-serif text-[18px] font-semibold text-ink">{p.title}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
                <MapPin size={13} /> {p.location}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="relative z-10 bg-card/90 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <DHead label="How I work" title="From concept to completion." />
        <ol className="mt-12 grid gap-5 md:grid-cols-5">
          {processSteps.map((s, i) => (
            <li key={s.t} className="rounded-2xl border border-forest-deep/10 bg-white p-6 shadow-sm">
              <span className="font-serif text-3xl font-semibold text-primary/30">0{i + 1}</span>
              <h3 className="mt-2 font-serif text-[19px] font-semibold text-ink">{s.t}</h3>
              <p className="mt-2 text-[13.5px] leading-6 text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Green() {
  return (
    <section className="relative isolate mt-24 min-h-130 overflow-hidden">
      <img src={siteAsset} alt="Engineer reviewing plans on a construction site" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-forest-deep via-forest-deep/80 to-forest-deep/20" />
      <div className="mx-auto flex min-h-130 max-w-7xl flex-col justify-center px-6 py-16 text-cream lg:px-8">
        <p className="text-[12px] font-bold tracking-[0.24em] text-cream/80">GREEN CONSTRUCTIONS</p>
        <h2 className="mt-4 max-w-xl font-serif text-[3rem] leading-[1.1]">
          Built with intention.
          <br />
          Led with care.
        </h2>
        <p className="mt-6 text-[14px] text-cream/75">Founder &amp; Proprietor</p>
        <p className="font-script text-4xl">Anmay Saha</p>
        <div className="mt-8">
          <Link to="/green-constructions" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-cream px-7 text-[13px] font-bold tracking-[0.08em] text-forest-deep transition hover:-translate-y-0.5">
            EXPLORE GREEN CONSTRUCTIONS <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */

function Home() {
  return (
    <SiteLayout>
      <MobileHome />
      <div className="font-montserrat relative isolate hidden overflow-x-clip bg-cream md:block">
        <FontStyle />
        <DesktopStyle />
        <div aria-hidden className="d-checker" />

        <DesktopHeader />
        <Hero />
        <Credentials />
        <About />
        <Journey />
        <Services />
        <CtaBanner />
        <Business />
        <Projects />
        <Process />
        <div className="relative z-10">
          <ArtSection />
        </div>
        <Green />
        <div id="contact" className="relative z-10 scroll-mt-24">
          <ContactSection />
        </div>
      </div>
    </SiteLayout>
  );
}