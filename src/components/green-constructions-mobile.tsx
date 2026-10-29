import { useEffect, useRef, useState, type FormEvent, type TouchEvent } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Building2, Check, ChevronLeft, ChevronRight, Copy, DraftingCompass, HardHat, Home, Layers3, Leaf, MapPin, Menu, PenTool, Ruler, Share2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type GreenProject } from '@/lib/green-constructions';
import { useGreenProjects } from '@/lib/remote-content';
import { contact } from '@/lib/portfolio';
import { greenContent as content } from '@/lib/green-content';
import { GreenEcosystemLinks } from '@/components/green-ecosystem-links';
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
const Label = ({children}:{children:React.ReactNode}) => <p className="gcm-label text-center text-sm tracking-[0.2em] font-bold text-primary mb-2">{children}</p>;

export function GreenConstructionsMobile() {
  const [menuOpen,setMenuOpen] = useState(false);
  const [project,setProject] = useState<GreenProject | null>(null);
  const [lightbox,setLightbox] = useState<number | null>(null);
  const [index,setIndex] = useState(0);
  const [active,setActive] = useState('home');
  const [prepared,setPrepared] = useState('');
  const [copied,setCopied] = useState(false);
  const projectRail = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touchStart = useRef<number | null>(null);
  const greenProjects = useGreenProjects();
  const gallery = project ? [...project.sections.flatMap(s=>s.images), ...(project.gallery ?? [])] : [];
  
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

  useEffect(()=>{
    if(!project && !menuOpen && lightbox===null) return;
    const old=document.body.style.overflow; document.body.style.overflow='hidden';
    const key=(e:KeyboardEvent)=>{
      if(e.key==='Escape'){ if(lightbox!==null)setLightbox(null);else if(project)setProject(null);else setMenuOpen(false); }
      if(lightbox!==null && gallery.length){if(e.key==='ArrowRight')setLightbox((lightbox+1)%gallery.length);if(e.key==='ArrowLeft')setLightbox((lightbox-1+gallery.length)%gallery.length);}
      if(e.key==='Tab'){
        const root = lightbox!==null ? document.querySelector<HTMLElement>('.gcm-lightbox') : project ? dialog.current : document.querySelector<HTMLElement>('.gcm-menu');
        const items=root?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input,select,textarea');
        if(items?.length){const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}
      }
    };
    window.addEventListener('keydown',key);return ()=>{document.body.style.overflow=old;window.removeEventListener('keydown',key);};
  },[menuOpen,project,lightbox,gallery.length]);

  useEffect(()=>{ if(project) dialog.current?.querySelector<HTMLElement>('button')?.focus(); else opener.current?.focus(); },[project]);
  useEffect(()=>{if(menuOpen)document.querySelector<HTMLElement>('.gcm-menu-head button')?.focus();},[menuOpen]);

  function openProject(p:GreenProject, trigger:HTMLElement){opener.current=trigger;setProject(p);setLightbox(null);}
  function closeProject(){setProject(null);setLightbox(null);}
  function goTo(id:string){setMenuOpen(false);document.getElementById(`gcm-${id}`)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
  function prepare(e:FormEvent<HTMLFormElement>){e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const data=new FormData(form);const phone=String(data.get('phone')??'').replace(/\D/g,'');if(phone.length<7||phone.length>15){const field=form.querySelector<HTMLInputElement>('[name="phone"]');field?.setCustomValidity('Enter a phone number with 7 to 15 digits.');form.reportValidity();return;}setPrepared(`Green Constructions project enquiry\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\n${data.get('message')}`);setCopied(false);}
  async function copy(){try{await navigator.clipboard.writeText(prepared);setCopied(true);}catch{setCopied(false);}}
  async function share(){if(navigator.share)try{await navigator.share({title:'Green Constructions project enquiry',text:prepared});}catch{/* dismissed */}}
  function lightboxSwipe(e:TouchEvent){if(touchStart.current===null||lightbox===null||gallery.length<2)return;const end=e.changedTouches[0];if(!end)return;const delta=end.clientX-touchStart.current;if(Math.abs(delta)>45)setLightbox((lightbox+(delta<0?1:-1)+gallery.length)%gallery.length);touchStart.current=null;}

  return <div className="gcm" id="gcm-home">
    <header className="gcm-header"><a href="#gcm-home" className="gcm-brand" aria-label="Green Constructions home" onClick={e=>{e.preventDefault();goTo('home');}}><img className="gcm-logo" src={logo} alt="Green Constructions Logo" /><span>GREEN<br/>CONSTRUCTIONS</span></a><Button variant="ghost" size="icon" className="gcm-icon" aria-label="Open navigation" aria-expanded={menuOpen} onClick={()=>setMenuOpen(true)}><Menu size={25}/></Button></header>
    <main>
      {/* HERO SECTION - Green Construction Agartala shifted upward with tighter spacing and increased heading size */}
      <section className="gcm-hero text-center -mt-3 pt-4 pb-8" aria-labelledby="gcm-title">
        <img src={siteAsset} alt="Construction site visual supplied for Green Constructions" fetchPriority="high" className="gcm-hero-photo"/>
        <div className="gcm-hero-shade"/>
        <div className="gcm-hero-content px-4">
          <Label>{content.hero.label}</Label>
          <h1 id="gcm-title" className="text-center text-3xl md:text-4xl font-serif font-bold tracking-tight leading-snug mb-3">
            {content.hero.title}<br/><em className="text-primary not-italic font-serif">{content.hero.emphasis}</em>
          </h1>
          <p className="gcm-hero-lead text-center text-base font-medium mb-2">{content.hero.lead}</p>
          <p className="gcm-hero-desc text-center text-xs opacity-90 mb-5">{content.hero.description}</p>
          <div className="gcm-hero-actions justify-center gap-3">
            <Button onClick={()=>goTo('projects')} className="rounded-full px-6 py-3 font-bold text-xs">EXPLORE PROJECTS <ArrowRight size={15}/></Button>
            <Button variant="outline" onClick={()=>goTo('contact')} className="rounded-full px-6 py-3 font-bold text-xs bg-white/10 text-white border-white/30">START A PROJECT <ArrowUpRight size={15}/></Button>
          </div>
        </div>
        <div className="gcm-founder-float">
          <img className="gcm-logo" src={logo} alt="Green Constructions Logo"/>
          <div><strong>ER. ANMAY SAHA</strong><small>Founder & Proprietor<br/>Civil Engineer · Building Planner<br/>Construction Professional</small></div>
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

      {/* 1. ABOUT GREEN CONSTRUCTIONS (Increased Heading Size & Centered UI) */}
      <section className="gcm-section gcm-about text-center px-5 py-10" id="gcm-about">
        <Label>{content.about.label}</Label>
        <h2 className="text-center text-2xl md:text-3xl font-serif font-bold text-ink leading-snug mb-5">
          {content.about.title}<br/><em className="text-primary not-italic">{content.about.emphasis}</em>
        </h2>
        <div className="gcm-about-image shadow-xl rounded-3xl overflow-hidden my-5">
          <img src={siteAsset} alt="Construction activity at a building site" loading="lazy"/>
          <span className="backdrop-blur-md bg-black/40 px-3 py-1 rounded-full text-xs font-semibold text-white">AGARTALA · TRIPURA</span>
        </div>
        <div className="space-y-4 max-w-xl mx-auto text-left md:text-center text-sm md:text-base text-muted-foreground">
          {content.about.paragraphs.map(p => <p key={p} className="leading-relaxed">{p}</p>)}
        </div>
        <div className="mt-6 flex justify-center">
          <Button variant="ghost" className="gcm-text-button font-bold text-primary" onClick={()=>goTo('founder')}>MEET THE FOUNDER <ArrowUpRight size={16}/></Button>
        </div>
      </section>

      {/* 2. SERVICES SECTION (Increased Heading Size & Centered UI) */}
      <section className="gcm-section gcm-services text-center px-5 py-10" id="gcm-services">
        <Label>{content.services.label}</Label>
        <h2 className="text-center text-2xl md:text-3xl font-serif font-bold text-ink leading-snug mb-3">
          {content.services.titleLines.map(line=><span key={line}>{line}<br/></span>)}
          <em className="text-primary not-italic">{content.services.emphasis}</em>
        </h2>
        <p className="gcm-intro text-center max-w-lg mx-auto text-sm text-muted-foreground mb-6">{content.services.intro}</p>
        <div className="gcm-service-grid mt-6">
          {services.map(({title,copy,icon:Icon},i)=>
            <article className="gcm-service rounded-3xl p-6 bg-white shadow-md border border-stone-100 transition-all duration-300 hover:shadow-xl" key={title}>
              <div className="gcm-service-top flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-primary">0{i+1} / 04</span>
                <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                  <Icon size={24} strokeWidth={1.5}/>
                </div>
              </div>
              <h3 className="text-lg font-bold text-left md:text-center mb-2 text-ink">{title}</h3>
              <p className="text-sm text-muted-foreground text-left md:text-center mb-4 leading-relaxed">{copy}</p>
              <div className="flex justify-end md:justify-center">
                <Button variant="ghost" size="icon" aria-label={`Enquire about ${title}`} onClick={()=>goTo('contact')} className="rounded-full bg-stone-50 hover:bg-primary hover:text-white transition-colors">
                  <ArrowUpRight size={18}/>
                </Button>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* 3. PROJECTS SECTION (Increased Heading Size & Centered UI) */}
      <section className="gcm-projects text-center px-5 py-10" id="gcm-projects">
        <div className="gcm-section gcm-projects-head text-center mb-6">
          <Label>{content.projects.label}</Label>
          <h2 className="text-center text-2xl md:text-3xl font-serif font-bold text-ink leading-snug">
            PROJECTS<br/>THAT DEFINE<br/><em className="text-primary not-italic">{content.projects.emphasis}</em>
          </h2>
          <p className="max-w-md mx-auto text-sm text-muted-foreground mt-2">{content.projects.intro}</p>
        </div>
        <div className="gcm-project-rail" ref={projectRail} onScroll={e=>{const rail=e.currentTarget;setIndex(Math.round(rail.scrollLeft / Math.max(1,rail.clientWidth-38)));}} aria-label="Selected projects, swipe to browse">
          {greenProjects.map((p,i)=>
            <article key={p.slug} className="gcm-project-card rounded-[32px] overflow-hidden shadow-lg bg-white border border-stone-200">
              <div className="gcm-project-art relative aspect-video overflow-hidden">
                {p.cover ? <img src={p.cover} alt={p.title} loading="lazy" className="w-full h-full object-cover"/> : <img src={planningVisual} alt="Architectural planning illustration" loading="lazy" className="w-full h-full object-cover"/>}
                <span className="gcm-art-index absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-full font-bold">GC / 0{i+1}</span>
                {!p.cover && <span className="gcm-photo-note absolute bottom-2 inset-x-2 text-[10px] text-white/90 bg-black/50 p-1 rounded">ILLUSTRATIVE PLANNING VISUAL</span>}
              </div>
              <div className="gcm-project-info p-6 text-left">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">0{i+1} / 0{greenProjects.length} &nbsp;·&nbsp; {p.category}</span>
                <h3 className="text-xl font-bold mt-1 mb-2 text-ink">{p.title}</h3>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground mb-5"><MapPin size={15} className="text-primary"/>{p.location}</p>
                <Button onClick={e=>openProject(p,e.currentTarget)} className="gcm-view-project w-full justify-center rounded-2xl py-3 font-semibold shadow-md">VIEW PROJECT <ArrowUpRight size={17}/></Button>
              </div>
            </article>
          )}
        </div>
        <div className="gcm-project-controls flex items-center justify-center gap-4 mt-4">
          <span className="text-xs font-bold text-muted-foreground">0{index+1} / 0{greenProjects.length}</span>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" className="rounded-full" aria-label="Previous project" onClick={()=>projectRail.current?.scrollTo({left:Math.max(0,index-1)*(projectRail.current.clientWidth-38),behavior:'smooth'})}><ChevronLeft/></Button>
            <Button size="icon" variant="outline" className="rounded-full" aria-label="Next project" onClick={()=>projectRail.current?.scrollTo({left:((index+1)%greenProjects.length)*(projectRail.current.clientWidth-38),behavior:'smooth'})}><ChevronRight/></Button>
          </div>
        </div>
      </section>

      {/* 4. PROCESS SECTION (Increased Heading Size & Centered UI) */}
      <section className="gcm-section gcm-process text-center px-5 py-10" id="gcm-process">
        <Label>{content.process.label}</Label>
        <h2 className="text-center text-2xl md:text-3xl font-serif font-bold text-ink leading-snug mb-6">
          {content.process.title}<br/><em className="text-primary not-italic">{content.process.emphasis}</em>
        </h2>
        <div className="gcm-timeline max-w-xl mx-auto space-y-4 text-left">
          {steps.map(({title,copy},i)=>
            <article key={title} className="gcm-step flex gap-4 p-5 rounded-3xl bg-white shadow-sm border border-stone-200/70 items-start">
              <span className="gcm-step-number flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-sm">0{i+1}</span>
              <div>
                <h3 className="text-base font-bold text-ink">{title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{copy}</p>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="gcm-section gcm-gallery text-center px-5 py-10">
        <Label>{content.gallery.label}</Label>
        <h2 className="text-center text-2xl md:text-3xl font-serif font-bold text-ink leading-snug mb-4">
          {content.gallery.title}<br/><em className="text-primary not-italic">{content.gallery.emphasis}</em>
        </h2>
        <figure className="rounded-3xl overflow-hidden shadow-lg border border-stone-200 bg-white p-2">
          <img src={siteAsset} loading="lazy" alt="Supplied construction site visual" className="w-full aspect-video object-cover rounded-2xl"/>
          <figcaption className="text-xs text-muted-foreground py-3 px-2">Green Constructions — supplied construction-site visual. Dedicated project galleries await original photography.</figcaption>
        </figure>
      </section>

      {/* MILESTONE SECTION */}
      <section className="gcm-section gcm-milestone text-center px-5 py-10">
        <Label>{content.milestone.label}</Label>
        <h2 className="text-center text-2xl md:text-3xl font-serif font-bold text-ink leading-snug mb-4">
          {content.milestone.title}<br/><em className="text-primary not-italic">{content.milestone.emphasis}</em>
        </h2>
        <div className="gcm-since my-4 p-6 rounded-3xl bg-primary text-white shadow-xl inline-block mx-auto">
          <span className="text-xs font-semibold tracking-widest block opacity-90">SINCE</span>
          <strong className="text-4xl font-serif">{content.milestone.since}</strong>
        </div>
        <p className="max-w-md mx-auto text-sm text-muted-foreground leading-relaxed">{content.milestone.detail}<br/><span className="font-semibold text-primary mt-1 block">{content.milestone.disciplines}</span></p>
      </section>

      {/* FOUNDER SECTION */}
      <section className="gcm-founder text-center px-5 py-10" id="gcm-founder">
        <div className="gcm-founder-photo max-w-sm mx-auto rounded-3xl overflow-hidden shadow-xl mb-6 border-4 border-white">
          <img src={portrait} alt="Portrait of Er. Anmay Saha" loading="lazy" className="w-full aspect-4/5 object-cover object-top"/>
        </div>
        <div className="gcm-section px-0">
          <Label>{content.founder.label}</Label>
          <h2 className="text-center text-2xl md:text-3xl font-serif font-bold text-ink leading-snug">
            {content.founder.titleLines[0]}<br/><em className="text-primary not-italic">{content.founder.titleLines[1]}</em>
          </h2>
          <p className="gcm-founder-role font-semibold text-primary mt-2">{content.founder.role}<br/><span className="text-xs text-muted-foreground">{content.brand}</span></p>
          <div className="gcm-founder-credentials flex flex-wrap justify-center gap-2 my-4">
            {content.founder.credentials.map(c=><span key={c} className="bg-stone-100 text-stone-800 px-3 py-1 rounded-full text-xs font-medium border border-stone-200">{c}</span>)}
          </div>
          <div className="gcm-founder-links flex justify-center gap-3 mt-6">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-5 py-2.5 text-xs font-bold shadow-md">VISIT ANMAY ART <ArrowUpRight size={15}/></Link>
            <a href="https://cretoverse.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white text-ink px-5 py-2.5 text-xs font-bold shadow-sm">CRETOVERSE <ArrowUpRight size={15}/></a>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US (Principles - Increased Heading Size & Centered UI) */}
      <section className="gcm-section gcm-why text-center px-5 py-10" id="gcm-why">
        <Label>{content.why.label}</Label>
        <h2 className="text-center text-2xl md:text-3xl font-serif font-bold text-ink leading-snug mb-6">
          {content.why.title}<br/><em className="text-primary not-italic">{content.why.emphasis}</em>
        </h2>
        <div className="gcm-why-list max-w-xl mx-auto space-y-4 text-left">
          {principles.map(({title,copy,Icon},i)=>
            <article key={title} className="flex gap-4 p-5 rounded-3xl bg-white shadow-sm border border-stone-200/70 items-start">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-xs">0{i+1}</span>
              <div className="flex gap-4">
                <div className="text-primary shrink-0 mt-0.5">
                  <Icon size={24} strokeWidth={1.3}/>
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">{title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{copy}</p>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="gcm-cta relative overflow-hidden rounded-[36px] mx-5 my-10 p-8 text-center text-white shadow-2xl">
        <img src={siteAsset} alt="Construction site visual supplied for Green Constructions" loading="lazy" className="absolute inset-0 w-full h-full object-cover -z-10 brightness-50"/>
        <div className="relative z-10 max-w-lg mx-auto">
          <Label>{content.cta.label}</Label>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3 leading-snug">
            {content.cta.titleLines[0]}<br/><em className="not-italic">{content.cta.titleLines[1]}</em><br/>
            {content.cta.emphasisLines[0]}<br/><em className="not-italic">{content.cta.emphasisLines[1]}</em>
          </h2>
          <p className="text-sm text-white/90 mb-6 leading-relaxed">{content.cta.description}</p>
          <Button onClick={()=>goTo('contact')} className="bg-white text-ink hover:bg-stone-100 rounded-full px-8 py-3 font-bold shadow-lg">START A PROJECT <ArrowRight size={17}/></Button>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="gcm-section gcm-contact text-center px-5 py-10" id="gcm-contact">
        <Label>{content.contact.label}</Label>
        <h2 className="text-center text-2xl md:text-3xl font-serif font-bold text-ink leading-snug mb-2">
          {content.contact.title}<br/><em className="text-primary not-italic">{content.contact.emphasis}</em>
        </h2>
        <p className="max-w-md mx-auto text-sm text-muted-foreground mb-4">{content.contact.description}</p>
        <p className="gcm-location flex items-center justify-center gap-1.5 text-sm font-semibold text-primary mb-6"><MapPin size={17}/>{contact.location}</p>
        
        {prepared ? (
          <div className="gcm-prepared p-6 rounded-3xl bg-white shadow-xl border border-stone-200 text-center" role="status">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
              <Check size={28}/>
            </div>
            <h3 className="text-xl font-bold text-ink">Enquiry prepared.</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-4">Your enquiry has not been sent or stored. Copy or share it with your preferred messaging app.</p>
            <pre className="bg-stone-50 p-4 rounded-2xl text-xs text-left overflow-x-auto border border-stone-200 font-mono mb-4">{prepared}</pre>
            <div className="gcm-prepared-actions flex flex-col sm:flex-row gap-2.5 justify-center mb-4">
              <Button onClick={copy} className="rounded-full">{copied?'COPIED':'COPY ENQUIRY'} <Copy size={16}/></Button>
              {typeof navigator!=='undefined' && typeof navigator.share==='function' && <Button variant="outline" onClick={share} className="rounded-full">SHARE ENQUIRY <Share2 size={16}/></Button>}
            </div>
            <Button variant="ghost" onClick={()=>setPrepared('')} className="text-xs">Write another <ArrowRight size={14}/></Button>
          </div>
        ) : (
          <form onSubmit={prepare} className="gcm-form max-w-lg mx-auto bg-white p-6 md:p-8 rounded-[32px] shadow-xl border border-stone-200 text-left space-y-4">
            <label className="block text-xs font-bold tracking-wider text-stone-700">FULL NAME<input name="name" placeholder="Your name" autoComplete="name" required className="mt-1 w-full h-12 rounded-xl border border-stone-300 px-4 text-sm focus:outline-none focus:border-primary"/></label>
            <label className="block text-xs font-bold tracking-wider text-stone-700">PHONE NUMBER<input name="phone" placeholder="Your number" type="tel" autoComplete="tel" required onInput={e=>e.currentTarget.setCustomValidity('')} className="mt-1 w-full h-12 rounded-xl border border-stone-300 px-4 text-sm focus:outline-none focus:border-primary"/></label>
            <label className="block text-xs font-bold tracking-wider text-stone-700">EMAIL ADDRESS<input name="email" placeholder="you@example.com" type="email" autoComplete="email" required className="mt-1 w-full h-12 rounded-xl border border-stone-300 px-4 text-sm focus:outline-none focus:border-primary"/></label>
            <label className="block text-xs font-bold tracking-wider text-stone-700">SELECT SERVICE<select name="service" required defaultValue="" className="mt-1 w-full h-12 rounded-xl border border-stone-300 px-4 text-sm focus:outline-none focus:border-primary bg-white"><option value="" disabled>Choose a service</option>{services.map(s=><option key={s.title}>{s.title}</option>)}<option>Other</option></select></label>
            <label className="block text-xs font-bold tracking-wider text-stone-700">MESSAGE<textarea name="message" rows={4} placeholder="Tell us about your project" required className="mt-1 w-full rounded-xl border border-stone-300 p-4 text-sm focus:outline-none focus:border-primary"/></label>
            <Button type="submit" className="w-full h-12 rounded-xl font-bold shadow-md">PREPARE ENQUIRY <ArrowRight size={17}/></Button>
            <small className="block text-center text-[11px] text-muted-foreground mt-2">This form does not send or store information. Copy or share the prepared enquiry yourself.</small>
          </form>
        )}
      </section>
    </main>

    {/* FOOTER */}
    <footer className="gcm-footer text-center py-10 px-5 bg-stone-900 text-white mt-12">
      <img className="gcm-logo mx-auto mb-3" src={logo} alt="Green Constructions Logo"/>
      <strong className="text-lg font-bold block mb-1">{content.brand}</strong>
      <p className="text-xs text-stone-400 max-w-xs mx-auto mb-3">{content.footer.tagline}</p>
      <span className="text-xs text-stone-500 block mb-6">{content.location}</span>
      <GreenEcosystemLinks />
    </footer>

    {/* BOTTOM NAV BAR (Strictly Unchanged Layout) */}
    <nav className="gcm-bottom" aria-label="Green Constructions quick navigation">{nav.map(([title,id,Icon])=><Button variant="ghost" key={id} className={active===id?'gcm-active':''} onClick={()=>goTo(id)} aria-label={`Go to ${title.toLowerCase()}`}><Icon size={21} strokeWidth={active===id?2:1.8}/><span>{title}</span></Button>)}</nav>
    
    {/* NAVIGATION MENU OVERLAY */}
    {menuOpen && <div className="gcm-menu" role="dialog" aria-modal="true" aria-label="Navigation"><div className="gcm-menu-head"><img className="gcm-logo" src={logo} alt="Green Constructions Logo"/><span>GREEN CONSTRUCTIONS</span><Button size="icon" variant="ghost" onClick={()=>setMenuOpen(false)} aria-label="Close navigation"><X/></Button></div><nav>{menu.map(([title,id],i)=><Button variant="ghost" key={id} onClick={()=>goTo(id)}><span>0{i+1}</span>{title}<ArrowUpRight/></Button>)}</nav><div className="gcm-menu-links"><Link to="/" onClick={()=>setMenuOpen(false)}>ANMAY ART <ArrowUpRight/></Link><a href="https://cretoverse.com" target="_blank" rel="noopener noreferrer">CRETOVERSE <ArrowUpRight/></a></div><p>BUILDING WITH PURPOSE. &nbsp; AGARTALA, TRIPURA</p></div>}
    
    {/* PROJECT CASE STUDY MODAL */}
    {project && <div className="gcm-case" ref={dialog} role="dialog" aria-modal="true" aria-label={`${project.title} project case study`}><header><span>GC / PROJECT 0{greenProjects.indexOf(project)+1}</span><Button variant="ghost" onClick={closeProject} aria-label="Close project"><X size={22}/></Button></header><div className="gcm-case-hero"><div className="gcm-grid-lines" aria-hidden="true"/><span>GREEN CONSTRUCTIONS / CASE STUDY</span><h2>{project.title}</h2><p>{project.category}<br/>{project.location}</p>{!project.cover && <small>ORIGINAL PROJECT PHOTOGRAPHY AWAITED</small>}</div><div className="gcm-case-overview"><Label>PROJECT OVERVIEW</Label><h3>{project.overview}</h3><p>{project.scope}</p></div>{project.sections.map(section=><section key={section.number} className="gcm-case-section"><span>{section.number} / {section.title}</span><h3>{section.title}</h3><p>{section.copy}</p>{section.images.length>0?<div className="gcm-case-images">{section.images.map(img=><Button key={img.src} variant="ghost" onClick={()=>setLightbox(gallery.findIndex(g=>g.src===img.src))} aria-label={`View ${img.alt}`}><img src={img.src} alt={img.alt} loading="lazy"/></Button>)}</div>:<div className="gcm-case-empty"><DraftingCompass size={27} strokeWidth={1}/><span>ORIGINAL {section.title.toUpperCase()} IMAGERY AWAITED</span></div>}</section>)}<section className="gcm-case-section"><span>06 / PROJECT GALLERY</span><h3>Project gallery</h3>{gallery.length?<div className="gcm-case-images">{gallery.map((img,i)=><Button variant="ghost" key={`${img.src}-${i}`} onClick={()=>setLightbox(i)} aria-label={`View ${img.alt}`}><img src={img.src} alt={img.alt} loading="lazy"/></Button>)}</div>:<p>Project-specific gallery photographs have not yet been supplied.</p>}</section><div className="gcm-case-next"><Button variant="ghost" onClick={()=>{const next=greenProjects.find(p=>p.slug!==project.slug);if(next){setProject(next);dialog.current?.scrollTo({top:0,behavior:'smooth'});}}}>NEXT PROJECT <ArrowDownRight/></Button><strong>{greenProjects.find(p=>p.slug!==project.slug)?.title}</strong><Button variant="outline" onClick={closeProject}>BACK TO PROJECTS <ArrowLeft/></Button></div></div>}
    
    {/* LIGHTBOX MODAL */}
    {lightbox!==null && gallery[lightbox] && <div className="gcm-lightbox" role="dialog" aria-modal="true" aria-label="Project image viewer" onTouchStart={e=>{touchStart.current=e.touches[0]?.clientX??null;}} onTouchEnd={lightboxSwipe}><Button variant="ghost" aria-label="Close image" onClick={()=>setLightbox(null)} className="gcm-lightbox-close"><X/></Button><img src={gallery[lightbox].src} alt={gallery[lightbox].alt}/><div className="gcm-lightbox-controls"><Button variant="ghost" aria-label="Previous image" onClick={()=>setLightbox((lightbox-1+gallery.length)%gallery.length)}><ChevronLeft/></Button><span>0{lightbox+1} / 0{gallery.length}</span><Button variant="ghost" aria-label="Next image" onClick={()=>setLightbox((lightbox+1)%gallery.length)}><ChevronRight/></Button></div></div>}
  </div>;
}