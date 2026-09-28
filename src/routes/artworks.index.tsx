// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { seo, personLd, websiteLd, businessLd, crumbs } from '@/lib/seo';
import { createFileRoute } from '@tanstack/react-router';
import { SiteLayout, PageHero } from '@/components/site/Layout';
import { ArtGrid } from '@/components/site/Sections';
export const Route = createFileRoute('/artworks/')({ head: () => seo({ path: '/artworks', title: 'Artworks by Anmay Saha | Creative Practice Beyond Engineering', description: 'Art studies by Anmay Saha, the Agartala-based civil engineer and building planner whose creative practice sits alongside his engineering work.', jsonLd: [crumbs([['Home','/'],['Artworks','/artworks']])] }), component: Artworks });
function Artworks() { return <SiteLayout><PageHero eyebrow="Beyond engineering" title="An eye for expression." subtitle="A collection of creative studies and artwork." /><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><ArtGrid /></div></SiteLayout> }
