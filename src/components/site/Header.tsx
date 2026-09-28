import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Brand } from './Brand';
const links = [
  { label: 'Home', to: '/' }, { label: 'About', to: '/about' }, { label: 'Experience', to: '/', hash: 'experience' },
  { label: 'Services', to: '/', hash: 'services' }, { label: 'Projects', to: '/projects' }, { label: 'Education', to: '/', hash: 'education' },
  { label: 'Artworks', to: '/artworks' }, { label: 'Contact', to: '/contact' },
] as const;
export function Header() {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 12); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  return <header className={`sticky top-0 z-50 bg-card transition-shadow ${scrolled ? 'shadow-soft' : 'border-b border-border'}`}>
    <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:px-8 xl:grid-cols-[auto_minmax(0,1fr)_auto]">
      <Link to="/" onClick={() => setOpen(false)} className="min-w-0"><Brand /></Link>
      <nav aria-label="Main navigation" className="hidden items-center justify-center gap-5 xl:flex">{links.map(l => <Link key={l.label} to={l.to} {...("hash" in l ? { hash: l.hash } : {})} className="border-b-2 border-transparent py-2 text-xs font-semibold text-muted-foreground transition hover:text-primary" activeProps={{ className: 'border-primary text-primary' }}>{l.label}</Link>)}</nav>
      <div className="flex items-center gap-2"><Button asChild className="hidden rounded-full sm:inline-flex"><Link to="/contact">Get a Quote <ArrowUpRight /></Link></Button><Button variant="outline" size="icon" className="xl:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>
    </div>
    {open && <nav aria-label="Mobile navigation" className="grid grid-cols-2 gap-1 border-t border-border bg-card px-5 py-4 xl:hidden">{links.map(l => <Link key={l.label} to={l.to} {...("hash" in l ? { hash: l.hash } : {})} onClick={() => setOpen(false)} className="rounded px-3 py-3 text-sm font-semibold hover:bg-accent">{l.label}</Link>)}</nav>}
  </header>;
}
