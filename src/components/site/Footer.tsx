import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Facebook, Instagram, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Brand } from './Brand';
import { contact, services } from '@/lib/portfolio';

const FACEBOOK_URL = 'https://www.facebook.com/anmay.saha';
const INSTAGRAM_URL = 'https://www.instagram.com/anmaysaha';
const LINKEDIN_URL = 'https://www.linkedin.com/in/anmay-saha-390b491a5';
const YOUTUBE_URL = 'https://www.youtube.com/@anmayart';
const WEB_INNOVEX_URL = 'https://webinnovex360.online';

const PHONE_NUMBER = contact.phone || '7005102084';
const EMAIL_ADDRESS = contact.email || 'anmaysaha@gmail.com';
const EMAIL_SUBJECT = encodeURIComponent('Contact for Building Planning');
const EMAIL_BODY = encodeURIComponent(
  'Hello Er. Anmay Saha,\n\nI would like to discuss building planning and design services with you.\n\nBest regards,',
);

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/', hash: 'services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Artworks', to: '/artworks' },
  { label: 'Contact', to: '/contact' },
] as const;

const socials = [
  { label: 'Instagram', url: INSTAGRAM_URL, Icon: Instagram },
  { label: 'Facebook', url: FACEBOOK_URL, Icon: Facebook },
  { label: 'LinkedIn', url: LINKEDIN_URL, Icon: Linkedin },
  { label: 'YouTube', url: YOUTUBE_URL, Icon: Youtube },
];

export function Footer() {
  const mailHref = `mailto:${EMAIL_ADDRESS}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`;

  return (
    <footer className="font-montserrat bg-brand-deep text-white border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Brand tone="light" />
          <p className="mt-6 max-w-xs text-sm leading-7 text-white/75">
            Designing, planning and building spaces that balance purpose and expression.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {socials.map(({ label, url, Icon }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white/90 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/20 hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}

            <a
              href={`tel:${PHONE_NUMBER}`}
              aria-label={`Call ${PHONE_NUMBER}`}
              title={`Call ${PHONE_NUMBER}`}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white/90 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/20 hover:text-white"
            >
              <Phone size={18} />
            </a>

            <a
              href={mailHref}
              aria-label={`Email ${EMAIL_ADDRESS}`}
              title={`Email ${EMAIL_ADDRESS}`}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white/90 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/20 hover:text-white"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-white/90">Explore</h3>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {links.map((l) => (
              <Link
                className="text-sm text-white/70 transition hover:translate-x-0.5 hover:text-white"
                key={l.label}
                to={l.to}
                {...('hash' in l ? { hash: l.hash } : {})}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-white/90">Services</h3>
          <div className="mt-6 grid gap-3">
            {services.slice(0, 6).map((s) => (
              <Link
                className="text-sm text-white/70 transition hover:translate-x-0.5 hover:text-white"
                key={s.title}
                to="/"
                hash="services"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-white/90">Contact</h3>
          <p className="mt-6 flex items-start gap-3 text-sm leading-6 text-white/75">
            <MapPin size={17} className="mt-0.5 shrink-0 text-[#d9a6ee]" />
            <span>{contact.location}</span>
          </p>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="mt-4 flex items-center gap-3 text-sm text-white/85 transition hover:text-white"
          >
            <Phone size={17} className="shrink-0 text-[#d9a6ee]" />
            <span>{PHONE_NUMBER}</span>
          </a>
          <a
            href={mailHref}
            className="mt-4 flex items-center gap-3 text-sm text-white/85 transition hover:text-white"
          >
            <Mail size={17} className="shrink-0 text-[#d9a6ee]" />
            <span className="break-all">{EMAIL_ADDRESS}</span>
          </a>

          <Link
            to="/green-constructions"
            className="group mt-8 block border-t border-white/15 pt-6 text-sm font-semibold text-white transition hover:text-[#d9a6ee]"
          >
            <span>Green Constructions</span>
            <ArrowUpRight className="ml-1 inline h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="mt-1 block font-normal text-white/60">Founder &amp; Proprietor: Anmay Saha</span>
          </Link>

          <a
            href="https://cretoverse.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 block text-sm font-semibold text-white transition hover:text-[#d9a6ee]"
          >
            <span>Cretoverse</span>
            <ArrowUpRight className="ml-1 inline h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="mt-1 block font-normal text-white/60">Founder: Anmay Saha</span>
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-white/55 sm:flex-row lg:px-8">
          <span>© {new Date().getFullYear()} Anmay Art. All rights reserved.</span>
          <span className="text-center text-white/75">
            Design and Managed by{' '}
            <a
              href={WEB_INNOVEX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#d9a6ee] underline-offset-4 hover:underline"
            >
              Webinnovex360
            </a>
          </span>
          <span>Agartala, Tripura</span>
        </div>
      </div>
    </footer>
  );
}