// cspell:ignore Unnati
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Brand } from './Brand';
import { LogoVideo } from '@/components/mobile';

const links = [
  { label: 'Home', to: '/' }, { label: 'About', to: '/about' },
  { label: 'Services', to: '/', hash: 'services' }, { label: 'Projects', to: '/projects' },
  { label: 'Artworks', to: '/artworks' }, { label: 'Contact', to: '/contact' },
] as const;

const desktopPrimaryLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Art World', to: '/artworks' },
  { label: 'Life', href: 'https://www.facebook.com/share/1CWdHVbWVJ' },
  { label: 'Green Construction', to: '/green-constructions' },
] as const;

const desktopMoreLinks = [
  { label: 'Unnati', href: 'https://www.facebook.com/' },
  { label: 'Cretoverse', href: 'https://cretoverse.com' },
] as const;

const PHONE_NUMBER = '7005102084';
const EMAIL_ADDRESS = 'anmaysaha@gmail.com';

export function Header() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`sticky top-0 z-50 bg-card/90 backdrop-blur-md transition-shadow ${scrolled ? 'shadow-soft' : ''}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:px-8">
        <Link to="/" onClick={() => setOpen(false)} className="min-w-0 lg:hidden"><Brand /></Link>
        <Link to="/" aria-label="Anmay Art home" onClick={() => setOpen(false)} className="hidden items-center gap-2 lg:flex">
          <span className="h-13 w-13"><LogoVideo onDone={() => undefined} /></span>
          <span className="hidden text-sm font-bold leading-tight text-primary xl:block">
            Anmay<br />Art
          </span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center justify-center gap-1 lg:flex">
          {desktopPrimaryLinks.map((l) => (
            'href' in l ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative whitespace-nowrap rounded-full px-2.5 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-accent hover:text-primary xl:px-3 xl:text-sm"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.to}
                activeOptions={{ exact: true }}
                className="relative whitespace-nowrap rounded-full px-2.5 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-accent hover:text-primary xl:px-3 xl:text-sm"
                activeProps={{ className: 'bg-accent text-primary' }}
              >
                {l.label}
              </Link>
            )
          ))}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((value) => !value)}
              className="whitespace-nowrap rounded-full px-2.5 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-accent hover:text-primary xl:px-3 xl:text-sm"
              aria-expanded={moreOpen}
            >
              More
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-[calc(100%+0.5rem)] w-44 rounded-2xl border border-border bg-card p-2 shadow-lift">
                {desktopMoreLinks.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" onClick={() => setMoreOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-accent">
                    {l.label}
                  </a>
                ))}
                <a href={`tel:${PHONE_NUMBER}`} onClick={() => setMoreOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-accent">
                  Call: {PHONE_NUMBER}
                </a>
                <a href={`mailto:${EMAIL_ADDRESS}`} onClick={() => setMoreOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-accent">
                  Email: {EMAIL_ADDRESS}
                </a>
              </div>
            )}
          </div>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/contact" className="btn-brand hidden h-11 items-center gap-2 rounded-full px-6 text-sm font-bold sm:inline-flex">
            Get a Quote <ArrowUpRight size={16} />
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <div className="h-px w-full bg-linear-to-r from-transparent via-[#6a2ec0]/30 to-transparent" />
      {open && (
        <nav aria-label="Menu" className="grid grid-cols-2 gap-1 border-t border-border bg-card px-5 py-4 lg:hidden">
          {links.map((l) => (
            <Link key={l.label} to={l.to} {...('hash' in l ? { hash: l.hash } : {})} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold hover:bg-accent">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
