// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { seo, personLd, websiteLd, businessLd, crumbs } from '@/lib/seo';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SiteLayout } from '@/components/site/Layout';
import {
  Trust,
  AboutSection,
  ServicesSection,
  ProcessSection,
  ProjectsSection,
  ArtSection,
  GreenSection,
} from '@/components/site/Sections';
import { ContactSection } from '@/components/site/ContactForm';
import { images } from '@/lib/portfolio';
import { MobileHome } from '@/components/mobile';
import portrait from '@/assets/portrait.png';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/')({
  head: () =>
    seo({
      path: '/',
      title: 'Anmay Saha | Civil Engineer, Building Planner & Construction Professional in Agartala, Tripura',
      description:
        'Anmay Saha is a Civil Engineer, Building Planner and Construction Professional based in Agartala, Tripura, working across building planning, construction, interior design and project execution.',
      jsonLd: [personLd, websiteLd],
    }),
  component: Home,
});

const roles = [
  "Civil Engineer",
  "Building Planner",
  "Construction Professional",
  "Founder of Green Constructions",
  "Founder of Cretoverse"
];

function Home() {
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

  return (
    <SiteLayout>
      <MobileHome />
      <div className="hidden md:block">
        <section className="relative overflow-hidden bg-background">
          <div aria-hidden className="hero-glow absolute inset-0" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-6 md:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-24 lg:pt-10">
            <div className="relative z-10">
              <p className="eyebrow">CIVIL ENGINEER &amp; BUILDING PLANNER</p>
              <div className="mt-3">
                <span className="text-[clamp(2.4rem,4.8vw,4.5rem)] font-serif leading-[1.04] text-ink block font-normal">
                  Hello! 
                </span>
                <h1 className="text-[clamp(2.4rem,4.8vw,4.5rem)] leading-[1.04] font-bold text-ink mt-1">
                  I'm <span className="text-brand">Anmay Saha</span>
                </h1>
              </div>

              {/* Typewriter Role Container */}
              <div className="mt-3 h-10 flex items-center">
                <p className="text-lg md:text-xl font-semibold text-brand tracking-wide">
                  {currentText}
                  <span className="inline-block w-0.5 h-5 ml-1 bg-brand animate-pulse align-middle" />
                </p>
              </div>

              <p className="mt-4 max-w-lg text-sm md:text-base leading-7 text-muted-foreground">
                Designing thoughtful spaces, planning with precision, and building with purpose.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/projects" className="btn-brand inline-flex h-12 items-center gap-2 rounded-full px-8 text-sm font-bold">
                  Explore my work <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn-ghost-brand inline-flex h-12 items-center gap-2 rounded-full px-8 text-sm font-bold">
                  Contact me <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl md:max-w-none">
              <div aria-hidden className="shape-slab bg-brand absolute inset-0 translate-x-3 translate-y-3" />
              <img
                src={portrait}
                alt="Anmay Saha"
                fetchPriority="high"
                className="shape-slab relative aspect-4/5 w-full object-cover object-top"
              />
              <div aria-hidden className="shape-triangle bg-brand-deep absolute -bottom-6 left-[-28px] h-24 w-24" />
              <div aria-hidden className="absolute -left-2 top-12 h-16 w-16 rounded-full border-[5px] border-[#a036c3]/35" />
              <Link
                to="/green-constructions"
                className="group absolute -bottom-6 left-14 rounded-2xl bg-white p-5 shadow-lift transition hover:-translate-y-0.5"
              >
                <span className="script block text-3xl text-primary">Anmay Saha</span>
                <span className="mt-1 block text-xs font-semibold leading-5 text-muted-foreground">
                  Founder &amp; Proprietor<br />
                  Green Constructions <ArrowUpRight className="inline h-3 w-3" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <Trust />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <ArtSection />
        <GreenSection />
        <ContactSection />
      </div>
    </SiteLayout>
  );
}