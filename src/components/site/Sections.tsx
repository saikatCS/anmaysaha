import { Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, Award, DraftingCompass, HardHat, Home, Layers3, Paintbrush, PenTool, Ruler, Sparkles, ArrowRight as ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from './Reveal';
import { images, credentials, journey, services } from '@/lib/portfolio';
import { useArtworks, useProjects, type Artwork, type Project } from '@/lib/remote-content';
import greenSiteAsset from '@/assets/green-constructions-site.png';
import portrait from '@/assets/portrait.png';
import card1 from '@/assets/card1.png';
import card2 from '@/assets/card2.png';
import card3 from '@/assets/card3.png';
import card4 from '@/assets/card4.png';
import card5 from '@/assets/card5.png';
import card6 from '@/assets/card6.png';

export const SectionIntro = ({ label, title, description }: { label: string; title: string; description?: string }) => (
  <div>
    <p className="eyebrow">{label}</p>
    <h2 className="mt-3 max-w-2xl text-3xl leading-tight font-semibold md:text-5xl">{title}</h2>
    {description && <p className="mt-5 max-w-xl leading-8 text-muted-foreground">{description}</p>}
  </div>
);

const icons = [DraftingCompass, Home, HardHat, Paintbrush, Ruler, Layers3, PenTool, Sparkles];
const cardImages = [card1, card2, card3, card4, card5, card6];

export function Trust() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-7 md:grid-cols-4 lg:px-8">
        {credentials.map((c, i) => (
          <div key={c} className="flex items-center gap-3 border-l-2 border-primary pl-4 text-xs font-semibold leading-5 md:text-sm">
            <span className="text-primary">0{i + 1}</span>{c}
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-2 lg:gap-24 lg:px-8">
        <Reveal className="relative">
          <div className="absolute -left-4 -top-4 h-full w-full border border-primary/35" />
          <img src={portrait} alt="Portrait representing Anmay Saha" loading="lazy" className="relative aspect-4/5 w-full object-cover" />
        </Reveal>
        <Reveal>
          <SectionIntro
            label="About me"
            title="Crafting Spaces with Passion & Precision."
            description="I'm Anmay Saha — a B.Tech Civil Engineer and M.Tech Engineer in Materials Science, an AMC-approved Building Planner and an Associate Member of the Institution of Engineers (India)."
          />
          <p className="mt-6 leading-8 text-muted-foreground">
            I run my work under anmayarts.com. As Proprietor of Green Constructions, a professionally managed firm offering comprehensive building planning, construction and interior design services, I bring a strong commitment to quality, structural integrity and sustainable design practices to every space.
          </p>
          <p className="script mt-7 text-4xl text-primary">Anmay Saha</p>
          <Button asChild variant="outline" className="mt-8 h-12 rounded-none px-7">
            <Link to="/about">
              Know More About Me <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative overflow-hidden bg-[#f7f6f1] pt-12 pb-16 md:pt-16 md:pb-20">
      {/* Light green and deep green subtle fine grid checkpoint lines background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.12]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #2c352b 1px, transparent 1px),
            linear-gradient(to bottom, #4f6f48 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />
      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-stone-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-600">Professional journey</span>
              <span className="h-px w-10 bg-stone-500" />
            </div>
            <h2 className="font-serif text-4xl leading-tight text-stone-900 md:text-6xl">
              A practice built on <span className="text-primary">purpose</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              Engineering, construction and creativity shape the way I approach each project.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {journey.map((item, i) => (
            <Reveal key={item.organization}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-stone-200/70 bg-white p-6 shadow-[0_10px_30px_rgba(64,67,52,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_38px_rgba(64,67,52,0.14)]">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      0{i + 1}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">PRESENT</span>
                  </div>
                  <h3 className="font-serif text-lg leading-tight text-stone-900 group-hover:text-primary transition-colors">{item.role}</h3>
                  <p className="mt-1.5 text-xs font-semibold text-primary">{item.organization}</p>
                  <p className="mt-3 text-xs leading-relaxed text-stone-500 sm:text-sm">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="relative bg-[#f7f6f1] pt-4 pb-16 md:pt-6 md:pb-20 overflow-hidden">
      {/* Light green and deep green subtle fine grid checkpoint lines background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.12]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #2c352b 1px, transparent 1px),
            linear-gradient(to bottom, #4f6f48 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <div className="mb-3 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-stone-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-600">WHAT I DO</span>
            <span className="h-px w-10 bg-stone-500" />
          </div>
          <h2 className="font-serif text-4xl leading-tight text-stone-900 md:text-6xl">
            Services That I <span className="text-primary">Offer</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            From concept to completion, I provide end-to-end solutions for better living spaces.
          </p>
        </div>

        <div className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => {
            const Icon = icons[i];
            const cardImg = cardImages[i];
            const numStr = `0${i + 1}`;
            const accent = i % 2 === 0 ? 'bg-primary' : 'bg-[#b6a16d]';
            return (
              <Reveal key={s.title}>
                <Link
                  to="/"
                  hash="contact"
                  className="group relative flex h-full min-h-50 max-h-55 overflow-hidden rounded-[24px] border border-stone-200/70 bg-white shadow-[0_10px_30px_rgba(64,67,52,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_38px_rgba(64,67,52,0.14)]"
                >
                  <div className="relative z-10 flex w-[59%] flex-col justify-between p-4 pr-1 sm:p-5 sm:pr-1">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${accent} text-white shadow-sm`}>
                        {Icon && <Icon size={16} strokeWidth={1.75} />}
                        </div>
                        <span className="text-xs font-medium tracking-widest text-stone-400">{numStr}</span>
                        <span className="h-px w-5 bg-stone-300" />
                      </div>

                      <h3 className="font-serif text-base leading-tight text-stone-900 transition-colors group-hover:text-primary sm:text-lg">{s.title}</h3>
                      <p className="mt-1.5 max-w-47.5 text-[11px] leading-relaxed text-stone-500 sm:text-xs">{s.description}</p>
                    </div>

                    <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-stone-900">
                      <span>Know More</span>
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full ${accent} text-white transition-transform duration-300 group-hover:translate-x-1`}>
                        <ArrowRightIcon size={10} />
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-y-0 right-0 w-[47%] overflow-hidden rounded-l-[50%] bg-stone-100 rounded-[52%_0_0_52%/50%_0_0_50%]">
                    <img src={cardImg} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-black/10 via-transparent to-transparent" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const steps = [
    ['01', 'Discover', 'Understand requirements, vision and project needs.'],
    ['02', 'Plan', 'Develop layouts, concepts and technical planning.'],
    ['03', 'Design', 'Refine functionality, aesthetics and details.'],
    ['04', 'Build', 'Coordinate execution, quality and construction.'],
    ['05', 'Deliver', 'Complete the project with attention to detail.'],
  ];

  return (
    <section className="relative overflow-hidden bg-[#233522] py-24 text-stone-100">
      {/* Decorative luxury gradient background effects matching the reference image */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(53,73,50,0.8),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(30,45,28,0.9),transparent_70%)] pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">The Approach</p>
          <h2 className="mt-3 font-serif text-4xl md:text-6xl text-stone-100 tracking-tight font-normal">
            From Concept to <span className="italic font-serif text-[#d4af37]">Completion</span>.
          </h2>
          <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-stone-300/90 font-light">
            A structured and thoughtful process that turns ideas into meaningful, well-crafted spaces.
          </p>
        </div>

        {/* Horizontal Connecting Timeline Line */}
        <div className="relative hidden lg:block mb-12">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#d4af37]/40 to-transparent -translate-y-1/2" />
        </div>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-6">
          {steps.map(([n, t, d], index) => (
            <Reveal key={n} className="relative flex flex-col">
              {/* Subtle top arched card container styled like the design reference */}
              <div className="group relative flex flex-col justify-between rounded-t-[120px] border border-white/10 bg-white/3 backdrop-blur-md p-6 pt-10 text-center transition-all duration-500 hover:border-[#d4af37]/40 hover:bg-white/6 hover:-translate-y-1 h-full min-h-80">
                
                {/* Node marker on top of card */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37]" />
                  <div className="absolute h-5 w-5 rounded-full border border-[#d4af37]/30 animate-ping opacity-30" />
                </div>

                <div>
                  <span className="font-serif text-3xl md:text-4xl text-[#d4af37] font-light block">{n}</span>
                  <div className="mx-auto my-3 h-px w-8 bg-[#d4af37]/40" />
                  <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-stone-200">{t}</h3>
                  <p className="mt-4 text-xs md:text-sm leading-relaxed text-stone-300/80 font-light">{d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectGrid({ items: given }: { items?: Project[] }) {
  const all = useProjects();
  const items = given ?? all;

  return (
    <div className="grid gap-7 md:grid-cols-2">
      {items.map((p, i) => (
        <Link to="/projects/$slug" params={{ slug: p.slug }} key={p.slug} className="group block min-w-0">
          <div className={`overflow-hidden bg-stone ${i % 3 === 0 ? 'aspect-5/4' : 'aspect-5/4'}`}>
            <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          </div>
          <div className="mt-5 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase text-primary">{p.category}</p>
              <h3 className="mt-2 text-2xl">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.location}</p>
            </div>
            <ArrowUpRight className="shrink-0 text-primary" />
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-stone py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionIntro label="Selected work" title="Some of My Recent Work" />
          <Button asChild variant="outline" className="rounded-none">
            <Link to="/projects">
              View All Projects <ArrowRight />
            </Link>
          </Button>
        </div>
        <ProjectGrid />
      </div>
    </section>
  );
}

export function EducationSection() {
  return (
    <section id="education" className="py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.15fr] lg:px-8">
        <SectionIntro label="Education & credentials" title="The Foundation Behind Every Space I Create." />
        <div className="border-t border-border">
          {credentials.map((c, i) => (
            <div key={c} className="flex gap-6 border-b border-border py-6">
              <span className="font-serif text-2xl text-primary">0{i + 1}</span>
              <h3 className="font-sans text-base font-semibold">{c}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AchievementsSection() {
  return (
    <section id="achievements" className="overflow-hidden bg-stone py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionIntro
          label="Recognition & milestones"
          title="A continuing journey."
          description="Professional qualifications and milestones that inform the work."
        />
      </div>
      <div className="achievement-window mt-12" aria-label="Qualifications gallery">
        <div className="achievement-track gap-5 px-5">
          {[...credentials, ...credentials].map((c, i) => (
            <div key={i} className="flex h-48 w-72 shrink-0 flex-col justify-between border border-border bg-card p-6 md:w-80">
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
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionIntro label="A visual perspective" title="Spaces, materials & moments." />
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[images.hero, images.interior, images.apartment, images.commercial].map((img, i) => (
            <div key={img} className="aspect-4/5 overflow-hidden bg-stone">
              <img
                src={img}
                alt={['Modern architecture', 'Interior detail', 'Residential architecture', 'Commercial architecture'][i]}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ArtGrid({ items: given }: { items?: Artwork[] }) {
  const all = useArtworks();
  const items = given ?? all;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((a, i) => (
        <Link
          key={a.slug}
          to="/artworks/$slug"
          params={{ slug: a.slug }}
          className={`group relative block overflow-hidden bg-stone ${i === 1 ? 'sm:mt-12' : ''}`}
        >
          <img src={a.image} alt={a.title} loading="lazy" className="aspect-3/4 w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-x-0 bottom-0 bg-ink/75 p-5 text-cream opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
            <h3 className="text-xl">{a.title}</h3>
            <p className="text-xs">{a.medium}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ArtSection() {
  return (
    <section id="artworks" className="py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionIntro label="Beyond engineering" title="Where Engineering Meets Creative Expression." />
          <Button asChild variant="outline" className="rounded-none">
            <Link to="/artworks">
              Explore My Artworks <ArrowRight />
            </Link>
          </Button>
        </div>
        <ArtGrid />
      </div>
    </section>
  );
}

export function GreenSection() {
  return (
    <section className="relative overflow-hidden bg-forest-deep py-20 text-cream">
      <img src={greenSiteAsset} alt="Construction site led by Green Constructions" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-forest-deep/70" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-center lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase text-gold">Green Constructions</p>
          <h2 className="mt-4 max-w-xl text-3xl md:text-5xl [text-shadow:0_2px_12px_rgba(26,26,26,0.45)]">Built with intention. Led with care.</h2>
          <p className="mt-5 text-sm text-cream/85 [text-shadow:0_1px_8px_rgba(26,26,26,0.45)]">Founder & Proprietor — Anmay Saha</p>
        </div>
        <Button asChild className="h-12 shrink-0 bg-cream px-7 text-forest-deep hover:bg-stone">
          <Link to="/green-constructions">
            Explore Green Constructions <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}