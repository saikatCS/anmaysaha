// cspell:ignore CRETOVERSE Anmay Saha Chowmohoni Agartala noscroll Unnati
import { useEffect, useRef, useState, type FormEvent, type TouchEvent } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Building2, Check, ChevronLeft, ChevronRight, Copy, DraftingCompass, HardHat, Home, Layers3, Leaf, MapPin, Menu, PenTool, Ruler, Share2, X, Phone, Mail, Award, Sparkles, ExternalLink, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type GreenProject } from '@/lib/green-constructions';
import { useGreenProjects } from '@/lib/remote-content';
import { contact } from '@/lib/portfolio';
import { greenContent as content } from '@/lib/green-content';
import siteAsset from '@/assets/green-constructions-site.png';
import logo from '@/assets/gc-logo-full.png';
import planningVisual from '@/assets/planning-visual.png';
import portrait from '@/assets/portrait.png';
import '@/styles/green-constructions-mobile.css';

const nav = [ ['HOME','home',Home], ['PROJECTS','projects',Building2], ['SERVICES','services',Layers3], ['PROCESS','process',DraftingCompass], ['CONTACT','contact',ArrowUpRight] ] as const;
const menu = [['HOME','home'],['ABOUT','about'],['SERVICES','services'],['PROJECTS','projects'],['PROCESS','process'],['FOUNDER','founder'],['CONTACT','contact']] as const;
const services = content.services.items.map((item, i) => ({ ...item, icon: [DraftingCompass, Building2, PenTool, HardHat][i] ?? DraftingCompass }));
const steps = content.process.steps;
const principles = content.why.items.map((item, i) => ({ ...item, Icon: [Ruler, PenTool, Layers3, DraftingCompass, Leaf][i] ?? Ruler }));
const Label = ({children}:{children:React.ReactNode}) => <p className="gcm-label text-center text-xs tracking-[0.22em] font-bold text-primary mb-2 uppercase font-sans">{children}</p>;

// Social Links for Green Constructions Footer
const INSTAGRAM_LINK = "https://www.instagram.com/anmayart.com";
const FACEBOOK_LINK = "https://www.facebook.com/";
const YOUTUBE_LINK = "https://www.youtube.com/";
const LINKEDIN_LINK = "https://www.linkedin.com/";
const WEB_INNOVEX = "https://webinnovex360.online";

// Contact Info
const EMAIL_ADDRESS = "anmaysaha@gmail.com";
const PHONE_NUMBER = "7005102084";
const EMAIL_SUBJECT = encodeURIComponent("Contact for Building Planning");
const EMAIL_BODY = encodeURIComponent("Hello Er. Anmay Saha,\n\nI would like to discuss building planning and design services with you.\n\nBest regards,");

export function GreenConstructionsMobile() {
  const [menuOpen,setMenuOpen] = useState(false);
  const [project,setProject] = useState<GreenProject | null>(null);
  const [lightbox,setLightbox] = useState<number | null>(null);
  const [index,setIndex] = useState(0);
  const [active,setActive] = useState('home');
  const [prepared,setPrepared] = useState('');
  const [copied,setCopied] = useState(false);
  const [showCallPopup, setShowCallPopup] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const projectRail = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touchStart = useRef<number | null>(null);
  const greenProjects = useGreenProjects();
  const gallery = project ? [...project.sections.flatMap(s=>s.images), ...(project.gallery ?? [])] : [];
  
  // Track scroll position for dynamic background checker/gradient line shift
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for section active tracking
  useEffect(()=>{
    const observer = new IntersectionObserver(entries => { 
      const found=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0]; 
      if(found) setActive(found.target.id); 
    },{rootMargin:'-30% 0px -55% 0px',threshold:0});
    nav.forEach(([,id])=>{const el=document.getElementById(`gcm-${id}`); if(el) observer.observe(el);});
    return ()=>observer.disconnect();
  },[]);

  // Scroll-reveal animations on sections and cards
  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('gcm-reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    const elements = document.querySelectorAll('.gcm-section, .gcm-service, .gcm-project-card, .gcm-step, .gcm-founder');
    elements.forEach(el => {
      el.classList.add('gcm-reveal-hidden');
      revealObserver.observe(el);
    });

    return () => revealObserver.disconnect();
  }, [greenProjects]);

  const processRef = useRef<HTMLDivElement>(null);
  const [processInView, setProcessInView] = useState(false);

  useEffect(() => {
    const el = processRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setProcessInView(entry?.isIntersecting ?? false);
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(()=>{
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if(!project && !menuOpen && lightbox===null && !showCallPopup) return;
    const old=document.body.style.overflow; document.body.style.overflow='hidden';
    const key=(e:KeyboardEvent)=>{
      if(e.key==='Escape'){ if(lightbox!==null)setLightbox(null);else if(project)setProject(null);else if(showCallPopup)setShowCallPopup(false);else setMenuOpen(false); }
      if(lightbox!==null && gallery.length){if(e.key==='ArrowRight')setLightbox((lightbox+1)%gallery.length);if(e.key==='ArrowLeft')setLightbox((lightbox-1+gallery.length)%gallery.length);}
      if(e.key==='Tab'){
        const root = lightbox!==null ? document.querySelector<HTMLElement>('.gcm-lightbox') : project ? dialog.current : showCallPopup ? document.querySelector<HTMLElement>('.gcm-call-modal') : document.querySelector<HTMLElement>('.gcm-menu');
        const items=root?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input,select,textarea');
        if(items?.length){const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}
      }
    };
    window.addEventListener('keydown',key);return ()=>{document.body.style.overflow=old;window.removeEventListener('keydown',key);};
  },[menuOpen,project,lightbox,gallery.length,showCallPopup]);

  useEffect(()=>{ if(project) dialog.current?.querySelector<HTMLElement>('button')?.focus(); else opener.current?.focus(); },[project]);

  function openProject(p:GreenProject, trigger:HTMLElement){opener.current=trigger;setProject(p);setLightbox(null);}
  function closeProject(){setProject(null);setLightbox(null);}
  function goTo(id:string){setMenuOpen(false);document.getElementById(`gcm-${id}`)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
  function prepare(e:FormEvent<HTMLFormElement>){e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const data=new FormData(form);const phone=String(data.get('phone')??'').replace(/\D/g,'');if(phone.length<7||phone.length>15){const field=form.querySelector<HTMLInputElement>('[name="phone"]');field?.setCustomValidity('Enter a phone number with 7 to 15 digits.');form.reportValidity();return;}setPrepared(`Green Constructions project enquiry\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\n${data.get('message')}`);setCopied(false);}
  async function copy(){try{await navigator.clipboard.writeText(prepared);setCopied(true);}catch{setCopied(false);}}
  async function share(){if(navigator.share)try{await navigator.share({title:'Green Constructions project enquiry',text:prepared});}catch{/* dismissed */}}
  function lightboxSwipe(e:TouchEvent){if(touchStart.current===null||lightbox===null||gallery.length<2)return;const end=e.changedTouches[0];if(!end)return;const delta=end.clientX-touchStart.current;if(Math.abs(delta)>45)setLightbox((lightbox+(delta<0?1:-1)+gallery.length)%gallery.length);touchStart.current=null;}

  return <div 
    className="gcm text-base relative" 
    id="gcm-home"
    style={{
      backgroundImage: `
        linear-gradient(to right, rgba(101, 136, 68, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(101, 136, 68, 0.04) 1px, transparent 1px),
        linear-gradient(135deg, rgba(134, 239, 172, 0.05) 0%, transparent 100%)
      `,
      backgroundSize: '32px 32px, 32px 32px, 100% 100%',
      backgroundPosition: `0px ${scrollY * 0.3}px, 0px ${scrollY * 0.3}px, 0 0`
    }}
  >
    <div 
      className="absolute inset-0 pointer-events-none -z-10 opacity-30"
      style={{
        backgroundImage: `radial-gradient(circle at ${50 + (scrollY % 100)}% ${scrollY * 0.2}px, rgba(134, 239, 172, 0.15) 0%, transparent 50%)`
      }}
    />

    {/* Increased Navbar Header Height and Larger 3-Line Hamburger Menu Icon */}
    <header className="gcm-header h-20 px-6 flex items-center justify-between border-b border-forest-deep/10 bg-cream/95 backdrop-blur">
      <a href="#gcm-home" className="gcm-brand flex items-center gap-2.5" aria-label="Green Constructions home" onClick={e=>{e.preventDefault();goTo('home');}}>
        <img className="gcm-logo h-10 w-10 object-contain" src={logo} alt="Green Constructions Logo" />
        <span className="font-serif font-bold text-sm leading-tight">GREEN<br/>CONSTRUCTIONS</span>
      </a>
      <Button variant="ghost" size="icon" className="gcm-icon h-12 w-12 rounded-full bg-forest-deep/5 hover:bg-forest-deep/10" aria-label="Open navigation" aria-expanded={menuOpen} onClick={()=>setMenuOpen(true)}>
        <Menu size={30} strokeWidth={2.2}/>
      </Button>
    </header>

    <main>
      {/* HERO SECTION MATCHING REFERENCE DESIGN */}
      <section className="gcm-hero relative text-center pt-8 pb-12 px-5 overflow-hidden flex flex-col justify-center items-center min-h-[85vh]" aria-labelledby="gcm-title">
        <img src={siteAsset} alt="Construction site visual supplied for Green Constructions" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover -z-20 brightness-40"/>
        <div className="absolute inset-0 bg-black/40 -z-10"/>
        
        <div className="gcm-hero-content z-10 w-full max-w-lg mx-auto flex flex-col items-center">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-emerald-400 mb-4">GREEN CONSTRUCTIONS AGARTALA</p>
          
          <h1 id="gcm-title" className="text-center font-serif text-[clamp(2.4rem,9vw,3.5rem)] leading-[1.08] font-bold text-white mb-4">
            BUILDING<br/>
            <span className="text-[#86efac] font-serif font-normal italic">WITH PURPOSE</span>
          </h1>

          <p className="text-center text-base md:text-lg text-white/95 font-light mb-8 leading-relaxed max-w-md">
            Planning spaces. Building structures.<br/>
            Creating places that last.
          </p>

          <p className="text-center text-sm text-white/90 leading-relaxed mb-8 max-w-sm">
            Green Constructions Agartala is a professional construction and real estate development company dedicated to building quality spaces for a better tomorrow. Our focus is on innovation, sustainability and people-centric construction.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-md justify-center mb-10">
            <Button onClick={()=>goTo('projects')} className="bg-[#658844] hover:bg-[#557238] text-white rounded-full px-6 py-4 text-sm font-bold tracking-wider uppercase shadow-lg transition-all">
              EXPLORE PROJECTS <ArrowRight size={16} className="ml-2"/>
            </Button>
            <Button variant="outline" onClick={()=>goTo('contact')} className="bg-transparent hover:bg-white/10 text-white border-white/40 rounded-full px-6 py-4 text-sm font-bold tracking-wider uppercase transition-all">
              ENQUIRE NOW <ArrowUpRight size={16} className="ml-2"/>
            </Button>
          </div>
        </div>

        {/* Floating Green Card at bottom of Hero matching reference image */}
        <div className="w-full max-w-md mx-auto rounded-3xl bg-[#25381e]/90 backdrop-blur-md border border-emerald-500/30 p-5 text-left text-white shadow-2xl flex items-center gap-4 z-10 mt-auto">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white p-2 shadow-md">
            <img src={logo} alt="Green Constructions Logo" className="h-full w-full object-contain"/>
          </div>
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-emerald-400 block uppercase">GREEN CONSTRUCTIONS</span>
            <strong className="text-base font-bold block text-white">AGARTALA</strong>
            <p className="text-sm text-stone-300 mt-0.5 leading-tight">Professional Construction Partner for a Better Tomorrow.</p>
          </div>
        </div>
      </section>

      {/* QUICK DISCIPLINES */}
      <div className="gcm-quick" aria-label="Core disciplines">
        {services.map(({title,icon:Icon},i)=>
          <a key={title} href="#gcm-services" className="gcm-quick-item">
            <Icon size={25} strokeWidth={1.4}/>
            <span>0{i+1}</span>
            <strong>{title}</strong>
            <ArrowUpRight size={16}/>
          </a>
        )}
      </div>

      {/* 1. ABOUT GREEN CONSTRUCTIONS */}
      <section className="gcm-section gcm-about text-center px-5 py-12" id="gcm-about">
        <Label>{content.about.label}</Label>
        <h3 className="text-center text-3xl md:text-4xl font-serif font-bold text-ink leading-snug mb-5">
          {content.about.title}<br/><em className="text-primary not-italic font-serif">{content.about.emphasis}</em>
        </h3>
        <div className="gcm-about-image shadow-xl rounded-3xl overflow-hidden my-6">
          <img src={siteAsset} alt="Construction activity at a building site" loading="lazy"/>
          <span className="backdrop-blur-md bg-black/40 px-3 py-1 rounded-full text-xs font-semibold text-white">AGARTALA · TRIPURA</span>
        </div>
        <div className="space-y-4 max-w-xl mx-auto text-left md:text-center text-base md:text-lg text-muted-foreground">
          {content.about.paragraphs.map(p => <p key={p} className="leading-relaxed">{p}</p>)}
        </div>
        <div className="mt-8 flex justify-center">
          <Button variant="ghost" className="gcm-text-button font-bold text-primary text-base" onClick={()=>goTo('founder')}>MEET THE FOUNDER <ArrowUpRight size={18}/></Button>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="gcm-section gcm-services text-center px-5 py-12 bg-gradient-to-b from-transparent via-stone-50/60 to-transparent" id="gcm-services">
        <Label>{content.services.label}</Label>
        
        {/* DESIGN. PLAN. BUILD. in ONE LINE */}
        <div className="my-3 overflow-x-auto whitespace-nowrap py-2 px-1">
          <div className="inline-flex items-center justify-center gap-2 sm:gap-4 px-6 py-3 rounded-full bg-white shadow-[0_8px_30px_rgba(44,53,43,0.08)] border border-stone-200/80 mx-auto">
            <span className="text-xs md:text-sm font-bold tracking-[0.25em] text-primary uppercase">DESIGN</span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
            <span className="text-xs md:text-sm font-bold tracking-[0.25em] text-primary uppercase">PLAN</span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
            <span className="text-xs md:text-sm font-bold tracking-[0.25em] text-primary uppercase">BUILD</span>
          </div>
        </div>

        <h3 className="text-center text-3xl md:text-4xl font-serif font-bold text-ink leading-snug mt-4 mb-4">
          {content.services.titleLines.map(line=><span key={line}>{line}<br/></span>)}
          <em className="text-primary not-italic font-serif">{content.services.emphasis}</em>
        </h3>
        <p className="gcm-intro text-center max-w-lg mx-auto text-base text-muted-foreground mb-8">{content.services.intro}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-3xl mx-auto text-left">
          {services.map(({title,copy,icon:Icon},i)=>
            <article 
              className="group relative overflow-hidden rounded-[32px] p-7 bg-white shadow-[0_12px_35px_rgba(44,53,43,0.08)] border border-stone-200/90 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(106,46,192,0.15)] hover:border-primary/50" 
              key={title}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-5">
                <span className="text-xs font-bold tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10">0{i+1} / 04</span>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white shadow-sm">
                  <Icon size={26} strokeWidth={1.5}/>
                </div>
              </div>

              <h3 className="text-xl font-serif font-bold text-ink mb-3 group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">{copy}</p>

              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <span className="text-xs font-bold text-primary tracking-wider uppercase">Explore Discipline</span>
                <Button variant="ghost" size="icon" aria-label={`Enquire about ${title}`} onClick={()=>goTo('contact')} className="rounded-full bg-stone-100 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <ArrowUpRight size={18}/>
                </Button>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* 3. PROJECTS SECTION */}
      <section className="gcm-projects text-center px-5 py-12" id="gcm-projects">
        <div className="gcm-section gcm-projects-head text-center mb-6">
          <Label>{content.projects.label}</Label>
          <h3 className="text-center text-3xl md:text-4xl font-serif font-bold text-ink leading-snug">
            PROJECTS<br/>THAT DEFINE<br/><em className="text-primary not-italic font-serif">{content.projects.emphasis}</em>
          </h3>
          <p className="max-w-md mx-auto text-base text-muted-foreground mt-3">{content.projects.intro}</p>
        </div>
        <div className="gcm-project-rail" ref={projectRail} onScroll={e=>{const rail=e.currentTarget;setIndex(Math.round(rail.scrollLeft / Math.max(1,rail.clientWidth-38)));}} aria-label="Selected projects, swipe to browse">
          {greenProjects.map((p,i)=>
            <article key={p.slug} className="gcm-project-card rounded-[32px] overflow-hidden shadow-xl bg-white border border-stone-200">
              <div className="gcm-project-art relative aspect-video overflow-hidden">
                {p.cover ? <img src={p.cover} alt={p.title} loading="lazy" className="w-full h-full object-cover"/> : <img src={planningVisual} alt="Architectural planning illustration" loading="lazy" className="w-full h-full object-cover"/>}
                <span className="gcm-art-index absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-bold">GC / 0{i+1}</span>
                {!p.cover && <span className="gcm-photo-note absolute bottom-2 inset-x-2 text-[11px] text-white/90 bg-black/50 p-1 rounded">ILLUSTRATIVE PLANNING VISUAL</span>}
              </div>
              <div className="gcm-project-info p-7 text-left">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">0{i+1} / 0{greenProjects.length} &nbsp;·&nbsp; {p.category}</span>
                <h3 className="text-2xl font-bold mt-1.5 mb-2.5 text-ink">{p.title}</h3>
                <p className="flex items-center gap-1.5 text-base text-muted-foreground mb-6"><MapPin size={16} className="text-primary"/>{p.location}</p>
                <Button onClick={e=>openProject(p,e.currentTarget)} className="gcm-view-project w-full justify-center rounded-2xl py-3.5 font-bold shadow-md">VIEW PROJECT <ArrowUpRight size={18}/></Button>
              </div>
            </article>
          )}
        </div>
        <div className="gcm-project-controls flex items-center justify-center gap-4 mt-5">
          <span className="text-sm font-bold text-muted-foreground">0{index+1} / 0{greenProjects.length}</span>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" className="rounded-full h-11 w-11" aria-label="Previous project" onClick={()=>projectRail.current?.scrollTo({left:Math.max(0,index-1)*(projectRail.current.clientWidth-38),behavior:'smooth'})}><ChevronLeft size={20}/></Button>
            <Button size="icon" variant="outline" className="rounded-full h-11 w-11" aria-label="Next project" onClick={()=>projectRail.current?.scrollTo({left:((index+1)%greenProjects.length)*(projectRail.current.clientWidth-38),behavior:'smooth'})}><ChevronRight size={20}/></Button>
          </div>
        </div>
      </section>

      {/* 4. PROCESS / OUR APPROACH SECTION WITH SMOOTH MEDIUM-SPEED SCROLL ANIMATION FROM LEFT & RIGHT */}
      <section ref={processRef} className="px-5 py-12 text-center overflow-hidden" id="gcm-process">
        <Label>Our Approach</Label>
        <h3 className="text-center text-3xl md:text-4xl font-serif font-bold text-ink leading-snug mb-6">
          From Concept<br/><em className="text-primary not-italic font-serif">to Completion.</em>
        </h3>
        <div className="gcm-timeline max-w-xl mx-auto space-y-4">
          {steps.map(({title,copy},i)=>{
            const isEven = i % 2 === 0;
            const animClass = processInView
              ? "translate-x-0 opacity-100"
              : isEven
              ? "-translate-x-full opacity-0"
              : "translate-x-full opacity-0";

            return (
              <article 
                key={title} 
                style={{ transitionDelay: `${i * 150}ms` }}
                className={`flex gap-4 p-6 rounded-3xl bg-white shadow-md border border-stone-200/80 items-start text-left transition-all duration-700 ease-out transform ${animClass}`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary font-bold text-base">0{i+1}</span>
                <div>
                  <h3 className="text-lg font-bold text-ink">{title}</h3>
                  <p className="text-base text-muted-foreground mt-1.5 leading-relaxed">{copy}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="px-5 py-12 text-center">
        <Label>{content.gallery.label}</Label>
        <h3 className="text-center text-3xl md:text-4xl font-serif font-bold text-ink leading-snug mb-5">
          {content.gallery.title}<br/><em className="text-primary not-italic font-serif">{content.gallery.emphasis}</em>
        </h3>
        <figure className="rounded-[32px] overflow-hidden shadow-xl border border-stone-200 bg-white p-3">
          <img src={siteAsset} loading="lazy" alt="Supplied construction site visual" className="w-full aspect-video object-cover rounded-2xl"/>
          <figcaption className="text-sm text-muted-foreground py-4 px-2">Green Constructions — supplied construction-site visual. Dedicated project galleries await original photography.</figcaption>
        </figure>
      </section>

      {/* REDESIGNED SKEUOMORPHIC MILESTONES SECTION */}
      <section className="px-5 py-16 text-center bg-gradient-to-b from-stone-100/50 via-stone-50 to-stone-100/50 my-8 rounded-[40px] border border-stone-200/60 shadow-inner">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-4">
          <Sparkles size={14} /> Proven Track Record
        </div>
        <Label>{content.milestone.label}</Label>
        <h3 className="text-center text-3xl md:text-4xl font-serif font-bold text-ink leading-snug mb-8">
          {content.milestone.title}<br/><em className="text-primary not-italic font-serif">{content.milestone.emphasis}</em>
        </h3>

        {/* Skeuomorphic Floating Badge Card for Since 2019 */}
        <div className="relative mx-auto max-w-sm rounded-[36px] bg-white p-8 shadow-[0_20px_50px_rgba(44,53,43,0.12)] border border-white mb-8 overflow-hidden transform transition-all hover:scale-105">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
            <Award size={32} strokeWidth={1.5} />
          </div>
          <span className="text-xs font-bold tracking-[0.25em] text-primary block uppercase mb-1">Established &amp; Active</span>
          <strong className="text-5xl font-serif font-bold text-ink block tracking-tight my-2">{content.milestone.since}</strong>
          <div className="h-1 w-16 bg-gold mx-auto my-3 rounded-full"></div>
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Excellence in Execution</p>
        </div>

        <div className="max-w-xl mx-auto rounded-3xl bg-white p-6 shadow-md border border-stone-200/80">
          <p className="text-base text-muted-foreground leading-relaxed">{content.milestone.detail}</p>
          <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-center gap-2 text-primary font-bold text-sm tracking-wide">
            <Building2 size={18} />
            <span>{content.milestone.disciplines}</span>
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION - Er. Anmay Saha forced into ONE LINE */}
      <section className="px-5 py-12 text-center" id="gcm-founder">
        <div className="max-w-sm mx-auto rounded-[32px] overflow-hidden shadow-2xl mb-6 border-4 border-white">
          <img src={portrait} alt="Portrait of Er. Anmay Saha" loading="lazy" className="w-full aspect-4/5 object-cover object-top"/>
        </div>
        <div className="px-0">
          <Label>{content.founder.label}</Label>
          <h3 className="text-center text-2xl md:text-3xl font-serif font-bold text-ink leading-snug whitespace-nowrap">
            Founder &amp; Proprietor:<br/><em className="text-primary not-italic font-serif">Er. Anmay Saha</em>
          </h3>
          <p className="font-semibold text-primary mt-3 text-base">{content.founder.role}<br/><span className="text-xs text-muted-foreground">{content.brand}</span></p>
          <div className="flex flex-wrap justify-center gap-2.5 my-5">
            {content.founder.credentials.map(c=><span key={c} className="bg-stone-100 text-stone-800 px-4 py-1.5 rounded-full text-xs font-semibold border border-stone-200">{c}</span>)}
          </div>
          <div className="flex justify-center gap-3.5 mt-6">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-6 py-3 text-xs font-bold shadow-md">VISIT ANMAY ART <ArrowUpRight size={16}/></Link>
            <a href="https://cretoverse.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white text-ink px-6 py-3 text-xs font-bold shadow-sm">CRETOVERSE <ArrowUpRight size={16}/></a>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US (Principles) */}
      <section className="px-5 py-12 text-center" id="gcm-why">
        <Label>{content.why.label}</Label>
        <h3 className="text-center text-3xl md:text-4xl font-serif font-bold text-ink leading-snug mb-7">
          {content.why.title}<br/><em className="text-primary not-italic font-serif">{content.why.emphasis}</em>
        </h3>
        <div className="max-w-xl mx-auto space-y-4 text-left">
          {principles.map(({title,copy,Icon},i)=>
            <article key={title} className="flex gap-4 p-6 rounded-[28px] bg-white shadow-md border border-stone-200/80 items-start">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary font-bold text-sm">0{i+1}</span>
              <div className="flex gap-4">
                <div className="text-primary shrink-0 mt-0.5">
                  <Icon size={26} strokeWidth={1.3}/>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink">{title}</h3>
                  <p className="text-base text-muted-foreground mt-1.5 leading-relaxed">{copy}</p>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* BUILT AROUND YOUR VISION SECTION */}
      <section className="relative overflow-hidden rounded-[36px] mx-5 my-10 p-9 text-center text-white shadow-2xl bg-[#25381e] border border-emerald-500/30">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-lg mx-auto">
          <Label><span className="text-emerald-400">BUILT AROUND YOUR VISION</span></Label>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4 leading-snug">
            BUILT WITH INTENTION.<br/>
            <em className="text-[#86efac] not-italic font-serif">DELIVERED WITH CARE.</em>
          </h3>
          <p className="text-sm md:text-base text-white/90 mb-8 leading-relaxed font-light">
            Clear communication, thoughtful planning and careful execution are at the heart of every project.
          </p>
          <Button onClick={()=>goTo('contact')} className="bg-white text-ink hover:bg-stone-100 rounded-full px-9 py-4 text-sm font-bold shadow-xl">START A PROJECT <ArrowRight size={18}/></Button>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="px-5 py-12 text-center" id="gcm-contact">
        <Label>{content.contact.label}</Label>
        <h3 className="text-center text-3xl md:text-4xl font-serif font-bold text-ink leading-snug mb-3">
          {content.contact.title}<br/><em className="text-primary not-italic font-serif">{content.contact.emphasis}</em>
        </h3>
        <p className="max-w-md mx-auto text-base text-muted-foreground mb-4">{content.contact.description}</p>
        <p className="flex items-center justify-center gap-2 text-base font-semibold text-primary mb-8"><MapPin size={18}/>{contact.location}</p>
        
        {prepared ? (
          <div className="p-7 rounded-[32px] bg-white shadow-2xl border border-stone-200 text-center" role="status">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <Check size={30}/>
            </div>
            <h3 className="text-2xl font-bold text-ink">Enquiry prepared.</h3>
            <p className="text-sm text-muted-foreground mt-1.5 mb-5">Your enquiry has not been sent or stored. Copy or share it with your preferred messaging app.</p>
            <pre className="bg-stone-50 p-5 rounded-2xl text-xs text-left overflow-x-auto border border-stone-200 font-mono mb-5">{prepared}</pre>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
              <Button onClick={copy} className="rounded-full py-3">{copied?'COPIED':'COPY ENQUIRY'} <Copy size={17}/></Button>
              {typeof navigator!=='undefined' && typeof navigator.share==='function' && <Button variant="outline" onClick={share} className="rounded-full py-3">SHARE ENQUIRY <Share2 size={17}/></Button>}
            </div>
            <Button variant="ghost" onClick={()=>setPrepared('')} className="text-sm">Write another <ArrowRight size={15}/></Button>
          </div>
        ) : (
          <form onSubmit={prepare} className="max-w-lg mx-auto bg-white p-7 md:p-10 rounded-[36px] shadow-2xl border border-stone-200 text-left space-y-5">
            <label className="block text-xs font-bold tracking-wider text-stone-700">FULL NAME<input name="name" placeholder="Your name" autoComplete="name" required className="mt-1.5 w-full h-13 rounded-2xl border border-stone-300 px-4 text-base focus:outline-none focus:border-primary"/></label>
            <label className="block text-xs font-bold tracking-wider text-stone-700">PHONE NUMBER<input name="phone" placeholder="Your number" type="tel" autoComplete="tel" required onInput={e=>e.currentTarget.setCustomValidity('')} className="mt-1.5 w-full h-13 rounded-2xl border border-stone-300 px-4 text-base focus:outline-none focus:border-primary"/></label>
            <label className="block text-xs font-bold tracking-wider text-stone-700">EMAIL ADDRESS<input name="email" placeholder="you@example.com" type="email" autoComplete="email" required className="mt-1.5 w-full h-13 rounded-2xl border border-stone-300 px-4 text-base focus:outline-none focus:border-primary"/></label>
            <label className="block text-xs font-bold tracking-wider text-stone-700">SELECT SERVICE<select name="service" required defaultValue="" className="mt-1.5 w-full h-13 rounded-2xl border border-stone-300 px-4 text-base focus:outline-none focus:border-primary bg-white"><option value="" disabled>Choose a service</option>{services.map(s=><option key={s.title}>{s.title}</option>)}<option>Other</option></select></label>
            <label className="block text-xs font-bold tracking-wider text-stone-700">MESSAGE<textarea name="message" rows={4} placeholder="Tell us about your project" required className="mt-1.5 w-full rounded-2xl border border-stone-300 p-4 text-base focus:outline-none focus:border-primary"/></label>
            <Button type="submit" className="w-full h-13 rounded-2xl font-bold text-base shadow-lg">PREPARE ENQUIRY <ArrowRight size={18}/></Button>
            <small className="block text-center text-xs text-muted-foreground mt-3">This form does not send or store information. Copy or share the prepared enquiry yourself.</small>
          </form>
        )}
      </section>
    </main>

    {/* FOOTER */}
    <footer className="bg-stone-900 px-5 pt-14 pb-28 text-cream text-center md:hidden">
      <img className="gcm-logo mx-auto mb-3" src={logo} alt="Green Constructions Logo"/>
      <strong className="text-xl font-bold block mb-1.5 text-white">GREEN CONSTRUCTIONS AGARTALA</strong>
      <p className="text-sm text-stone-400 max-w-xs mx-auto mb-3 leading-relaxed">Professional Construction Partner for a Better Tomorrow.</p>
      <span className="text-xs text-stone-500 block mb-6">{contact.location}</span>

      {/* Social Media & Direct Action Icons */}
      <div className="mt-4 mb-6 flex flex-wrap items-center justify-center gap-3.5">
        <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-primary hover:text-white shadow-md"><InstagramIcon size={22} /></a>
        <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-primary hover:text-white shadow-md"><FacebookIcon size={22} /></a>
        <a href={YOUTUBE_LINK} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-primary hover:text-white shadow-md"><YoutubeIcon size={22} /></a>
        <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-primary hover:text-white shadow-md"><LinkedinIcon size={22} /></a>
        <a href={`mailto:${EMAIL_ADDRESS}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`} aria-label="Email Er. Anmay Saha" className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-primary hover:text-white shadow-md"><Mail size={22} /></a>
        <button type="button" onClick={() => setShowCallPopup(true)} aria-label="Call Er. Anmay Saha" className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-primary hover:text-white shadow-md"><Phone size={22} /></button>
      </div>

      <div className="mt-5 pt-5 border-t border-white/15 flex justify-center">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-400 hover:underline">
          Visit Anmay Art <ArrowUpRight size={17}/>
        </Link>
      </div>

      {/* Centralized Copyright and Developed & Managed lines */}
      <div className="mt-5 pt-4 border-t border-white/10 flex flex-col items-center justify-center gap-1.5">
        <p className="text-xs text-cream/50">© 2026 Green Constructions. All Rights Reserved.</p>
        <p className="text-xs text-cream/70">
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
            <button type="button" onClick={() => setShowCallPopup(false)} className="flex-1 rounded-full border border-stone-300 py-2.5 text-sm font-semibold text-stone-700">Cancel</button>
            <a href={`tel:${PHONE_NUMBER}`} onClick={() => setShowCallPopup(false)} className="flex-1 rounded-full bg-primary py-2.5 text-sm font-semibold text-white shadow-md text-center inline-flex items-center justify-center">Proceed</a>
          </div>
        </div>
      </div>
    )}

    {/* BOTTOM NAV BAR */}
    <nav className="gcm-bottom" aria-label="Green Constructions quick navigation">
      <Button variant="ghost" className={active==='home'?'gcm-active':''} onClick={()=>goTo('home')} aria-label="Go to home"><Home size={21} strokeWidth={active==='home'?2:1.8}/><span>HOME</span></Button>
      <Button variant="ghost" className={active==='projects'?'gcm-active':''} onClick={()=>goTo('projects')} aria-label="Go to projects"><Building size={21} strokeWidth={active==='projects'?2:1.8}/><span>PROJECTS</span></Button>
      <Button variant="ghost" className={active==='services'?'gcm-active':''} onClick={()=>goTo('services')} aria-label="Go to services"><Layers3 size={21} strokeWidth={active==='services'?2:1.8}/><span>SERVICES</span></Button>
      <Button variant="ghost" className={active==='process'?'gcm-active':''} onClick={()=>goTo('process')} aria-label="Go to process"><DraftingCompass size={21} strokeWidth={active==='process'?2:1.8}/><span>PROCESS</span></Button>
      <Button variant="ghost" className={active==='contact'?'gcm-active':''} onClick={()=>goTo('contact')} aria-label="Go to contact"><ArrowUpRight size={21} strokeWidth={active==='contact'?2:1.8}/><span>CONTACT</span></Button>
    </nav>
    
    {/* NAVIGATION MENU OVERLAY WITH SMOOTH ANIMATED UPWARD LAYOUT AND HAMBURGER CALL/EMAIL BUTTONS */}
    {menuOpen && (
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-label="Navigation" 
        className="fixed inset-0 z-[100] flex flex-col justify-between bg-cream px-6 pt-5 pb-8 md:hidden overflow-y-auto animate-in fade-in slide-in-from-top duration-300"
      >
        <div>
          {/* Header */}
          <div className="flex h-12 shrink-0 items-center justify-between">
            <div className="flex items-center gap-2">
              <img className="h-9 w-9 object-contain" src={logo} alt="Logo" />
              <span className="font-serif text-sm font-bold tracking-wider text-ink leading-none">GREEN<br/>CONSTRUCTIONS</span>
            </div>
            <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-forest-deep/20 text-forest-deep">
              <X size={22} />
            </button>
          </div>

          {/* Quick Direct Action Call & Email Buttons inside Hamburger Menu */}
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <a 
              href={`tel:${PHONE_NUMBER}`} 
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-xs font-bold text-white shadow-sm"
            >
              <Phone size={16} /> Call Now
            </a>
            <a 
              href={`mailto:${EMAIL_ADDRESS}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`} 
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl border border-forest-deep/20 bg-white py-3 text-xs font-bold text-ink shadow-sm"
            >
              <Mail size={16} /> Email Us
            </a>
          </div>

          {/* Moved Upside Menu Links with Proper Line Spacing */}
          <nav aria-label="Mobile hamburger menu" className="mt-4 grid gap-1">
            {menu.map(([title, id], i) => (
              <button 
                key={id} 
                onClick={() => goTo(id)} 
                className="flex items-baseline justify-between w-full border-b border-forest-deep/10 py-3.5 text-left font-serif text-[1.8rem] leading-tight text-ink hover:text-primary transition-colors"
                style={{ animationDelay: `${50 + i * 30}ms` }}
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-sans text-xs font-semibold text-primary">0{i + 1}</span>
                  {title}
                </span>
                <ArrowUpRight size={18} className="text-primary opacity-60" />
              </button>
            ))}
          </nav>
        </div>

        {/* Lowered H3 Developer Branding inside Hamburger */}
        <div className="mt-6 pt-4 border-t border-forest-deep/15 text-center shrink-0">
          <h3 className="text-sm font-semibold tracking-wide text-ink">
            Developed and Managed by{" "}
            <a 
              href={WEB_INNOVEX} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              WebInnovex360 <ExternalLink size={13} />
            </a>
          </h3>
        </div>
      </div>
    )}
    
    {/* PROJECT CASE STUDY MODAL */}
    {project && <div className="gcm-case" ref={dialog} role="dialog" aria-modal="true" aria-label={`${project.title} project case study`}><header><span>GC / PROJECT 0{greenProjects.indexOf(project)+1}</span><Button variant="ghost" onClick={closeProject} aria-label="Close project"><X size={22}/></Button></header><div className="gcm-case-hero"><div className="gcm-grid-lines" aria-hidden="true"/><span>GREEN CONSTRUCTIONS / CASE STUDY</span><h2>{project.title}</h2><p>{project.category}<br/>{project.location}</p>{!project.cover && <small>ORIGINAL PROJECT PHOTOGRAPHY AWAITED</small>}</div><div className="gcm-case-overview"><Label>PROJECT OVERVIEW</Label><h3>{project.overview}</h3><p>{project.scope}</p></div>{project.sections.map(section=><section key={section.number} className="gcm-case-section"><span>{section.number} / {section.title}</span><h3>{section.title}</h3><p>{section.copy}</p>{section.images.length>0?<div className="gcm-case-images">{section.images.map(img=><Button key={img.src} variant="ghost" onClick={()=>setLightbox(gallery.findIndex(g=>g.src===img.src))} aria-label={`View ${img.alt}`}><img src={img.src} alt={img.alt} loading="lazy"/></Button>)}</div>:<div className="gcm-case-empty"><DraftingCompass size={27} strokeWidth={1}/><span>ORIGINAL {section.title.toUpperCase()} IMAGERY AWAITED</span></div>}</section>)}<section className="gcm-case-section"><span>06 / PROJECT GALLERY</span><h3>Project gallery</h3>{gallery.length?<div className="gcm-case-images">{gallery.map((img,i)=><Button variant="ghost" key={`${img.src}-${i}`} onClick={()=>setLightbox(i)} aria-label={`View ${img.alt}`}><img src={img.src} alt={img.alt} loading="lazy"/></Button>)}</div>:<p>Project-specific gallery photographs have not yet been supplied.</p>}</section><div className="gcm-case-next"><Button variant="ghost" onClick={()=>{const next=greenProjects.find(p=>p.slug!==project.slug);if(next){setProject(next);dialog.current?.scrollTo({top:0,behavior:'smooth'});}}}>NEXT PROJECT <ArrowDownRight/></Button><strong>{greenProjects.find(p=>p.slug!==project.slug)?.title}</strong><Button variant="outline" onClick={closeProject}>BACK TO PROJECTS <ArrowLeft/></Button></div></div>}
    
    {/* LIGHTBOX MODAL */}
    {lightbox!==null && gallery[lightbox] && <div className="gcm-lightbox" role="dialog" aria-modal="true" aria-label="Project image viewer" onTouchStart={e=>{touchStart.current=e.touches[0]?.clientX ?? null;}} onTouchEnd={lightboxSwipe}><Button variant="ghost" aria-label="Close image" onClick={()=>setLightbox(null)} className="gcm-lightbox-close"><X/></Button><img src={gallery[lightbox].src} alt={gallery[lightbox].alt}/><div className="gcm-lightbox-controls"><Button variant="ghost" aria-label="Previous image" onClick={()=>setLightbox((lightbox-1+gallery.length)%gallery.length)}><ChevronLeft/></Button><span>0{lightbox+1} / 0{gallery.length}</span><Button variant="ghost" aria-label="Next image" onClick={()=>setLightbox((lightbox+1)%gallery.length)}><ChevronRight/></Button></div></div>}
  </div>;
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