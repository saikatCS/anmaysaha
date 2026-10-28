// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { seo, personLd, websiteLd, businessLd, crumbs } from '@/lib/seo';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, Award, Briefcase, GraduationCap, Sparkles, Building, Layers, CheckCircle2 } from 'lucide-react';
import { SiteLayout, PageHero } from '@/components/site/Layout';
import { ExperienceSection, EducationSection } from '@/components/site/Sections';
import portrait from '@/assets/portrait.png';

export const Route = createFileRoute('/about')({
  head: () =>
    seo({
      path: '/about',
      title: 'About Anmay Saha | Civil Engineer & AMC Approved Building Planner, Agartala',
      description:
        'B.Tech Civil Engineer, M.Tech in Materials Science, AMC approved Building Planner and Associate Member of the Institution of Engineers (India), based in Agartala, Tripura.',
      type: 'profile',
      jsonLd: [personLd, crumbs([['Home', '/'], ['About', '/about']])],
    }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <div className="overflow-hidden bg-gradient-to-b from-cream via-white to-cream text-ink">
        {/* Enhanced Hero Section with Neumorphic/Skeuomorphic touches & Centered Mobile Layout */}
        <div className="relative pt-6 pb-12 md:pt-12 md:pb-20">
          <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <PageHero
            eyebrow="About Anmay"
            title="A considered approach to every space."
            subtitle="Civil Engineer · Building Planner · Construction Professional · Artist"
          />
        </div>
        
        {/* Story Section: Neumorphic card styling, Skeuomorphic depth, fully centered and responsive */}
        <section className="mx-auto max-w-7xl px-5 py-12 md:py-20 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            
            {/* Portrait Column with Skeuomorphic Layers & Floating Badge */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none flex justify-center">
              <div aria-hidden className="absolute -inset-4 rounded-[36px] bg-gradient-to-tr from-primary/30 to-brand/20 blur-xl opacity-70 animate-pulse" />
              <div className="relative w-full max-w-sm md:max-w-md rounded-[32px] p-3 bg-white shadow-[0_20px_50px_rgba(44,53,43,0.12)] border border-white/80">
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-[24px]">
                  <img
                    src={portrait}
                    alt="Portrait of Anmay Saha - Civil Engineer & Building Planner"
                    className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 backdrop-blur-md p-3.5 shadow-lg border border-white/50 text-center">
                    <p className="font-serif text-lg font-bold text-ink">Er. Anmay Saha</p>
                    <p className="text-xs font-semibold tracking-wider text-primary uppercase">Civil Engineer &amp; Planner</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Content Column */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">
                <Sparkles size={14} /> The Story &amp; Vision
              </div>
              
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-ink leading-tight">
                Engineering with <span className="text-primary italic">imagination.</span>
              </h2>
              
              <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground">
                I'm Anmay Saha — a B.Tech Civil Engineer and M.Tech Engineer in Materials Science, an AMC-approved Building Planner and an Associate Member of the Institution of Engineers (India). My work brings together engineering, planning, construction and an interest in art, approaching every space as both a technical challenge and an opportunity to make everyday life better.
              </p>
              
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                I run my businesses under anmayarts.com. As Proprietor of Green Constructions, a professionally managed firm offering comprehensive building planning, construction and interior design services, I bring a strong commitment to quality, structural integrity and sustainable design practices — listening carefully, planning responsibly and building with purpose.
              </p>

              {/* Business Venture Cards / Links with Skeuomorphic Depth */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Link
                  to="/green-constructions"
                  className="group relative flex items-center justify-between rounded-2xl bg-white p-4 shadow-[0_10px_25px_rgba(44,53,43,0.08)] border border-stone-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(106,46,192,0.15)] hover:border-primary/50 text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Building size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Founder &amp; Proprietor</p>
                      <p className="text-sm font-bold text-ink group-hover:text-primary">Green Constructions</p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <a
                  href="https://cretoverse.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between rounded-2xl bg-white p-4 shadow-[0_10px_25px_rgba(44,53,43,0.08)] border border-stone-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(106,46,192,0.15)] hover:border-primary/50 text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Layers size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Founder</p>
                      <p className="text-sm font-bold text-ink group-hover:text-primary">Cretoverse</p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* Experience & Education sections */}
        <div className="py-6">
          <ExperienceSection />
        </div>
        <div className="py-6">
          <EducationSection />
        </div>

        {/* Philosophy & Values Section with Skeuomorphic Soft Background */}
        <section className="relative my-12 bg-gradient-to-r from-stone-100 via-[#f4f2ee] to-stone-100 py-20 border-y border-stone-200/60">
          <div className="mx-auto max-w-5xl px-5 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">
              <CheckCircle2 size={14} /> Core Principles
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-ink">
              Purposeful planning. Thoughtful execution.
            </h2>
            <p className="mt-6 mx-auto max-w-3xl text-base md:text-lg leading-relaxed text-muted-foreground">
              Clarity, functionality and quality guide every decision. Whether the work is a building plan, a built space or an artwork, I believe the details should serve the whole.
            </p>
          </div>
        </section>

      </div>
    </SiteLayout>
  );
}