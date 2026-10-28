import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Facebook, Instagram, Linkedin, Youtube, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Brand } from './Brand';
import { contact, services, socialLinks } from '@/lib/portfolio';

const links = [
  { label: 'Home', to: '/' }, { label: 'About', to: '/about' }, { label: 'Services', to: '/', hash: 'services' },
  { label: 'Projects', to: '/projects' }, { label: 'Artworks', to: '/artworks' }, { label: 'Contact', to: '/contact' },
] as const;
const socials = [
  { label: 'Instagram', url: socialLinks.instagram, Icon: Instagram }, { label: 'Facebook', url: socialLinks.facebook, Icon: Facebook },
  { label: 'LinkedIn', url: socialLinks.linkedin, Icon: Linkedin }, { label: 'YouTube', url: socialLinks.youtube, Icon: Youtube },
  { label: 'X', url: socialLinks.twitter, Icon: Twitter },
];

export function Footer() {
  return (
    <footer className="bg-brand-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Brand tone="light" />
          <p className="mt-6 max-w-xs text-sm leading-7 text-white/70">Designing, planning and building spaces that balance purpose and expression.</p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ label, url, Icon }) =>
              url ? (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/85 transition hover:bg-white/20"><Icon size={18} /></a>
              ) : (
                <span key={label} title={`${label} link coming soon`} aria-label={`${label} link coming soon`} className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/35"><Icon size={18} /></span>
              ),
            )}
          </div>
        </div>
        <div>
          <h3 className="font-sans text-sm font-bold text-white">Explore</h3>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {links.map((l) => <Link className="text-sm text-white/70 transition hover:text-white" key={l.label} to={l.to} {...('hash' in l ? { hash: l.hash } : {})}>{l.label}</Link>)}
          </div>
        </div>
        <div>
          <h3 className="font-sans text-sm font-bold text-white">Services</h3>
          <div className="mt-6 grid gap-3">
            {services.slice(0, 6).map((s) => <Link className="text-sm text-white/70 transition hover:text-white" key={s.title} to="/" hash="services">{s.title}</Link>)}
          </div>
        </div>
        <div>
          <h3 className="font-sans text-sm font-bold text-white">Contact</h3>
          <p className="mt-6 flex items-start gap-3 text-sm text-white/70"><MapPin size={17} className="mt-0.5 shrink-0 text-[#d9a6ee]" />{contact.location}</p>
          {contact.phone && <a href={`tel:${contact.phone}`} className="mt-4 flex gap-3 text-sm text-white/85"><Phone size={17} className="shrink-0 text-[#d9a6ee]" />{contact.phone}</a>}
          {contact.email && <a href={`mailto:${contact.email}`} className="mt-4 flex gap-3 text-sm text-white/85"><Mail size={17} className="shrink-0 text-[#d9a6ee]" />{contact.email}</a>}
          <Link to="/green-constructions" className="mt-8 block border-t border-white/15 pt-6 text-sm font-semibold">
            Green Constructions <ArrowUpRight className="inline h-4 w-4" />
            <span className="mt-1 block font-normal text-white/60">Founder & Proprietor: Anmay Saha</span>
          </Link>
          <a href="https://cretoverse.com" target="_blank" rel="noopener noreferrer" className="mt-5 block text-sm font-semibold">
            Cretoverse <ArrowUpRight className="inline h-4 w-4" />
            <span className="mt-1 block font-normal text-white/60">Founder: Anmay Saha</span>
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-5 py-6 text-xs text-white/55 lg:px-8">
          <span>© {new Date().getFullYear()} Anmay Art. All rights reserved.</span>
          <span>Agartala, Tripura</span>
        </div>
      </div>
    </footer>
  );
}
