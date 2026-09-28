// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { seo, personLd, websiteLd, businessLd, crumbs } from '@/lib/seo';
import { createFileRoute } from '@tanstack/react-router';
import { SiteLayout, PageHero } from '@/components/site/Layout';
import { ContactSection } from '@/components/site/ContactForm';
export const Route = createFileRoute('/contact')({ head: () => seo({ path: '/contact', title: 'Contact Anmay Saha | Building Planning & Construction Enquiries, Agartala', description: 'Discuss building planning, construction, interior design or project execution in Agartala and Tripura with Anmay Saha.', jsonLd: [crumbs([['Home','/'],['Contact','/contact']])] }), component: Contact });
function Contact() { return <SiteLayout><PageHero eyebrow="Get in touch" title="Let's create something meaningful." subtitle="Planning a project? I'd love to hear about it." /><ContactSection /></SiteLayout> }
