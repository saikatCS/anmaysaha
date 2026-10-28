// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { seo, personLd, websiteLd, businessLd, crumbs } from '@/lib/seo';
import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { SiteLayout, PageHero } from '@/components/site/Layout';
import { ProjectGrid } from '@/components/site/Sections';
import { categories } from '@/lib/portfolio';
import { useProjects } from '@/lib/remote-content';
export const Route = createFileRoute('/projects/')({ head: () => seo({ path: '/projects', title: 'Projects | Building Planning & Construction Portfolio — Anmay Saha, Tripura', description: 'Residential, commercial and interior projects from the building planning and construction portfolio of Anmay Saha, Civil Engineer in Agartala, Tripura.', jsonLd: [crumbs([['Home','/'],['Projects','/projects']])] }), component: Projects });
function Projects() { const projects = useProjects(); const [category, setCategory] = useState('All'); const filtered = category === 'All' ? projects : projects.filter(p => p.category === category); return <SiteLayout><PageHero eyebrow="Selected projects" title="Spaces with a point of view." subtitle="A selection of residential, commercial and interior concepts." /><section className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="mb-10 flex flex-wrap gap-2" aria-label="Project categories">{[...new Set([...categories, ...projects.map(p => p.category)])].map(c => <Button key={c} variant={category === c ? 'default' : 'outline'} className={`h-10 rounded-full px-5 ${category === c ? 'btn-brand' : 'btn-ghost-brand'}`} onClick={() => setCategory(c)} aria-pressed={category === c}>{c}</Button>)}</div>{filtered.length ? <ProjectGrid items={filtered} /> : <p className="py-16 text-muted-foreground">No {category.toLowerCase()} projects are available yet.</p>}</section></SiteLayout> }
