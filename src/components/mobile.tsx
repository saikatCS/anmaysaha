// cspell:ignore CRETOVERSE Anmay Saha Chowmohoni Agartala noscroll Unnati
import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight, ArrowUpRight, Award, Building2, ChevronLeft, ChevronRight, ClipboardCheck, FileCheck2,
  GraduationCap, HardHat, Home as HomeIcon, Lamp, LayoutGrid, Leaf, MapPin, Menu, MessageSquare,
  Ruler, Search, User, Users, Wrench, X, FileText, ExternalLink, DraftingCompass, Paintbrush, Layers3, Box,
  Palette, Phone, Mail
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
const UNNATI_FACEBOOK = "https://www.facebook.com/";
const WEB_INNOVEX = "https://webinnovex360.online";

// Social Links
const INSTAGRAM_LINK = "https://www.instagram.com/anmayart.com";
const FACEBOOK_LINK = "https://www.facebook.com/";
const YOUTUBE_LINK = "https://www.youtube.com/";
const LINKEDIN_LINK = "https://www.linkedin.com/";

// Contact Info
const EMAIL_ADDRESS = "anmaysaha@gmail.com";
const PHONE_NUMBER = "7005102084";
const EMAIL_SUBJECT = encodeURIComponent("Contact for Building Planning");
const EMAIL_BODY = encodeURIComponent("Hello Er. Anmay Saha,\n\nI would like to discuss building planning and design services with you.\n\nBest regards,");

const menuLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Artwork", to: "/artworks" },
  { label: "Unnati", href: UNNATI_FACEBOOK },
  { label: "Work", to: "/projects" },
  { label: "Services", to: "/", hash: "m-services" },
  { label: "Contact", to: "/contact" },
] as const;

const roles = [
  "Civil Engineer",
  "Building Planner",
  "Construction Professional",
  "Founder of Green Constructions",
  "Founder of Cretoverse"
];

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
              "href" in l ? (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
                  className="m-rise flex items-baseline gap-4 border-b border-forest-deep/10 py-3.5 font-serif text-[2rem] leading-tight text-ink"
                  style={{ animationDelay: `${120 + i * 40}ms` }}>
                  <span className="font-sans text-xs font-semibold text-primary">0{i + 1}</span>{l.label}
                </a>
              ) : (
                <Link key={l.label} to={l.to} {...("hash" in l ? { hash: l.hash } : {})} onClick={() => setOpen(false)}
                  className="m-rise flex items-baseline gap-4 border-b border-forest-deep/10 py-3.5 font-serif text-[2rem] leading-tight text-ink"
                  style={{ animationDelay: `${120 + i * 40}ms` }}>
                  <span className="font-sans text-xs font-semibold text-primary">0{i + 1}</span>{l.label}
                </Link>
              )
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

/* 5-button floating bottom bar: Construction | Unnati (direct) | Artworks (direct) | Life | Contact with popup for others */
export function MobileBottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const is = (p: string, exact = false) => (exact ? pathname === p : pathname === p || pathname.startsWith(p + "/"));
  const [popupItem, setPopupItem] = useState<string | null>(null);

  const items = [
    { label: "Construction", Icon: Leaf, to: "/green-constructions", active: is("/green-constructions") },
    { label: "Unnati", Icon: Users, href: UNNATI_FACEBOOK, active: false, direct: true },
    { label: "Artworks", Icon: Palette, to: "/artworks", active: is("/artworks"), direct: true },
    { label: "Life", Icon: FileText, to: "/about", active: is("/about") },
    { label: "Contact", Icon: Phone, to: "/contact", active: is("/contact") },
  ] as const;

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-50 rounded-[26px] bg-white shadow-[0_14px_40px_-10px_rgba(60,32,190,0.45)] md:hidden"
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
                    aria-label="Unnati on Facebook"
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

      {/* Popup Dialog when clicking non-direct navigation icons */}
      {popupItem && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-90 flex items-center justify-center bg-black/60 px-5 md:hidden animate-in fade-in duration-150">
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
      <footer className="bg-ink px-5 pt-12 pb-24 text-cream md:hidden">
        <Brand tone="light" />
        <p className="mt-5 max-w-xs text-sm leading-7 text-cream/60">Designing, planning and building spaces that balance purpose and expression.</p>
        
        {/* Social Media & Direct Action Icons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {/* Instagram */}
          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-primary hover:text-white"
          >
            <InstagramIcon size={20} />
          </a>
          {/* Facebook */}
          <a
            href={FACEBOOK_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-primary hover:text-white"
          >
            <FacebookIcon size={20} />
          </a>
          {/* YouTube */}
          <a
            href={YOUTUBE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-primary hover:text-white"
          >
            <YoutubeIcon size={20} />
          </a>
          {/* LinkedIn */}
          <a
            href={LINKEDIN_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-primary hover:text-white"
          >
            <LinkedinIcon size={20} />
          </a>
          {/* Email with pre-written subject & body */}
          <a
            href={`mailto:${EMAIL_ADDRESS}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`}
            aria-label="Email Er. Anmay Saha"
            className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-primary hover:text-white"
          >
            <Mail size={20} />
          </a>
          {/* Call Icon triggering confirmation popup */}
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
              <Link key={l.label} to={l.to} {...("hash" in l ? { hash: l.hash } : {})} className="flex min-h-11 items-center text-sm text-cream/75">{l.label}</Link>
            )
          ))}
        </nav>
        <div className="mt-6 grid gap-2 border-t border-cream/10 pt-6">
          <Link to="/green-constructions" className="flex min-h-11 items-center justify-between text-sm font-bold tracking-[0.14em]">GREEN CONSTRUCTIONS <ArrowUpRight size={16} /></Link>
          <a href={CRETOVERSE} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-between text-sm font-bold tracking-[0.14em]">CRETOVERSE <ExternalLink size={16} /></a>
        </div>
        <p className="mt-6 flex items-center gap-2 text-xs text-cream/50"><MapPin size={14} /> {contact.location}</p>
        
        {/* Centralized Copyright and Developed & Managed lines */}
        <div className="mt-6 pt-6 border-t border-cream/10 text-center flex flex-col items-center justify-center gap-1.5">
          <p className="text-xs text-cream/40">© 2026 Anmay Art. All rights reserved.</p>
          <p className="text-xs text-cream/60">
            Develop &amp; Manged by{" "}
            <a href={WEB_INNOVEX} target="_blank" rel="noopener noreferrer" className="font-bold text-cream hover:underline inline-flex items-center gap-1">
              webinnovex360 <ExternalLink size={12} />
            </a>
          </p>
        </div>
      </footer>

      {/* Call Confirmation Popup Modal */}
      {showCallPopup && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-90 flex items-center justify-center bg-black/60 px-5 md:hidden animate-in fade-in duration-150">
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
function InstagramIcon(props: { size?: number; className?: string }) {
  return (
    <svg width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon(props: { size?: number; className?: string }) {
  return (
    <svg width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function YoutubeIcon(props: { size?: number; className?: string }) {
  return (
    <svg width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <path d="m10 15 5-3-5-3z"/>
    </svg>
  );
}

function LinkedinIcon(props: { size?: number; className?: string }) {
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
const useFeatured = () => {
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
  const credI = useAutoCarousel(credRef, credCards.length, 3800);
  const serviceI = useAutoCarousel(serviceRef, serviceCardsData.length, 3200);
  const artworks = useArtworks();
  const featured = useFeatured();
  const projI = useAutoCarousel(projRef, featured.length, 3800);
  const artI = useAutoCarousel(artRef, artworks.length, 3400);

  // Intersection observer for Process / How I work cards animation with bidirectional trigger (supports scrolling down AND scrolling up)
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
      // Toggle state based on visibility so it animates whether scrolling down or up
      setProcessInView(entry?.isIntersecting ?? false);
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const processSteps = [
    ["Discover", "Understanding needs, site and aspirations."],
    ["Plan", "Shaping layouts and technical direction."],
    ["Design", "Refining form, material and detail."],
    ["Build", "Executing with care and coordination."],
    ["Deliver", "Handing over a considered, finished space."]
  ];

  return (
    <div className="overflow-x-hidden bg-cream md:hidden">
      {/* HERO / SEO Optimized Centered Intro */}
      <section className="relative px-5 pt-6 pb-4 text-center">
        <div className="m-rise">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary">CIVIL ENGINEER &amp; BUILDING PLANNER</p>
          <div className="mt-2">
            <span className="font-serif text-[2.2rem] leading-tight text-ink block font-normal">
              Hello! 
            </span>
            <h1 className="font-serif text-[2.6rem] leading-[1.08] font-bold text-ink mt-1">
              I'm <span className="text-primary">Anmay Saha</span>
            </h1>
          </div>

          {/* Typewriter Role Container */}
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
            <Link to="/projects" className={`${pill} px-6`}>Explore my work <ArrowRight size={15} /></Link>
            <Link to="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-forest-deep/25 px-6 text-[13px] font-bold tracking-[0.08em] text-forest-deep transition active:scale-[0.98]">Contact me <ArrowUpRight size={15} /></Link>
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

      {/* ABOUT ME (Static Box with Brand Border Matching Primary / #6a2ec0, Increased Font Size, No Sliding Image, Lowered Signature) */}
      <section className="px-5 pt-8 text-center">
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
            <p className="text-[12px] font-semibold tracking-[0.24em] text-primary">ABOUT ME</p>
            <span className="h-0.75 w-6 bg-gold" />
          </div>

          <h2 className="relative z-10 mt-5 font-serif text-[2rem] leading-[1.1] font-semibold tracking-[-0.035em] text-ink">
            Crafting <span className="font-medium italic text-forest">Spaces</span> with Passion &amp; Precision.
          </h2>

          <div className="relative z-10 mt-5">
            <span className="mx-auto mb-3 block h-0.75 w-10 bg-gold" />
            <p className="text-[14.5px] leading-[1.6] text-muted-foreground">
              B.Tech Civil Engineer &amp; M.Tech Materials Science, AMC-approved Building Planner and Associate Member of the Institution of Engineers (India). Proprietor of Green Constructions — planning, construction and interiors built on quality, structural integrity and sustainable design.
            </p>
            
            {/* Lowered Signature & Designation */}
            <div className="mt-6 pt-2">
              <p className="font-script text-[2.4rem] leading-none text-forest-deep">Anmay Saha</p>
              <span className="mx-auto mt-3 block h-0.75 w-10 bg-gold" />
              <div className="mt-3 space-y-1 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground">
                <p>CIVIL ENGINEER</p>
                <p>BUILDING PLANNER</p>
                <p>CONSTRUCTION PROFESSIONAL</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Link to="/about" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-forest-deep px-6 text-[13px] font-bold tracking-[0.06em] text-cream shadow-md transition active:scale-[0.98]">
              <span>Know More</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-cream">
                <ArrowRight size={15} strokeWidth={2.5} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* EXPERIENCE / PROFESSIONAL JOURNEY */}
      <section id="m-experience" className="mt-12 scroll-mt-20 bg-card px-5 py-12 text-center">
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

      {/* WHAT I DO (Centered Title, View All on right) */}
      <section id="m-services" className="scroll-mt-20 pt-10">
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
          {serviceCardsData.map(({ t, desc, Icon, img }, i) => (
            <Link key={t} to="/" hash="contact" className="group relative flex h-45 w-[min(74vw,260px)] shrink-0 snap-center overflow-hidden rounded-4xl border border-stone-200/70 bg-white p-3.5 shadow-sm text-left">
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

      {/* FEATURED PROJECTS (Centered Title, View All on right) */}
      <section className="pt-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 px-5">
          <div className="min-w-0 text-center col-span-2">
            <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-primary">Featured projects</p>
            <h2 className="mt-2 font-serif text-[1.8rem] leading-[1.2] font-semibold text-ink">Some of My Recent Work</h2>
            <div className="mt-2 flex justify-end">
              <Link to="/projects" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-forest-deep">View All <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
        <div ref={projRef} aria-label="Featured projects, swipe to explore" className="m-noscroll mt-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5">
          {featured.map((p) => {
            const inner = (
              <>
                <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">{p.category}</span>
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-cream text-left">
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

      {/* CTA / LET'S WORK TOGETHER (Medium Heading) */}
      <section className="px-5 pt-10 text-center">
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

      {/* HOW I WORK / PROCESS (Bidirectional sliding animation supporting scroll down & scroll up) */}
      <section ref={processRef} className="px-5 py-12 text-center overflow-hidden">
        <Label>How I work</Label>
        <Heading>From Concept<br />to Completion.</Heading>
        <div className="mt-7 grid gap-3">
          {processSteps.map(([t, d], i) => {
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
                className={`flex items-center gap-4 rounded-2xl border border-forest-deep/12 bg-card p-4 text-left transition-all duration-700 ease-out transform ${animClass}`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest-deep text-sm font-bold text-cream">0{i + 1}</span>
                <div className="min-w-0"><p className="text-[13px] font-bold tracking-[0.14em] text-ink uppercase">{t}</p><p className="text-[13.5px] text-muted-foreground">{d}</p></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ARTWORKS / BEYOND ENGINEERING (Medium Heading) */}
      <section className="py-12 text-center">
        <div className="px-5">
          <Label>Beyond engineering</Label>
          <Heading className="text-[1.8rem]">Where Engineering Meets Creative Expression.</Heading>
        </div>
        <div ref={artRef} aria-label="Artworks, swipe to explore" className="m-noscroll mt-6 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 text-left">
          {artworks.map((a) => (
            <Link key={a.slug} to="/artworks/$slug" params={{ slug: a.slug }} className="w-[62%] shrink-0 snap-start">
              <img src={a.image} alt={a.title} loading="lazy" className="aspect-4/5 w-full rounded-[18px] object-cover" />
              <p className="mt-2.5 font-serif text-lg text-ink">{a.title}</p>
            </Link>
          ))}
        </div>
        <Dots count={artworks.length} active={artI} />
        <div className="px-5 flex justify-center"><Link to="/artworks" className={`${pill} mt-6`}>EXPLORE MY ARTWORKS <ArrowRight size={15} /></Link></div>
      </section>

      {/* GREEN CONSTRUCTIONS (Shifted slightly upward via negative margin) */}
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
    <section id="m-contact" className="scroll-mt-20 px-5 py-12 text-center">
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
          <label className="rv-sr-only" htmlFor="m-email">Email Address</label><input id="m-email" type="email" placeholder="Email Address" className={field} />
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