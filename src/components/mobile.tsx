// cspell:ignore CRETOVERSE Anmay Saha Chowmohoni Agartala noscroll
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight, ArrowUpRight, Award, Building2, ChevronLeft, ChevronRight, ClipboardCheck, FileCheck2,
  GraduationCap, HardHat, Home as HomeIcon, Lamp, LayoutGrid, Leaf, MapPin, Menu, MessageSquare,
  Ruler, Search, User, Users, Wrench, X, FileText, ExternalLink, DraftingCompass, Paintbrush, Layers3
} from "lucide-react";
import { Brand } from "@/components/site/Brand";
import { contact, credentials, images, journey, services } from "@/lib/portfolio";
import { useArtworks, useProjects } from "@/lib/remote-content";
import siteAsset from "@/assets/green-constructions-site.png";
import portrait from "@/assets/portrait.png";
import card1 from "@/assets/card1.png";
import card2 from "@/assets/card2.png";
import card3 from "@/assets/card3.png";
import card4 from "@/assets/card4.png";
import card5 from "@/assets/card5.png";
import card6 from "@/assets/card6.png";

const CRETOVERSE = "https://cretoverse.com";
const menuLinks = [
  { label: "Home", to: "/" }, { label: "About", to: "/about" }, { label: "Experience", to: "/", hash: "m-experience" },
  { label: "Services", to: "/", hash: "m-services" }, { label: "Projects", to: "/projects" }, { label: "Education", to: "/", hash: "m-education" },
  { label: "Artworks", to: "/artworks" }, { label: "Contact", to: "/contact" },
] as const;

/* ---------------- Shell: header, menu, bottom nav, footer ---------------- */

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-forest-deep/10 bg-cream/95 backdrop-blur md:hidden">
        <div className="grid h-17 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5">
          <Link to="/" aria-label="Anmay Art home" className="min-w-0"><Brand compact /></Link>
          <div className="flex items-center">
            <Link to="/projects" aria-label="Browse projects" className="grid h-11 w-11 place-items-center rounded-full text-forest-deep focus-visible:outline-2 focus-visible:outline-primary"><Search size={22} strokeWidth={1.8} /></Link>
            <button type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full text-forest-deep focus-visible:outline-2 focus-visible:outline-primary"><Menu size={24} strokeWidth={1.8} /></button>
          </div>
        </div>
      </header>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="m-menu fixed inset-0 z-70 flex flex-col overflow-y-auto bg-cream px-5 pb-10 md:hidden">
          <div className="flex h-17 shrink-0 items-center justify-between">
            <Brand compact />
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-forest-deep/15 text-forest-deep"><X size={22} /></button>
          </div>
          <nav aria-label="Mobile menu" className="mt-6 grid">
            {menuLinks.map((l, i) => (
              <Link key={l.label} to={l.to} {...("hash" in l ? { hash: l.hash } : {})} onClick={() => setOpen(false)}
                className="m-rise flex items-baseline gap-4 border-b border-forest-deep/10 py-3.5 font-serif text-[2rem] leading-tight text-ink"
                style={{ animationDelay: `${120 + i * 40}ms` }}>
                <span className="font-sans text-xs font-semibold text-primary">0{i + 1}</span>{l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 grid gap-3">
            <Link to="/green-constructions" onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-between rounded-2xl bg-forest-deep px-5 py-4 text-sm font-bold tracking-[0.14em] text-cream">GREEN CONSTRUCTIONS <ArrowRight size={18} /></Link>
            <a href={CRETOVERSE} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-between rounded-2xl border border-forest-deep/20 px-5 py-4 text-sm font-bold tracking-[0.14em] text-forest-deep">CRETOVERSE <ExternalLink size={18} /></a>
          </div>
        </div>
      )}
    </>
  );
}

export function MobileBottomNav() {
  const items = [
    { label: "Home", to: "/", Icon: HomeIcon, exact: true },
    { label: "Projects", to: "/projects", Icon: LayoutGrid },
    { label: "Services", to: "/", hash: "m-services", Icon: FileText, exact: true, noActive: true },
    { label: "About", to: "/about", Icon: User },
    { label: "Contact", to: "/contact", Icon: MessageSquare },
  ] as const;
  return (
    <nav aria-label="Primary" className="m-safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-forest-deep/10 bg-card/95 backdrop-blur md:hidden">
      <ul className="grid h-18 grid-cols-5">
        {items.map((it) => (
          <li key={it.label}>
            <Link to={it.to} {...("hash" in it ? { hash: it.hash } : {})}
              activeOptions={{ exact: "exact" in it, includeHash: "hash" in it }}
              className="group flex h-full flex-col items-center justify-center gap-1 text-[12px] font-medium text-ink/70 transition-colors data-[status=active]:text-primary"
              activeProps={"noActive" in it ? {} : { "data-status": "active" } as never}>
              <it.Icon size={22} strokeWidth={1.7} />
              <span>{it.label}</span>
              <span className="h-0.5 w-9 rounded-full bg-transparent transition-colors group-data-[status=active]:bg-primary" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MobileFooter() {
  return (
    <footer className="bg-ink px-5 pt-12 pb-10 text-cream md:hidden">
      <Brand tone="light" />
      <p className="mt-5 max-w-xs text-sm leading-7 text-cream/60">Designing, planning and building spaces that balance purpose and expression.</p>
      <nav aria-label="Footer" className="mt-8 grid grid-cols-2 gap-x-4">
        {menuLinks.map((l) => (
          <Link key={l.label} to={l.to} {...("hash" in l ? { hash: l.hash } : {})} className="flex min-h-11 items-center text-sm text-cream/75">{l.label}</Link>
        ))}
      </nav>
      <div className="mt-6 grid gap-2 border-t border-cream/10 pt-6">
        <Link to="/green-constructions" className="flex min-h-11 items-center justify-between text-sm font-bold tracking-[0.14em]">GREEN CONSTRUCTIONS <ArrowUpRight size={16} /></Link>
        <a href={CRETOVERSE} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-between text-sm font-bold tracking-[0.14em]">CRETOVERSE <ExternalLink size={16} /></a>
      </div>
      <p className="mt-6 flex items-center gap-2 text-xs text-cream/50"><MapPin size={14} /> {contact.location}</p>
      <p className="mt-2 text-xs text-cream/40">© {new Date().getFullYear()} Anmay Art. All rights reserved.</p>
    </footer>
  );
}

/* ---------------- Shared bits ---------------- */

function Label({ children, light }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[12px] font-semibold tracking-[0.18em] uppercase ${light ? "text-cream/75" : "text-primary"}`}>{children}</p>;
}
function Heading({ children, light, className = "" }: { children: ReactNode; light?: boolean; className?: string }) {
  return <h2 className={`mt-2 font-serif text-[1.95rem] leading-[1.15] font-medium ${light ? "text-cream" : "text-ink"} ${className}`}>{children}</h2>;
}
function SectionHead({ label, title, link }: { label: string; title: ReactNode; link?: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
      <div className="min-w-0"><Label>{label}</Label><Heading className="text-[1.75rem]">{title}</Heading></div>
      {link}
    </div>
  );
}
const pill = "inline-flex min-h-11 items-center gap-2 rounded-full bg-forest-deep px-6 text-[13px] font-bold tracking-[0.08em] text-cream transition active:scale-[0.98]";

export function MobileLightbox({ items, index, onClose, onIndex }: { items: { src: string; alt: string }[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const startX = useRef<number | null>(null);
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, onIndex]);
  if (index === null || !items[index]) return null;
  const go = (d: number) => onIndex((index + d + items.length) % items.length);
  return (
    <div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-80 flex flex-col bg-ink text-cream"
      onTouchStart={(e) => (startX.current = e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => { if (startX.current === null) return; const dx = (e.changedTouches[0]?.clientX ?? startX.current) - startX.current; if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1); startX.current = null; }}>
      <div className="flex h-16 items-center justify-between px-4">
        <span className="text-sm text-cream/70">{index + 1} / {items.length}</span>
        <button type="button" aria-label="Close image viewer" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full bg-cream/10"><X size={22} /></button>
      </div>
      <div className="flex flex-1 items-center justify-center px-3"><img src={items[index].src} alt={items[index].alt} className="max-h-full max-w-full object-contain" /></div>
      {items.length > 1 && (
        <div className="m-safe-bottom flex items-center justify-center gap-6 py-5">
          <button type="button" aria-label="Previous image" onClick={() => go(-1)} className="grid h-12 w-12 place-items-center rounded-full bg-cream/10"><ChevronLeft /></button>
          <button type="button" aria-label="Next image" onClick={() => go(1)} className="grid h-12 w-12 place-items-center rounded-full bg-cream/10"><ChevronRight /></button>
        </div>
      )}
    </div>
  );
}

/* ---------------- Home ---------------- */

const credCards = [
  { t: "B.Tech", s: "Civil Engineering", Icon: GraduationCap },
  { t: "M.Tech", s: "Materials Science", Icon: GraduationCap },
  { t: "AMC Approved", s: "Building Planner", Icon: Building2 },
  { t: "Associate Member", s: "Institution of Engineers (India)", Icon: Users },
];
const serviceCardsData = [
  { t: "Building Planning & Design", desc: "Thoughtful plans that balance space, purpose and possibility.", Icon: DraftingCompass, img: card1 },
  { t: "House Planning", desc: "Homes shaped around the way people actually live.", Icon: HomeIcon, img: card2 },
  { t: "Construction Management", desc: "An attentive approach to execution, coordination and quality.", Icon: HardHat, img: card3 },
  { t: "Interior Design", desc: "Functional and aesthetic interiors that feel like home.", Icon: Paintbrush, img: card4 },
  { t: "Structural Consultation", desc: "Safe, efficient and practical structural solutions.", Icon: Ruler, img: card5 },
  { t: "Renovation & Remodeling", desc: "Transforming existing spaces into better experiences.", Icon: Layers3, img: card6 },
];
const useFeatured = () => { const projects = useProjects(); return [
  { key: "the-elite", title: "THE ELITE", category: "Hotel & Restaurant", location: "Orient Chowmohoni, Agartala", image: null as string | null, gc: true },
  ...projects.map((p) => ({ key: p.slug, title: p.title, category: p.category, location: "remoteId" in p && p.remoteId ? p.location : "Concept project", image: p.image as string | null, gc: false })),
]; };

function useAutoCarousel(ref: React.RefObject<HTMLDivElement | null>, count: number, delay: number) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || count < 2) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    let paused = false;
    let current = 0;
    const center = (child: Element) => {
      const box = child.getBoundingClientRect();
      const parent = el.getBoundingClientRect();
      return box.left + box.width / 2 - parent.left - parent.width / 2;
    };
    const onScroll = () => {
      const children = Array.from(el.children);
      let nearest = 0;
      children.forEach((child, i) => {
        const previous = children[nearest];
        if (previous && Math.abs(center(child)) < Math.abs(center(previous))) nearest = i;
      });
      current = nearest;
      setIndex(nearest);
    };
    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { paused = false; }, 6500);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; }, { threshold: 0.35 });
    observer.observe(el);
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerdown", pause);
    el.addEventListener("focusin", pause);
    const timer = setInterval(() => {
      if (!visible || paused || motion.matches || document.visibilityState !== "visible") return;
      const next = (current + 1) % count;
      const child = el.children[next];
      const first = el.children[0];
      if (!(child instanceof HTMLElement) || !(first instanceof HTMLElement)) return;
      const centered = getComputedStyle(child).scrollSnapAlign.includes("center");
      const left = child.offsetLeft - first.offsetLeft - (centered ? (el.clientWidth - child.clientWidth) / 2 : 0);
      el.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
      current = next;
      setIndex(next);
    }, delay);
    return () => {
      observer.disconnect(); clearInterval(timer); clearTimeout(resumeTimer);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("focusin", pause);
    };
  }, [ref, count, delay]);
  return index;
}

function Dots({ count, active }: { count: number; active: number }) {
  return <div className="mt-4 flex justify-center gap-1.5" aria-hidden>{Array.from({ length: count }).map((_, i) => <span key={i} className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-forest-deep" : "w-3.5 bg-ink/15"}`} />)}</div>;
}

export function MobileHome() {
  const credRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const projRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const credI = useAutoCarousel(credRef, credCards.length, 3800);
  const serviceI = useAutoCarousel(serviceRef, serviceCardsData.length, 3200);
  const artworks = useArtworks();
  const featured = useFeatured();
  const projI = useAutoCarousel(projRef, featured.length, 3800);
  const artI = useAutoCarousel(artRef, artworks.length, 3400);

  const [inView, setInView] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setInView(true);
      }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-x-hidden bg-cream md:hidden">
      {/* HERO */}
      <section className="relative px-5 pt-6 pb-2">
        <div className="m-rise">
          <p className="text-[11px] leading-normal font-semibold tracking-[0.14em] text-primary uppercase">Designing spaces.<br />Building dreams.</p>
          <h1 className="mt-3 font-serif text-[clamp(2.2rem,11vw,3rem)] leading-[1.08] font-semibold text-ink">
            I Design.<br />I Plan.<br />I Build<br />with <span className="text-primary">Purpose.</span>
          </h1>
          <p className="mt-4 max-w-[36ch] text-[14.5px] leading-[1.65] text-muted-foreground">I'm Anmay Saha, a Civil Engineer, Building Planner & Construction Professional creating thoughtful, functional and aesthetic spaces.</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link to="/projects" className={`${pill} px-6`}>EXPLORE MY WORK <ArrowRight size={15} /></Link>
            <Link to="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-forest-deep/25 px-6 text-[13px] font-bold tracking-[0.08em] text-forest-deep transition active:scale-[0.98]">CONTACT ME</Link>
          </div>
        </div>
        <div className="m-rise relative mt-7" style={{ animationDelay: "140ms" }}>
          <img src={images.hero} alt="Contemporary residential architecture with landscaping" fetchPriority="high" className="aspect-4/5 w-full rounded-[22px] object-cover object-[60%_center]" />
          <Link to="/green-constructions" className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl bg-forest-deep/95 px-4 py-3 text-cream shadow-soft backdrop-blur">
            <Leaf size={24} className="shrink-0 text-cream/80" />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[12.5px] font-bold tracking-[0.12em]">ANMAY SAHA</span>
              <span className="mt-0.5 block text-[11px] text-cream/75">Founder & Proprietor</span>
              <span className="block text-[11.5px] font-semibold">Green Constructions</span>
            </span>
            <ArrowRight size={18} className="shrink-0 text-cream/80" />
          </Link>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section aria-label="Credentials" className="pt-6">
        <div ref={credRef} aria-label="Credentials, swipe to explore" className="m-noscroll flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1">
          {credCards.map(({ t, s, Icon }) => (
            <div key={t} className="m-credential-circle flex h-33 w-33 shrink-0 snap-start flex-col items-center justify-center px-3 text-center">
              <Icon size={25} strokeWidth={1.5} className="text-forest-deep" />
              <p className="mt-2 text-[14px] font-bold leading-tight text-forest-deep">{t}</p>
              <p className="mt-1 text-[10px] leading-snug text-ink/75">{s}</p>
            </div>
          ))}
        </div>
        <Dots count={credCards.length} active={credI} />
      </section>

      {/* ABOUT */}
      <section className="px-5 pt-7">
        <div ref={aboutRef} className="relative aspect-[0.54] min-h-160 overflow-hidden rounded-[30px] border-2 border-[#4f6f48] bg-[#fcfcf8] p-6 shadow-[0_12px_40px_rgba(44,53,43,0.12)]">
          <div className="absolute top-16 right-[35%] grid grid-cols-5 gap-2 opacity-25">
            {Array.from({ length: 15 }).map((_, i) => <span key={i} className="h-1 w-1 rounded-full bg-forest-deep" />)}
          </div>
          <div className="absolute top-8 right-5 text-forest-deep">
            <Leaf size={56} strokeWidth={1.35} />
          </div>
          <span className="absolute top-16 right-3 h-24 w-px bg-gold" />

          <div className="relative z-10 flex items-center gap-3">
            <span className="h-0.75 w-8 bg-gold" />
            <p className="text-[11px] font-semibold tracking-[0.24em] text-forest-deep">ABOUT ME</p>
          </div>

          <h2 className="relative z-10 mt-6 max-w-[62%] font-serif text-[clamp(2.1rem,8.2vw,3.3rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-ink text-center">
            Crafting<br />
            <span className="font-medium italic text-forest">Spaces</span><br />
            with Passion<br />
            <span className="inline-flex items-center justify-center gap-1.5 w-full">
              <span>&amp;</span> Precision.
            </span>
          </h2>

          <div className="relative z-10 mt-5 max-w-[55%]">
            <span className="mb-3 block h-0.75 w-10 bg-gold" />
            <p className="text-[clamp(0.65rem,2.45vw,0.85rem)] leading-[1.48] text-muted-foreground">
              B.Tech Civil Engineer &amp; M.Tech Materials Science, AMC-approved Building Planner and Associate Member of the Institution of Engineers (India). Proprietor of Green Constructions — planning, construction and interiors built on quality, structural integrity and sustainable design.
            </p>
            <p className="mt-4 font-script text-[clamp(1.8rem,7vw,3rem)] leading-none text-forest-deep">Anmay Saha</p>
            <span className="mt-3 block h-0.75 w-10 bg-gold" />
            <div className="mt-2.5 space-y-1 text-[clamp(0.5rem,1.8vw,0.68rem)] font-semibold tracking-[0.18em] text-muted-foreground">
              <p>CIVIL ENGINEER</p>
              <p>BUILDING PLANNER</p>
              <p>CONSTRUCTION PROFESSIONAL</p>
            </div>
          </div>

          <Link to="/about" className="absolute bottom-5 left-6 right-[24%] z-20 inline-flex min-h-10 items-center justify-between rounded-full bg-forest-deep px-4 text-[clamp(0.58rem,2.2vw,0.8rem)] font-bold tracking-[0.06em] text-cream shadow-md transition active:scale-[0.98]">
            <span>Know More</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-cream">
              <ArrowRight size={17} strokeWidth={2.5} />
            </span>
          </Link>

          <div className={`absolute top-[17%] right-[-10%] bottom-[-2%] z-0 w-[52%] overflow-hidden border-l-4 border-t-4 border-[#4f6f48] bg-forest-deep/10 rounded-[48%_0_0_42%/18%_0_0_64%] shadow-[-12px_0_28px_rgba(44,53,43,0.12)] transition-transform duration-1000 ease-out ${inView ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
            <img src={portrait} alt="Anmay Saha" loading="lazy" className="h-full w-full object-cover object-top" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="m-services" className="scroll-mt-20 px-5 pt-10">
        <SectionHead label="My services" title="What I Do" link={<Link to="/" hash="services" className="flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-forest-deep">View All <ArrowRight size={16} /></Link>} />
        <div ref={serviceRef} aria-label="Services, swipe to explore" className="m-noscroll -mx-5 mt-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 py-1">
          {serviceCardsData.map(({ t, desc, Icon, img }, i) => (
            <Link key={t} to="/" hash="contact" className="group relative flex h-45 w-[min(74vw,260px)] shrink-0 snap-center overflow-hidden rounded-4xl border border-stone-200/70 bg-white p-3.5 shadow-sm">
              <div className="relative z-10 flex w-[58%] flex-col justify-between pr-1">
                <div>
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <Icon size={12} strokeWidth={1.75} />
                    </div>
                    <span className="text-[10px] font-medium tracking-widest text-stone-400">0{i + 1}</span>
                    <span className="h-px w-3 bg-stone-300" />
                  </div>
                  <h3 className="font-serif text-[12px] leading-tight text-stone-900 group-hover:text-primary">{t}</h3>
                  <p className="mt-1 line-clamp-2 text-[9.5px] leading-relaxed text-stone-500">{desc}</p>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 w-[46%] overflow-hidden rounded-l-[50%] bg-stone-100 rounded-[52%_0_0_52%/50%_0_0_50%]">
                <img src={img} alt={t} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-black/10 via-transparent to-transparent" />
              </div>
            </Link>
          ))}
        </div>
        <Dots count={serviceCardsData.length} active={serviceI} />
      </section>

      {/* FEATURED PROJECTS */}
      <section className="pt-10">
        <div className="px-5"><SectionHead label="Featured projects" title="Some of My Recent Work" link={<Link to="/projects" className="flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-forest-deep">View All <ArrowRight size={16} /></Link>} /></div>
        <div ref={projRef} aria-label="Featured projects, swipe to explore" className="m-noscroll mt-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5">
          {featured.map((p) => {
            const inner = (
              <>
                {p.image ? <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" /> :
                  <div className="absolute inset-0 bg-forest-deep m-leaf"><Building2 size={64} strokeWidth={1} className="absolute top-6 right-6 text-cream/25" /><p className="absolute top-14 left-5 max-w-[70%] text-[12px] text-cream/60">Project photography coming soon</p></div>}
                <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">{p.category}</span>
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-cream">
                  <div className="min-w-0"><p className="font-serif text-2xl leading-tight">{p.title}</p><p className="mt-1 flex items-center gap-1 text-[12.5px] text-cream/80"><MapPin size={13} className="shrink-0" /><span className="truncate">{p.location}</span></p></div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream text-forest-deep"><ArrowUpRight size={19} /></span>
                </div>
              </>
            );
            const cls = "relative block aspect-[16/11] w-full shrink-0 snap-center overflow-hidden rounded-4xl";
            return p.gc ? <Link key={p.key} to="/green-constructions" className={cls}>{inner}</Link> :
              <Link key={p.key} to="/projects/$slug" params={{ slug: p.key }} className={cls}>{inner}</Link>;
          })}
        </div>
        <Dots count={featured.length} active={projI} />
      </section>

      {/* CTA */}
      <section className="px-5 pt-10">
        <div className="m-leaf relative overflow-hidden rounded-4xl bg-forest-deep p-6 text-cream">
          <Leaf aria-hidden size={110} strokeWidth={0.7} className="absolute -right-4 -bottom-4 text-cream/10" />
          <Label light>Let's work together</Label>
          <Heading light className="text-[1.75rem]">Have a Project in Mind?</Heading>
          <p className="mt-2 text-[14px] text-cream/75">Let's create something thoughtful together.</p>
          <a href="#m-contact" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-cream px-5 text-[12.5px] font-bold tracking-[0.08em] text-forest-deep">GET FREE CONSULTATION <ArrowRight size={15} /></a>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="m-experience" className="mt-12 scroll-mt-20 bg-card px-5 py-12">
        <Label>Professional journey</Label>
        <Heading>A Practice<br />Built on Purpose.</Heading>
        <ol className="relative mt-8 ml-2 border-l-2 border-primary/40">
          {journey.map((j) => (
            <li key={j.role + j.organization} className="relative pb-7 pl-6 last:pb-0">
              <span className="absolute top-1 -left-2.25 h-4 w-4 rounded-full border-4 border-card bg-primary" />
              <p className="text-[15px] font-semibold text-ink">{j.role}</p>
              <p className="text-[13px] font-semibold text-primary">{j.organization}</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{j.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* PROCESS */}
      <section className="px-5 py-12">
        <Label>The approach</Label>
        <Heading>From Concept<br />to Completion.</Heading>
        <div className="mt-7 grid gap-3">
          {[["Discover", "Understanding needs, site and aspirations."], ["Plan", "Shaping layouts and technical direction."], ["Design", "Refining form, material and detail."], ["Build", "Executing with care and coordination."], ["Deliver", "Handing over a considered, finished space."]].map(([t, d], i) => (
            <div key={t} className="flex items-center gap-4 rounded-2xl border border-forest-deep/12 bg-card p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest-deep text-sm font-bold text-cream">0{i + 1}</span>
              <div className="min-w-0"><p className="text-[13px] font-bold tracking-[0.14em] text-ink uppercase">{t}</p><p className="text-[13.5px] text-muted-foreground">{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="m-education" className="scroll-mt-20 bg-card px-5 py-12">
        <Label>Education &amp; credentials</Label>
        <Heading>The Foundation<br />Behind Every Space.</Heading>
        <ul className="mt-7 grid gap-3">
          {credentials.map((c) => (
            <li key={c} className="flex items-center gap-3.5 rounded-2xl bg-stone p-4 text-[14.5px] text-ink">
              <Award size={22} strokeWidth={1.6} className="shrink-0 text-primary" />{c}
            </li>
          ))}
        </ul>
      </section>

      {/* ARTWORKS */}
      <section className="py-12">
        <div className="px-5"><Label>Beyond engineering</Label><Heading>Where Engineering Meets Creative Expression.</Heading></div>
        <div ref={artRef} aria-label="Artworks, swipe to explore" className="m-noscroll mt-6 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5">
          {artworks.map((a) => (
            <Link key={a.slug} to="/artworks/$slug" params={{ slug: a.slug }} className="w-[62%] shrink-0 snap-start">
              <img src={a.image} alt={a.title} loading="lazy" className="aspect-4/5 w-full rounded-[18px] object-cover" />
              <p className="mt-2.5 font-serif text-lg text-ink">{a.title}</p>
            </Link>
          ))}
        </div>
        <Dots count={artworks.length} active={artI} />
        <div className="px-5"><Link to="/artworks" className={`${pill} mt-6`}>EXPLORE MY ARTWORKS <ArrowRight size={15} /></Link></div>
      </section>

      {/* GREEN CONSTRUCTIONS */}
      <section className="relative isolate min-h-130 overflow-hidden">
        <img src={siteAsset} alt="Engineer reviewing plans on a construction site" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover object-[30%_center]" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-forest-deep via-forest-deep/75 to-forest-deep/30" />
        <div className="flex min-h-130 flex-col justify-end px-5 pt-16 pb-10 text-cream">
          <p className="text-[12px] font-bold tracking-[0.24em] text-cream/80">GREEN CONSTRUCTIONS</p>
          <h2 className="mt-3 font-serif text-[2.2rem] leading-[1.1]">Built with intention.<br />Led with care.</h2>
          <p className="mt-4 text-[13px] text-cream/75">Founder &amp; Proprietor</p>
          <p className="font-script text-3xl">Anmay Saha</p>
          <Link to="/green-constructions" className="mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-cream px-6 text-[12.5px] font-bold tracking-[0.08em] text-forest-deep">EXPLORE GREEN CONSTRUCTIONS <ArrowRight size={15} /></Link>
        </div>
      </section>

      <MobileContact />
    </div>
  );
}

function MobileContact() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  const field = "h-12 w-full rounded-xl border border-forest-deep/15 bg-card px-4 text-[15px] text-ink placeholder:text-muted-foreground focus:border-primary focus:outline-none";
  return (
    <section id="m-contact" className="scroll-mt-20 px-5 py-12">
      <Label>Let's work together</Label>
      <Heading>Have a Project<br />in Mind?</Heading>
      <p className="mt-3 flex items-center gap-2 text-[14px] text-muted-foreground"><MapPin size={16} className="text-primary" /> {contact.location}</p>
      {sent ? (
        <div role="status" className="mt-6 rounded-2xl border border-forest-deep/12 bg-card p-6">
          <p className="font-serif text-xl text-ink">Thank you — your details are noted.</p>
          <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">Online enquiries aren't connected yet, so this message has not been sent. Direct contact details will be published here soon.</p>
          <button type="button" onClick={() => setSent(false)} className="mt-4 min-h-11 text-[13px] font-bold text-forest-deep">Edit enquiry</button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 grid gap-3">
          <label className="sr-only" htmlFor="m-name">Full Name</label><input id="m-name" required placeholder="Full Name" className={field} />
          <label className="sr-only" htmlFor="m-phone">Phone Number</label><input id="m-phone" type="tel" placeholder="Phone Number" className={field} />
          <label className="sr-only" htmlFor="m-email">Email Address</label><input id="m-email" type="email" placeholder="Email Address" className={field} />
          <label className="sr-only" htmlFor="m-service">Select Service</label>
          <select id="m-service" defaultValue="" className={field}><option value="" disabled>Select Service</option>{services.map((s) => <option key={s.title}>{s.title}</option>)}</select>
          <label className="sr-only" htmlFor="m-msg">Message</label><textarea id="m-msg" rows={4} placeholder="Message" className={`${field} h-auto py-3`} />
          <button type="submit" className={`${pill} mt-1 justify-center`}>SEND MESSAGE <ArrowRight size={15} /></button>
          <p className="text-[12px] text-muted-foreground">Online enquiries are not yet connected — nothing is sent from this form.</p>
        </form>
      )}
    </section>
  );
}