import { Link } from '@tanstack/react-router';
import {
  ArrowRight, ArrowUpRight, Award, Building2, DraftingCompass, GraduationCap, HardHat, Home, Layers3,
  Paintbrush, PenTool, Ruler, Sparkles, Users,
} from 'lucide-react';
import { images, credentials, journey, services } from '@/lib/portfolio';
import { greenProjects } from '@/lib/green-constructions';
import { useArtworks, useProjects, type Artwork, type Project } from '@/lib/remote-content';
import greenSiteAsset from '@/assets/green-constructions-site.png';
import portrait from '@/assets/portrait.png';
import card1 from '@/assets/card1.png';
import card2 from '@/assets/card2.png';
import card3 from '@/assets/card3.png';
import card4 from '@/assets/card4.png';
import card5 from '@/assets/card5.png';
import card6 from '@/assets/card6.png';

/* Placeholder text such as "Location to be confirmed" is never shown to visitors. */
const isTbc = (s?: string | null) => !s || /to be confirmed/i.test(s);
export const projectPlace = (p: { location?: string | null }) => (isTbc(p.location) ? 'Concept project' : (p.location as string));
export const artMedium = (a: { medium?: string | null }) => (isTbc(a.medium) ? '' : (a.medium as string));
export const projectYear = (p: { year?: string | null }) => (isTbc(p.year) ? '' : (p.year as string));

export const SectionIntro = ({ label, title, description, center = false }: { label: string; title: string; description?: string; center?: boolean }) => (
  <div className={center ? 'mx-auto text-center' : ''}>
    <p className="eyebrow">{label}</p>
    <h2 className={`mt-3 text-3xl leading-[1.1] md:text-[2.75rem] ${center ? 'mx-auto max-w-3xl' : 'max-w-2xl'}`}>{title}</h2>
    {description && <p className={`mt-5 max-w-xl text-base leading-8 text-muted-foreground ${center ? 'mx-auto' : ''}`}>{description}</p>}
  </div>
);

const serviceIcons = [DraftingCompass, Home, HardHat, Paintbrush, Ruler, Layers3, PenTool, Sparkles];
const serviceImages = [card1, card2, card3, card4, card5, card6];

const credentialCards = [
  { t: 'B.Tech', s: 'Civil Engineering', Icon: GraduationCap },
  { t: 'M.Tech', s: 'Materials Science', Icon: GraduationCap },
  { t: 'AMC Approved', s: 'Building Planner', Icon: Building2 },
  { t: 'Associate Member', s: 'Institution of Engineers (India)', Icon: Users },
];

/* ---------- Credential strip ---------- */
export function Trust() {
  return (
    <section aria-label="Qualifications" className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 md:grid-cols-4 lg:px-8">
        {credentialCards.map(({ t, s, Icon }) => (
          <div key={t} className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand shadow-[0_10px_22px_-12px_rgba(106,46,192,0.9)]"><Icon size={22} strokeWidth={1.7} /></span>
            <div className="min-w-0 leading-tight">
              <p className="font-serif text-base font-semibold">{t}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{s}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- About ---------- */
export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-[0.85fr_1.15fr] lg:gap-24 lg:px-8">
        <div className="relative mx-auto w-full max-w-md">
          <div aria-hidden className="absolute -bottom-5 -left-5 h-full w-full rounded-[28px] bg-brand opacity-90" />
          <img src={portrait} alt="Portrait of Anmay Saha" loading="lazy" className="relative aspect-4/5 w-full rounded-[28px] object-cover object-top shadow-soft" />
        </div>
        <div>
          <SectionIntro
            label="About me"
            title="Engineer by training. Builder by practice."
            description="I'm Anmay Saha, a B.Tech Civil Engineer with an M.Tech in Materials Science, an AMC-approved Building Planner and an Associate Member of the Institution of Engineers (India)."
          />
          <p className="mt-6 max-w-xl leading-8 text-muted-foreground">
            As Proprietor of Green Constructions, I lead a firm that offers building planning, construction and interior design, with a steady focus on quality, structural integrity and sustainable design.
          </p>
          <ul id="education" aria-label="Education and credentials" className="mt-8 grid gap-3 sm:grid-cols-2">
            {credentials.map((c) => (
              <li key={c} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm font-semibold leading-6">
                <Award size={20} strokeWidth={1.7} className="mt-0.5 shrink-0 text-primary" />{c}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link to="/about" className="btn-brand inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-bold">Read my story <ArrowRight size={16} /></Link>
            <Link to="/green-constructions" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">Green Constructions <ArrowUpRight size={16} /></Link>
            <a href="https://cretoverse.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">Cretoverse <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Journey (used on the About page) ---------- */
export function ExperienceSection() {
  return (
    <section id="experience" className="relative overflow-hidden bg-stone py-20 md:py-24">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-70 [mask-image:radial-gradient(70%_70%_at_50%_30%,black,transparent)]" />
      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <SectionIntro center label="Professional journey" title="A practice built on purpose." description="Engineering, construction and creativity shape the way I approach each project." />
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {journey.map((item) => (
            <li key={item.organization} className="card-lift relative flex flex-col rounded-3xl border border-border bg-card p-7">
              <span aria-hidden className="absolute inset-x-7 top-0 h-1 rounded-b-full bg-brand" />
              <h3 className="font-serif text-lg leading-snug">{item.role}</h3>
              <p className="mt-2 text-sm font-semibold text-primary">{item.organization}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
export function ServicesSection() {
  const extra = services.slice(6);
  return (
    <section id="services" className="bg-stone py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionIntro center label="What I do" title="From first sketch to final handover." description="End-to-end planning, design and construction support for homes and commercial spaces." />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => {
            const Icon = serviceIcons[i] ?? DraftingCompass;
            return (
              <Link key={s.title} to="/" hash="contact" className="card-lift group flex min-h-52 flex-col justify-between rounded-3xl border border-border bg-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand"><Icon size={22} strokeWidth={1.7} /></span>
                  <img src={serviceImages[i]} alt="" loading="lazy" className="h-24 w-24 rounded-2xl object-cover" />
                </div>
                <div className="mt-6">
                  <h3 className="font-serif text-xl leading-snug">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{s.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">Discuss this service <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            );
          })}
        </div>
        {extra.length > 0 && (
          <p className="mt-8 text-center text-sm leading-7 text-muted-foreground">
            Also available: {extra.map((s) => s.title).join(' and ')}.
          </p>
        )}
      </div>
    </section>
  );
}

/* ---------- Process (a true sequence, so numbered) ---------- */
export function ProcessSection() {
  const steps = [
    ['Discover', 'Understand requirements, vision and project needs.'],
    ['Plan', 'Develop layouts, concepts and technical planning.'],
    ['Design', 'Refine functionality, aesthetics and details.'],
    ['Build', 'Coordinate execution, quality and construction.'],
    ['Deliver', 'Complete the project with attention to detail.'],
  ];
  return (
    <section className="relative overflow-hidden bg-brand-deep py-20 text-white md:py-28">
      <div aria-hidden className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#a036c3]/25 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-[#2b2bb0]/40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-sm font-bold text-[#d9a6ee]">How I work</p>
        <h2 className="mt-3 max-w-2xl text-3xl leading-[1.1] md:text-[2.75rem]">From concept to completion.</h2>
        <p className="mt-5 max-w-xl leading-8 text-white/70">A structured process that turns ideas into well-crafted, lasting spaces.</p>
        <ol className="mt-14 grid gap-8 md:grid-cols-5 md:gap-5">
          {steps.map(([t, d], i) => (
            <li key={t} className="relative md:pt-10">
              <span aria-hidden className="absolute left-0 top-0 hidden h-px w-full bg-white/20 md:block" />
              <span aria-hidden className="absolute left-0 top-[-5px] hidden h-[11px] w-[11px] rounded-full bg-brand-light ring-4 ring-[#1b1363] md:block" />
              <span className="font-serif text-3xl font-semibold text-brand-light">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 font-sans text-base font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-7 text-white/70">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
export function ProjectGrid({ items: given, limit }: { items?: Project[]; limit?: number }) {
  const all = useProjects();
  const list = given ?? all;
  const items = limit ? list.slice(0, limit) : list;
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {items.map((p) => (
        <Link to="/projects/$slug" params={{ slug: p.slug }} key={p.slug} className="group block min-w-0">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-stone shadow-soft">
            <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-primary shadow-sm">{p.category}</span>
          </div>
          <div className="mt-5 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-2xl leading-tight">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{projectPlace(p)}</p>
            </div>
            <span className="btn-ghost-brand grid h-11 w-11 shrink-0 place-items-center rounded-full transition group-hover:bg-brand group-hover:text-white"><ArrowUpRight size={19} /></span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionIntro label="Selected work" title="Some of my recent work." />
          <Link to="/projects" className="btn-ghost-brand inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-bold">View all projects <ArrowRight size={16} /></Link>
        </div>
        <ProjectGrid limit={4} />
      </div>
    </section>
  );
}

/* ---------- Education (used on the About page) ---------- */
export function EducationSection() {
  return (
    <section id="education" className="py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.15fr] lg:px-8">
        <SectionIntro label="Education & credentials" title="The foundation behind every space I create." />
        <ul className="border-t border-border">
          {credentials.map((c) => (
            <li key={c} className="flex items-center gap-5 border-b border-border py-6">
              <Award className="shrink-0 text-primary" size={26} strokeWidth={1.5} />
              <h3 className="font-sans text-base font-semibold">{c}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AchievementsSection() {
  return (
    <section id="achievements" className="overflow-hidden bg-stone py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionIntro label="Recognition & milestones" title="A continuing journey." description="Professional qualifications and milestones that inform the work." />
      </div>
      <div className="achievement-window mt-12" aria-label="Qualifications gallery">
        <div className="achievement-track gap-5 px-5">
          {[...credentials, ...credentials].map((c, i) => (
            <div key={i} className="flex h-48 w-72 shrink-0 flex-col justify-between rounded-3xl border border-border bg-card p-6 md:w-80">
              <Award className="text-primary" size={28} strokeWidth={1.5} />
              <p className="font-serif text-xl leading-snug">{c}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VisualTransition() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionIntro label="A visual perspective" title="Spaces, materials & moments." />
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[images.hero, images.interior, images.apartment, images.commercial].map((img, i) => (
            <div key={img} className="aspect-4/5 overflow-hidden rounded-2xl bg-stone">
              <img src={img} alt={['Modern architecture', 'Interior detail', 'Residential architecture', 'Commercial architecture'][i]} loading="lazy" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Artworks ---------- */
export function ArtGrid({ items: given }: { items?: Artwork[] }) {
  const all = useArtworks();
  const items = given ?? all;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((a) => (
        <Link key={a.slug} to="/artworks/$slug" params={{ slug: a.slug }} className="group block">
          <div className="overflow-hidden rounded-3xl bg-stone shadow-soft">
            <img src={a.image} alt={a.title} loading="lazy" className="aspect-4/5 w-full object-cover transition duration-700 group-hover:scale-105" />
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-xl leading-tight">{a.title}</h3>
              {artMedium(a) && <p className="mt-1 text-sm text-muted-foreground">{artMedium(a)}</p>}
            </div>
            <ArrowUpRight className="shrink-0 text-primary" size={20} />
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ArtSection() {
  return (
    <section id="artworks" className="bg-stone py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionIntro label="Beyond engineering" title="Where engineering meets creative expression." />
          <Link to="/artworks" className="btn-ghost-brand inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-bold">Explore my artworks <ArrowRight size={16} /></Link>
        </div>
        <ArtGrid />
      </div>
    </section>
  );
}

/* ---------- Green Constructions teaser ---------- */
export function GreenSection() {
  const built = greenProjects.slice(0, 2);
  return (
    <section className="relative isolate overflow-hidden py-20 text-white md:py-24">
      <img src={greenSiteAsset} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-[#0f0b2e]/95 via-[#1b1363]/90 to-[#2b2bb0]/75" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <p className="text-sm font-bold text-[#d9a6ee]">Green Constructions</p>
          <h2 className="mt-4 max-w-xl text-3xl leading-[1.1] md:text-5xl">Built with intention. Led with care.</h2>
          <p className="mt-5 text-sm text-white/80">Founder &amp; Proprietor: Anmay Saha</p>
          <Link to="/green-constructions" className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-[#1b1363] transition hover:bg-[#f2f0fa]">
            Explore Green Constructions <ArrowRight size={16} />
          </Link>
        </div>
        <ul className="grid gap-3" aria-label="Built projects">
          {built.map((p) => (
            <li key={p.slug} className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
              <p className="font-serif text-lg font-semibold">{p.title}</p>
              <p className="mt-1 text-sm text-white/80">{p.category}</p>
              <p className="mt-1 text-sm text-white/65">{p.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
