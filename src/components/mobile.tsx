// cspell:ignore CRETOVERSE Anmay Saha Chowmohoni Agartala noscroll Unnati
import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight, ArrowUpRight, Award, Building2, ChevronLeft, ChevronRight, ClipboardCheck, FileCheck2,
  GraduationCap, HardHat, Home as HomeIcon, Lamp, LayoutGrid, Leaf, MapPin, Menu, MessageSquare,
  Ruler, Search, User, Users, Wrench, X, FileText, ExternalLink, DraftingCompass, Paintbrush, Layers3, Box,
  Palette, Phone, Mail, Building, Sparkles
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

export const CRETOVERSE = "https://cretoverse.com";
const UNNATI_FACEBOOK = "https://www.facebook.com/unnati.organization/";
export const WEB_INNOVEX = "https://webinnovex360.online";
const LOGO_VIDEO = "/animatedlogo.mp4"; // file lives in the /public folder
const SIGN_IMAGE_URL = "/assets/sign.png";
const FACEBOOK_SHARE = "https://www.facebook.com/share/1CWdHVbWVJ"; // direct link to the Facebook share page for the website

// Social Links
export const INSTAGRAM_LINK = "https://www.instagram.com/anmayart.com";
export const FACEBOOK_LINK = "https://www.facebook.com/anmay.saha";
export const YOUTUBE_LINK = "https://www.youtube.com/@anmayart";
export const LINKEDIN_LINK = "https://www.linkedin.com/authwall?trk=bf&trkInfo=AQEhtsghxJqH-wAAAaIPOOKgy4BL0dnit8T9Xw-oZjCwbO3Il48CHbFubkktRFhO6YjrOAHMsyfTjOAZT6YglIVfJfS5sUZ0CZ9tAsKAEIXv31KBVef3PuswY9Upc-gMSxp00Pg=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fanmay-saha-390b491a5";

// Contact Info
export const EMAIL_ADDRESS = "anmaysaha@gmail.com";
export const PHONE_NUMBER = "7005102084";
export const EMAIL_SUBJECT = encodeURIComponent("Contact for Building Planning");
export const EMAIL_BODY = encodeURIComponent("Hello Er. Anmay Saha,\n\nI would like to discuss building planning and design services with you.\n\nBest regards,");

export const menuLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Art World", to: "/artworks" },
  { label: "Life", href: FACEBOOK_SHARE },
  { label: "Unnati", href: UNNATI_FACEBOOK },
  { label: "Green Construction", to: "/green-constructions" },
  { label: "Cretoverse", href: CRETOVERSE },
  { label: "Contacts", to: "/contact" },
] as const;

export const roles = [
  "Civil Engineer",
  "Material Science Engineer",
  "Artist",
  "Interior Designer",
  "Writer",
  "Social Activist",
  "Proprietor of Green Constructions",
  "Proprietor of Cretoverse"
];

/* ---------------- Shell: header, menu, bottom nav, footer ---------------- */

export function FontStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
      .font-montserrat, .font-montserrat *:not(.font-script) { font-family: 'Montserrat', ui-sans-serif, system-ui, sans-serif !important; }
      .m-grid-bg { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
      .m-grid-bg::before {
        content: ""; position: absolute; inset: 0;
        background-image:
          linear-gradient(to right, rgba(106, 46, 192, 0.055) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(106, 46, 192, 0.055) 1px, transparent 1px);
        background-size: 22px 22px;
        -webkit-mask-image: linear-gradient(to bottom, #000 0, #000 72%, transparent 100%);
                mask-image: linear-gradient(to bottom, #000 0, #000 72%, transparent 100%);
      }
      .m-grid-bg::after {
        content: ""; position: absolute; inset: 0;
        background-image:
          linear-gradient(to right, rgba(44, 53, 43, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(44, 53, 43, 0.04) 1px, transparent 1px);
        background-size: 88px 88px;
        -webkit-mask-image: radial-gradient(ellipse at 70% 15%, #000 0, transparent 70%);
                mask-image: radial-gradient(ellipse at 70% 15%, #000 0, transparent 70%);
      }
    `}</style>
  );
}

let logoVideoPlayed = false;

export function LogoVideo({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const readyRef = useRef(false);
  const resting = useRef(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const markReady = () => { readyRef.current = true; setReady(true); };

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.loop = false;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (logoVideoPlayed || reduceMotion) {
      resting.current = true;
      const rest = () => { v.currentTime = Math.max(0, (v.duration || 0) - 0.05); };
      if (v.readyState >= 1) rest();
      else v.addEventListener("loadedmetadata", rest, { once: true });
      onDone();
      const restSafety = window.setTimeout(() => { if (!readyRef.current) setFailed(true); }, 4000);
      return () => { v.removeEventListener("loadedmetadata", rest); window.clearTimeout(restSafety); };
    }

    v.play().catch(() => { setFailed(true); onDone(); });
    const safety = window.setTimeout(() => {
      if (!readyRef.current) setFailed(true);
      onDone();
    }, 9000);
    return () => window.clearTimeout(safety);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative h-13 w-13 shrink-0">
      {failed && (
        <div className="absolute inset-0 [&>*>*:not(:first-child)]:hidden [&_svg~*]:hidden [&_img~*]:hidden [&_svg]:h-13 [&_svg]:w-13 [&_img]:h-13 [&_img]:w-13">
          <Brand compact />
        </div>
      )}
      <video
        ref={ref}
        src={LOGO_VIDEO}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
        onPlaying={() => { if (!resting.current) markReady(); }}
        onSeeked={() => { if (resting.current) markReady(); }}
        onEnded={(e) => { logoVideoPlayed = true; e.currentTarget.pause(); onDone(); }}
        onError={() => { setFailed(true); onDone(); }}
        className={`absolute inset-0 h-full w-full object-contain mix-blend-multiply transition-opacity duration-200 ${ready && !failed ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const [skipIntro] = useState(logoVideoPlayed);
  const [introDone, setIntroDone] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    if (!open) return () => window.removeEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <>
      <FontStyle />
      <style>{`
        @keyframes navLineGrow {
          0%   { transform: scaleY(0); opacity: 0; }
          15%  { opacity: 1; }
          100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes navTextIn {
          0%   { opacity: 0; transform: translateX(-10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes navLogoIn {
          0%   { opacity: 0; transform: translateY(-6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .nav-logo-in  { animation: navLogoIn 600ms ease-out both; }
        .nav-line     { transform-origin: bottom center; transform: scaleY(0); opacity: 0; }
        .nav-title-1, .nav-title-2 { opacity: 1; }
        .nav-on .nav-line    { animation: navLineGrow 900ms cubic-bezier(.22,1,.36,1) both; }
        .nav-on .nav-title-1, .nav-on .nav-title-2 { transform: none; }
        .nav-static .nav-line { transform: none; opacity: 1; }
        .nav-static .nav-title-1, .nav-static .nav-title-2 { opacity: 1; }
        .nav-static .nav-logo-in { animation: none; }
        .mobile-menu-backdrop { opacity: 0; pointer-events: none; transition: opacity 260ms ease; }
        .mobile-menu-backdrop[data-open="true"] { opacity: 1; pointer-events: auto; }
        .mobile-menu-panel { transform: translateX(100%); transition: transform 360ms cubic-bezier(.22,1,.36,1); }
        .mobile-menu-panel[data-open="true"] { transform: translateX(0); }
        .mobile-menu-link { transition: background-color 180ms ease, color 180ms ease; }
        .mobile-menu-link:active { background-color: var(--accent); color: var(--primary); }
        .mobile-menu-action { transition: transform 180ms ease, background-color 180ms ease; }
        .mobile-menu-action:active { transform: translateY(1px); }
        @media (prefers-reduced-motion: reduce) {
          .nav-logo-in, .nav-on .nav-line, .nav-on .nav-title-1, .nav-on .nav-title-2,
          .mobile-menu-backdrop, .mobile-menu-panel, .mobile-menu-link, .mobile-menu-action { animation: none; transition: none; }
          .nav-line { transform: none; opacity: 1; }
          .nav-title-1, .nav-title-2 { opacity: 1; }
        }
      `}</style>

      <header className="font-montserrat sticky top-0 z-50 border-b border-forest-deep/10 bg-cream/95 backdrop-blur md:hidden">
        <div className={`flex h-20 items-center gap-3 px-4 ${skipIntro ? "nav-static" : introDone ? "nav-on" : ""}`}>
          <Link to="/" aria-label="Anmay Art home" className="nav-logo-in flex shrink-0 flex-col items-center justify-center gap-1 leading-none">
            <LogoVideo onDone={() => setIntroDone(true)} />
            <span className="text-[13px] font-bold tracking-tight text-primary">AnmayArt</span>
          </Link>

          <span aria-hidden className="nav-line block h-16 w-px shrink-0 bg-primary" />

          <div className="min-w-0 flex-1 leading-tight">
            <p className="nav-title-1 whitespace-nowrap text-[18px] font-bold text-ink">Visual Art Design</p>
            <p className="nav-title-2 mt-0.5 whitespace-nowrap text-[15px] font-bold text-muted-foreground"> &amp; Construction</p>
          </div>

          <div className="flex shrink-0 items-center">
            <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-12 w-12 place-items-center rounded-full text-primary focus-visible:outline-2 focus-visible:outline-primary"><Menu size={30} strokeWidth={2.2} /></button>
          </div>
        </div>
      </header>
      <div className="mobile-menu-backdrop fixed inset-0 z-70 bg-black/35 md:hidden" data-open={open} aria-hidden={!open} onClick={() => setOpen(false)}>
        <div role="dialog" aria-modal="true" aria-label="Mobile navigation" className="mobile-menu-panel absolute right-0 top-0 flex h-full w-[min(88vw,390px)] flex-col overflow-y-auto bg-cream px-5 pb-8 shadow-2xl" data-open={open} onClick={(e) => e.stopPropagation()}>
          <div className="flex h-20 shrink-0 items-center justify-between border-b border-forest-deep/10">
            <Brand compact />
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-forest-deep/15 text-forest-deep"><X size={22} /></button>
          </div>
          <nav aria-label="Mobile menu" className="mt-3 grid">
            {menuLinks.map((l, i) => (
              "href" in l ? (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
                  className="mobile-menu-link m-rise flex min-h-14 items-center gap-4 border-b border-forest-deep/10 px-2 py-3 font-serif text-[clamp(1.15rem,6vw,1.5rem)] leading-tight text-ink"
                  style={{ animationDelay: `${120 + i * 40}ms` }}>
                  <span className="w-6 shrink-0 font-sans text-xs font-semibold text-primary">0{i + 1}</span>{l.label}<ExternalLink className="ml-auto shrink-0 text-primary" size={16} />
                </a>
              ) : (
                <Link key={l.label} to={l.to} onClick={() => setOpen(false)}
                  className="mobile-menu-link m-rise flex min-h-14 items-center gap-4 border-b border-forest-deep/10 px-2 py-3 font-serif text-[clamp(1.15rem,6vw,1.5rem)] leading-tight text-ink"
                  style={{ animationDelay: `${120 + i * 40}ms` }}>
                  <span className="w-6 shrink-0 font-sans text-xs font-semibold text-primary">0{i + 1}</span>{l.label}<ArrowRight className="ml-auto shrink-0 text-primary" size={17} />
                </Link>
              )
            ))}
          </nav>
          <div className="mt-auto grid gap-3 border-t border-forest-deep/10 pt-6">
            <a href={`tel:${PHONE_NUMBER}`} onClick={() => setOpen(false)} className="mobile-menu-action flex min-h-14 items-center gap-3 rounded-2xl bg-forest-deep px-5 py-3 text-cream">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10"><Phone size={18} /></span>
              <span><span className="block text-xs font-semibold uppercase tracking-[0.16em] text-cream/65">Call</span><span className="block text-sm font-bold">{PHONE_NUMBER}</span></span>
            </a>
            <a href={`mailto:${EMAIL_ADDRESS}`} onClick={() => setOpen(false)} className="mobile-menu-action flex min-h-14 items-center gap-3 rounded-2xl border border-forest-deep/20 px-5 py-3 text-forest-deep">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-forest-deep/10"><Mail size={18} /></span>
              <span><span className="block text-xs font-semibold uppercase tracking-[0.16em] text-forest-deep/60">Email</span><span className="block text-sm font-bold">{EMAIL_ADDRESS}</span></span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export function MobileBottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const is = (p: string, exact = false) => (exact ? pathname === p : pathname === p || pathname.startsWith(p + "/"));
  const [popupItem, setPopupItem] = useState<string | null>(null);

  const items = [
    { label: "Construction", Icon: Building, to: "/green-constructions", active: is("/green-constructions") },
    { label: "Unnati", Icon: Users, href: UNNATI_FACEBOOK, active: false, direct: true },
    { label: "Artworks", Icon: Palette, to: "/artworks", active: is("/artworks"), direct: true },
    { label: "Cretoverse", Icon: Sparkles, href: CRETOVERSE, active: false, direct: true },
    { label: "Contact", Icon: Phone, to: "/contact", active: is("/contact") },
  ] as const;

  return (
    <>
      <FontStyle />
      <nav
        aria-label="Primary"
        className="font-montserrat fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-50 rounded-[26px] bg-white shadow-[0_14px_40px_-10px_rgba(60,32,190,0.45)] md:hidden"
      >
        <ul className="grid h-[68px] grid-cols-5">
          {items.map((it) => {
            const inner = (
              <>
                <span
                  className={`grid h-11 w-11 place-items-center rounded-full transition-all duration-300 ease-out ${
                    it.active
                      ? "-translate-y-5 scale-110 bg-white shadow-[0_8px_18px_-6px_rgba(90,40,210,0.55)] ring-[6px] ring-[#faf9fe]"
                      : "translate-y-0 scale-100 bg-transparent shadow-none ring-0 ring-transparent"
                  }`}
                >
                  <it.Icon
                    size={22}
                    strokeWidth={1.8}
                    className={`transition-colors duration-300 ${it.active ? "text-[#6a2ec0]" : "text-[#4b4b66]"}`}
                  />
                </span>
                <span
                  className={`-mt-1 text-[10.5px] leading-none transition-all duration-300 ${
                    it.active ? "-translate-y-1 font-bold text-[#6a2ec0]" : "font-medium text-[#4b4b66]"
                  }`}
                >
                  {it.label}
                </span>
              </>
            );
            const cls = "flex h-full flex-col items-center justify-center gap-1 focus-visible:outline-2 focus-visible:outline-[#6a2ec0]";
            return (
              <li key={it.label}>
                {"href" in it ? (
                  <a
                    href={it.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={it.label === "Unnati" ? "Unnati on Facebook" : it.label}
                    onClick={(e) => {
                      if (!it.direct) {
                        e.preventDefault();
                        setPopupItem(it.label);
                      }
                    }}
                    className={cls}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    to={it.to}
                    aria-current={it.active ? "page" : undefined}
                    onClick={(e) => {
                      if (!('direct' in it && it.direct)) {
                        e.preventDefault();
                        setPopupItem(it.label);
                      }
                    }}
                    className={cls}
                  >
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {popupItem && (
        <div role="dialog" aria-modal="true" className="font-montserrat fixed inset-0 z-90 flex items-center justify-center bg-black/60 px-5 md:hidden animate-in fade-in duration-150">
          <div className="w-full max-w-xs rounded-3xl bg-white p-6 text-center shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-[#6a2ec0]/10 text-[#6a2ec0]">
              <SparklesIcon className="h-7 w-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-ink">Selected: {popupItem}</h3>
            <p className="mt-2 text-sm text-muted-foreground">You selected the {popupItem} section.</p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setPopupItem(null)}
                className="flex-1 rounded-full border border-forest-deep/20 py-2.5 text-sm font-semibold text-forest-deep"
              >
                Cancel
              </button>
              {(() => {
                const target = items.find((i) => i.label === popupItem);
                if (!target) return null;
                return "href" in target ? (
                  <a
                    href={target.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setPopupItem(null)}
                    className="flex-1 rounded-full bg-[#6a2ec0] py-2.5 text-sm font-semibold text-white shadow-md text-center"
                  >
                    Proceed
                  </a>
                ) : (
                  <Link
                    to={target.to}
                    onClick={() => setPopupItem(null)}
                    className="flex-1 rounded-full bg-[#6a2ec0] py-2.5 text-sm font-semibold text-white shadow-md text-center inline-flex items-center justify-center"
                  >
                    Proceed
                  </Link>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
  );
}

export function MobileFooter() {
  const [showCallPopup, setShowCallPopup] = useState(false);

  return (
    <>
      <FontStyle />
      <footer className="font-montserrat bg-ink px-5 pt-12 pb-24 text-cream md:hidden">
        <Brand tone="light" />
        <p className="mt-5 max-w-xs text-sm leading-7 text-cream/60">Designing, planning and building spaces that balance purpose and expression.</p>
        
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-primary hover:text-white">
            <InstagramIcon size={20} />
          </a>
          <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-primary hover:text-white">
            <FacebookIcon size={20} />
          </a>
          <a href={YOUTUBE_LINK} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-primary hover:text-white">
            <YoutubeIcon size={20} />
          </a>
          <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-primary hover:text-white">
            <LinkedinIcon size={20} />
          </a>
          <a href={`mailto:${EMAIL_ADDRESS}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`} aria-label="Email Er. Anmay Saha" className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-primary hover:text-white">
            <Mail size={20} />
          </a>
          <button
            type="button"
            onClick={() => setShowCallPopup(true)}
            aria-label="Call Er. Anmay Saha"
            className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-primary hover:text-white"
          >
            <Phone size={20} />
          </button>
        </div>

        <nav aria-label="Footer" className="mt-8 grid grid-cols-2 gap-x-4">
          {menuLinks.map((l) => (
            "href" in l ? (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center text-sm text-cream/75">{l.label}</a>
            ) : (
              <Link key={l.label} to={l.to} className="flex min-h-11 items-center text-sm text-cream/75">{l.label}</Link>
            )
          ))}
        </nav>
        <div className="mt-6 grid gap-2 border-t border-cream/10 pt-6">
          <Link to="/green-constructions" className="flex min-h-11 items-center justify-between text-sm font-bold tracking-[0.14em]">GREEN CONSTRUCTIONS <ArrowUpRight size={16} /></Link>
          <a href={CRETOVERSE} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-between text-sm font-bold tracking-[0.14em]">CRETOVERSE <ExternalLink size={16} /></a>
        </div>
        <p className="mt-6 flex items-center gap-2 text-xs text-cream/50"><MapPin size={14} /> {contact.location}</p>
        
        <div className="mt-6 pt-6 border-t border-cream/10 text-center flex flex-col items-center justify-center gap-1.5">
          <p className="text-xs text-cream/40">© 2026 Anmay Art. All rights reserved.</p>
          <p className="text-xs text-cream/60">
            Managed and Developed by{" "}
            <a href={WEB_INNOVEX} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline inline-flex items-center gap-1 font-bold">
              WebInnovex 360 <ExternalLink size={12} />
            </a>
          </p>
        </div>
      </footer>

      {showCallPopup && (
        <div role="dialog" aria-modal="true" className="font-montserrat fixed inset-0 z-90 flex items-center justify-center bg-black/60 px-5 md:hidden animate-in fade-in duration-150">
          <div className="w-full max-w-xs rounded-3xl bg-white p-6 text-center shadow-2xl animate-in zoom-in-95 duration-150 text-ink">
            <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
              <Phone size={26} />
            </div>
            <h3 className="font-serif text-xl font-bold">Call Er. Anmay Saha Sir?</h3>
            <p className="mt-2 text-sm text-muted-foreground">Are you sure you want to call {PHONE_NUMBER}?</p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowCallPopup(false)}
                className="flex-1 rounded-full border border-forest-deep/20 py-2.5 text-sm font-semibold text-forest-deep"
              >
                Cancel
              </button>
              <a
                href={`tel:${PHONE_NUMBER}`}
                onClick={() => setShowCallPopup(false)}
                className="flex-1 rounded-full bg-primary py-2.5 text-sm font-semibold text-white shadow-md text-center inline-flex items-center justify-center"
              >
                Proceed
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* Custom Social SVG Icons */
export function InstagramIcon(props: { size?: number; className?: string }) {
  return (
    <svg width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export function FacebookIcon(props: { size?: number; className?: string }) {
  return (
    <svg width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export function YoutubeIcon(props: { size?: number; className?: string }) {
  return (
    <svg width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <path d="m10 15 5-3-5-3z"/>
    </svg>
  );
}

export function LinkedinIcon(props: { size?: number; className?: string }) {
  return (
    <svg width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

/* ---------------- Shared bits ---------------- */

function Label({ children, light }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[13px] font-semibold tracking-[0.18em] uppercase text-center ${light ? "text-cream/75" : "text-primary"}`}>{children}</p>;
}
function Heading({ children, light, className = "" }: { children: ReactNode; light?: boolean; className?: string }) {
  return <h2 className={`mt-2 font-serif text-[1.8rem] leading-[1.2] font-semibold text-center ${light ? "text-cream" : "text-ink"} ${className}`}>{children}</h2>;
}
function SectionHead({ label, title, link }: { label: string; title: ReactNode; link?: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 px-5">
      <div className="min-w-0 text-left">
        <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-primary">{label}</p>
        <h2 className="mt-2 font-serif text-[1.8rem] leading-[1.2] font-semibold text-ink">{title}</h2>
      </div>
      {link && <div className="shrink-0">{link}</div>}
    </div>
  );
}
function useSwitchButtons() {
  const [active, setActive] = useState(0);
  const onClick = (i: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    if (el.dataset["go"] === "1") { el.dataset["go"] = ""; return; }
    e.preventDefault();
    setActive(i);
    window.setTimeout(() => { el.dataset["go"] = "1"; el.click(); }, 320);
  };
  return { active, onClick };
}
const switchBtn = (on: boolean) =>
  `inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-6 text-[13px] font-bold tracking-[0.08em] transition-all duration-300 ease-out active:scale-[0.95] ${
    on ? "border-forest-deep bg-forest-deep text-cream shadow-md" : "border-forest-deep/30 bg-white text-forest-deep shadow-sm"
  }`;
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
    <div role="dialog" aria-modal="true" aria-label="Image viewer" className="font-montserrat fixed inset-0 z-80 flex flex-col bg-ink text-cream"
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

/* ---------------- Home / MobileHome Component ---------------- */

export const credCards = [
  { t: "B.Tech", s: "Civil Engineering", Icon: GraduationCap },
  { t: "M.Tech", s: "Materials Science Engineer", Icon: GraduationCap },
  { t: "Grade I", s: "Building Planner AMC", Icon: Building2 },
  { t: "Associate Member", s: "Institution of Engineers (India)", Icon: Users },
  { t: "Secretary", s: "AMBPA", Icon: Award },
  { t: "Founder", s: "Unnati", Icon: Sparkles },
  { t: "Proprietor", s: "Green Constructions", Icon: Leaf },
  { t: "Proprietor", s: "Cretoverse", Icon: Building },
];

type BusinessCard = {
  t: string;
  d: string;
  Icon: typeof Building2;
  logo?: string;
};

export const businessCards: BusinessCard[] = [
  { t: "Green Construction", d: "Planning, construction and interiors built on quality and sustainable design.", Icon: Building2 },
  { t: "Go Green Enterprise", d: "A sustainable enterprise for a greener tomorrow.", Icon: Leaf },
  { t: "Cretoverse", d: "A social and portfolio platform for India's creative community.", Icon: Sparkles },
  { t: "Anmayart", d: "Visual art, design and creative expression.", Icon: Palette },
];

type ServiceCard = {
  t: string;
  Icon: typeof DraftingCompass;
  img: string;
  desc?: string;
  items?: string[];
  etc?: boolean;
};

export const serviceCardsData: ServiceCard[] = [
  { t: "Planning", Icon: DraftingCompass, img: card1, items: ["Buildings", "Bridges", "Temples", "Parks", "Reservoirs", "Roads"], etc: true },
  { t: "Construction", Icon: HardHat, img: card2, desc: "Construction of buildings and other structures." },
  { t: "Interior Designing & Execution", Icon: Paintbrush, img: card3, items: ["Hotels", "Residences", "Parks", "Resorts"], etc: true },
  { t: "Construction & Renovation", Icon: Layers3, img: card4, desc: "Construction and renovation of existing spaces." },
  { t: "Painting & Sculpting", Icon: Palette, img: card5, desc: "Painting, sculpting and creative artwork." },
  { t: "Writing", Icon: FileText, img: card6, desc: "Creative and thoughtful writing." },
];

export const useFeatured = () => {
  const projects = useProjects();
  return projects
    .filter((p) => Boolean(p.image) && Boolean(p.remoteId) && Boolean(p.location) && !/to be confirmed/i.test(p.location))
    .map((p) => ({ key: p.slug, title: p.title, category: p.category, location: p.location, image: p.image as string, gc: false }));
};

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
  const heroSw = useSwitchButtons();
  const aboutSw = useSwitchButtons();
  const credI = useAutoCarousel(credRef, credCards.length, 3800);
  const serviceI = useAutoCarousel(serviceRef, serviceCardsData.length, 3200);
  const artworks = useArtworks();
  const featured = useFeatured();
  const projI = useAutoCarousel(projRef, featured.length, 3800);
  const artI = useAutoCarousel(artRef, artworks.length, 3400);

  const processRef = useRef<HTMLDivElement>(null);
  const [processInView, setProcessInView] = useState(false);

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
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
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  useEffect(() => {
    const el = processRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setProcessInView(entry?.isIntersecting ?? false);
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-montserrat relative isolate overflow-x-hidden bg-cream md:hidden">
      <FontStyle />
      <div aria-hidden className="m-grid-bg" />
      {/* HERO / SEO Optimized Centered Intro */}
      <section className="relative z-10 px-5 pt-6 pb-4 text-center">
        <div className="m-rise">
          {/* <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary">CIVIL ENGINEER &amp; BUILDING PLANNER</p> */}
          <div className="mt-2">
            <span className="font-serif text-[2.2rem] leading-tight text-ink block font-normal">
              Hello! 
            </span>
            <h1 className="font-serif text-[2.6rem] leading-[1.08] font-bold text-ink mt-1">
              I'm <span className="text-primary">Anmay Saha</span>
            </h1>
          </div>

          <div className="mt-2 h-9 flex items-center justify-center">
            <p className="text-base font-semibold text-primary tracking-wide">
              {currentText}
              <span className="inline-block w-0.5 h-4 ml-1 bg-primary animate-pulse align-middle" />
            </p>
          </div>

          <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground max-w-sm mx-auto">
            Designing thoughtful spaces, planning with precision, and building with purpose.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link to="/about" onClick={heroSw.onClick(0)} className={switchBtn(heroSw.active === 0)}>About Me <ArrowRight size={15} /></Link>
            <Link to="/contact" onClick={heroSw.onClick(1)} className={switchBtn(heroSw.active === 1)}>Contact me <ArrowUpRight size={15} /></Link>
          </div>
        </div>

        <div className="m-rise relative mt-6" style={{ animationDelay: "140ms" }}>
          <img src={portrait} alt="Anmay Saha - Civil Engineer & Building Planner" fetchPriority="high" className="aspect-4/5 w-full rounded-[22px] object-cover object-top" />
          <Link to="/green-constructions" className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl bg-forest-deep/95 px-4 py-3 text-cream shadow-soft backdrop-blur text-left">
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
      <section aria-label="Credentials" className="relative z-10 pt-6">
        <div ref={credRef} aria-label="Credentials, swipe to explore" className="m-noscroll flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1">
          {credCards.map(({ t, s, Icon }) => (
            <div key={t + s} className="m-credential-circle flex h-33 w-33 shrink-0 snap-start flex-col items-center justify-center px-3 text-center">
              <Icon size={25} strokeWidth={1.5} className="text-forest-deep" />
              <p className="mt-2 text-[14px] font-bold leading-tight text-forest-deep">{t}</p>
              <p className="mt-1 text-[10px] leading-snug text-ink/75">{s}</p>
            </div>
          ))}
        </div>
        <Dots count={credCards.length} active={credI} />
      </section>

      {/* ABOUT ME */}
      <section className="relative z-10 px-5 pt-8 text-center">
        <div className="relative overflow-hidden rounded-[30px] border-2 border-primary bg-[#fcfcf8] p-7 shadow-[0_12px_40px_rgba(44,53,43,0.12)]">
          <div className="absolute top-16 right-[15%] grid grid-cols-5 gap-2 opacity-20">
            {Array.from({ length: 15 }).map((_, i) => <span key={i} className="h-1 w-1 rounded-full bg-primary" />)}
          </div>
          <div className="absolute top-6 right-5 text-primary/80">
            <Leaf size={48} strokeWidth={1.35} />
          </div>
          <span className="absolute top-14 right-3 h-20 w-px bg-gold" />

          <div className="relative z-10 flex items-center justify-center gap-2">
            <span className="h-0.75 w-6 bg-gold" />
            <p className="text-[12px] font-semibold tracking-[0.24em] text-primary">About me</p>
            <span className="h-0.75 w-6 bg-gold" />
          </div>

          <h2 className="relative z-10 mt-5 font-serif text-[1.75rem] leading-[1.18] font-semibold tracking-[-0.025em] text-ink">
            Anmay Saha, an Engineer &amp; an Artist with Wide Experience in the Field
          </h2>

          <div className="relative z-10 mt-6 space-y-4 text-center">
            <span className="mx-auto block h-0.75 w-10 bg-gold" />
            <p className="text-[14px] leading-[1.65] font-medium text-[#1e1b4b]">
              Anmay Saha is a B.Tech Civil Engineer and M.Tech Engineer in Materials Science, an AMC approved Building Planner, and Associate Member of the Institution of Engineers (India).
            </p>
            <p className="text-[14px] leading-[1.65] font-medium text-[#1e1b4b]">
              He is doing all his businesses under the name of anmayarts.com. He is the proprietor of “Green Constructions”, a professionally managed firm offering comprehensive building planning, construction, and interior design services, with a strong commitment to quality, structural integrity, and sustainable design practices.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link to="/projects" onClick={aboutSw.onClick(0)} className={switchBtn(aboutSw.active === 0)}>
                <span>Explore my work</span>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-cream">
                  <ArrowRight size={13} strokeWidth={2.5} />
                </span>
              </Link>
              <Link to="/achievement" onClick={aboutSw.onClick(1)} className={switchBtn(aboutSw.active === 1)}>
                <span>Achievement</span>
                <Award size={15} className={`transition-colors duration-300 ${aboutSw.active === 1 ? "text-cream" : "text-primary"}`} />
              </Link>
            </div>

            <blockquote className="mt-6 font-serif text-[13.5px] italic leading-relaxed text-ink/90">
              “Life is not about earning money, but about creating something for humanity that helps, entertains, and elevates the way we live.”
            </blockquote>

            {/* Signature Image instead of Anmay Saha text */}
            <div className="mt-6 pt-2 text-center">
              <img
                src={SIGN_IMAGE_URL}
                alt="Anmay Saha signature"
                loading="lazy"
                className="mx-auto h-16 w-auto max-w-full object-contain select-none"
              />
              <span className="mx-auto mt-3.5 block h-0.75 w-10 bg-gold" />
              <div className="mt-3 space-y-1 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground">
                <p>CIVIL ENGINEER</p>
                <p>BUILDING PLANNER</p>
                <p>CONSTRUCTION PROFESSIONAL</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE / PROFESSIONAL JOURNEY */}
      <section id="m-experience" className="relative z-10 mt-12 scroll-mt-20 bg-card px-5 py-12 text-center">
        <Label>Professional journey</Label>
        <Heading>A Practice<br />Built on Purpose.</Heading>
        <ol className="relative mt-8 max-w-sm mx-auto text-left border-l-2 border-primary/40 pl-6">
          {journey.map((j) => (
            <li key={j.role + j.organization} className="relative pb-7 pl-4 last:pb-0">
              <span className="absolute top-1 -left-[31px] h-4 w-4 rounded-full border-4 border-card bg-primary" />
              <p className="text-[15px] font-semibold text-ink">{j.role}</p>
              <p className="text-[13px] font-semibold text-primary">{j.organization}</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{j.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* WHAT I DO */}
      <section id="m-services" className="relative z-10 scroll-mt-20 pt-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 px-5">
          <div className="min-w-0 text-center col-span-2">
            <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-primary">My services</p>
            <h2 className="mt-2 font-serif text-[1.8rem] leading-[1.2] font-semibold text-ink">What I Do</h2>
            <div className="mt-2 flex justify-end">
              <Link to="/" hash="services" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-forest-deep">View All <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
        <div ref={serviceRef} aria-label="Services, swipe to explore" className="m-noscroll -mx-5 mt-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 py-1">
          {serviceCardsData.map(({ t, desc, items, etc, Icon, img }, i) => (
            <Link key={t} to="/" hash="contact" className="group relative flex h-60 w-[min(82vw,300px)] shrink-0 snap-center overflow-hidden rounded-4xl border border-stone-200/70 bg-white p-4 shadow-sm text-left">
              <div className="relative z-10 flex w-[58%] flex-col pr-1">
                <div className="mb-2 flex items-center gap-1.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Icon size={14} strokeWidth={1.75} />
                  </div>
                  <span className="text-[10px] font-medium tracking-widest text-stone-400">0{i + 1}</span>
                  <span className="h-px w-3 bg-stone-300" />
                </div>
                <h3 className="font-serif text-[14px] font-semibold leading-tight text-stone-900 group-hover:text-primary">{t}</h3>
                {items ? (
                  <ol className="mt-2 space-y-0.5 text-[11px] leading-snug text-stone-600">
                    {items.map((it, j) => (
                      <li key={it}><span className="font-semibold text-primary">{String.fromCharCode(97 + j)}.</span> {it}</li>
                    ))}
                    {etc && <li className="italic text-stone-400">etc.</li>}
                  </ol>
                ) : (
                  <p className="mt-2 text-[11.5px] leading-relaxed text-stone-500">{desc}</p>
                )}
              </div>
              <div className="absolute inset-y-0 right-0 w-[42%] overflow-hidden rounded-l-[50%] bg-stone-100 rounded-[52%_0_0_52%/50%_0_0_50%]">
                <img src={img} alt={t} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-black/10 via-transparent to-transparent" />
              </div>
            </Link>
          ))}
        </div>
        <Dots count={serviceCardsData.length} active={serviceI} />
      </section>

      {/* CTA / LET'S WORK TOGETHER */}
      <section className="relative z-10 px-5 pt-10 text-center">
        <div className="m-leaf relative overflow-hidden rounded-4xl bg-forest-deep p-6 text-cream">
          <Leaf aria-hidden size={110} strokeWidth={0.7} className="absolute -right-4 -bottom-4 text-cream/10" />
          <Label light>Let's work together</Label>
          <Heading light className="text-[1.8rem]">Have a Project in Mind?</Heading>
          <p className="mt-2 text-[14px] text-cream/75">Let's create something thoughtful together.</p>
          <div className="mt-5 flex justify-center">
            <a href="#m-contact" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cream px-5 text-[12.5px] font-bold tracking-[0.08em] text-forest-deep">GET FREE CONSULTATION <ArrowRight size={15} /></a>
          </div>
        </div>
      </section>

      {/* MY BUSINESS */}
      <section ref={processRef} className="relative z-10 font-montserrat px-5 py-12 text-center overflow-hidden">
        <h2 className="text-[2rem] leading-[1.15] font-extrabold tracking-tight text-ink">My Business</h2>
        <span className="mx-auto mt-3 block h-0.75 w-10 bg-gold" />
        <div className="mt-7 grid gap-3">
          {businessCards.map(({ t, d, Icon, logo }, i) => {
            const isEven = i % 2 === 0;
            const animClass = processInView
              ? "translate-x-0 opacity-100"
              : isEven
              ? "-translate-x-full opacity-0"
              : "translate-x-full opacity-0";

            return (
              <div
                key={t}
                style={{ transitionDelay: `${i * 180}ms` }}
                className={`flex items-center gap-4 rounded-2xl border border-forest-deep/12 bg-card p-4 text-left shadow-sm transition-all duration-700 ease-out transform ${animClass}`}
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-forest-deep text-cream ring-4 ring-forest-deep/10">
                  {logo ? <img src={logo} alt="" className="h-8 w-8 object-contain" /> : <Icon size={24} strokeWidth={1.6} />}
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold tracking-[0.12em] text-ink uppercase">{t}</p>
                  <p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">{d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* GREEN CONSTRUCTIONS */}
      <section className="relative isolate min-h-130 overflow-hidden -mt-4">
        <img src={siteAsset} alt="Engineer reviewing plans on a construction site" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover object-[30%_center]" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-forest-deep via-forest-deep/75 to-forest-deep/30" />
        <div className="flex min-h-130 flex-col justify-end px-5 pt-12 pb-10 text-cream text-center">
          <p className="text-[12px] font-bold tracking-[0.24em] text-cream/80">GREEN CONSTRUCTIONS</p>
          <h2 className="mt-3 font-serif text-[2.2rem] leading-[1.1]">Built with intention.<br />Led with care.</h2>
          <p className="mt-4 text-[13px] text-cream/75">Founder &amp; Proprietor</p>
          <p className="font-script text-3xl">Anmay Saha</p>
          <div className="mt-6 flex justify-center">
            <Link to="/green-constructions" className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-cream px-6 text-[12.5px] font-bold tracking-[0.08em] text-forest-deep">EXPLORE GREEN CONSTRUCTIONS <ArrowRight size={15} /></Link>
          </div>
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
    <section id="m-contact" className="relative z-10 scroll-mt-20 px-5 py-12 text-center">
      <Label>Let's work together</Label>
      <Heading>Have a Project<br />in Mind?</Heading>
      <p className="mt-3 flex items-center justify-center gap-2 text-[14px] text-muted-foreground"><MapPin size={16} className="text-primary" /> {contact.location}</p>
      {sent ? (
        <div role="status" className="mt-6 rounded-2xl border border-forest-deep/12 bg-card p-6 text-left">
          <p className="font-serif text-xl text-ink">Thank you — your details are noted.</p>
          <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">Online enquiries aren't connected yet, so this message has not been sent. Direct contact details will be published here soon.</p>
          <button type="button" onClick={() => setSent(false)} className="mt-4 min-h-11 text-[13px] font-bold text-forest-deep">Edit enquiry</button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 grid gap-3 text-left">
          <label className="sr-only" htmlFor="m-name">Full Name</label><input id="m-name" required placeholder="Full Name" className={field} />
          <label className="sr-only" htmlFor="m-phone">Phone Number</label><input id="m-phone" type="tel" placeholder="Phone Number" className={field} />
          <label className="sr-only" htmlFor="m-email">Email Address</label><input id="m-email" type="email" placeholder="Email Address" className={field} />
          <label className="sr-only" htmlFor="m-service">Select Service</label>
          <select id="m-service" defaultValue="" className={field}><option value="" disabled>Select Service</option>{services.map((s) => <option key={s.title}>{s.title}</option>)}<option>Other</option></select>
          <label className="sr-only" htmlFor="m-msg">Message</label><textarea id="m-msg" rows={4} placeholder="Message" className={`${field} h-auto py-3`} />
          <button type="submit" className={`${pill} mt-1 justify-center w-full`}>SEND MESSAGE <ArrowRight size={15} /></button>
          <p className="text-[12px] text-muted-foreground text-center">Online enquiries are not yet connected — nothing is sent from this form.</p>
        </form>
      )}
    </section>
  );
}