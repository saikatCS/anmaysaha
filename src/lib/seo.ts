export const SITE_URL = 'https://civil-creative-hub.lovable.app';
export const SITE_NAME = 'Anmay Saha — Anmay Art';

type SeoInput = { path: string; title: string; description: string; type?: string; jsonLd?: object[] };

export function seo({ path, title, description, type = 'website', jsonLd = [] }: SeoInput) {
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: 'en_IN' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'geo.region', content: 'IN-TR' },
      { name: 'geo.placename', content: 'Agartala, Tripura, India' },
    ],
    links: [{ rel: 'canonical', href: url }],
    scripts: jsonLd.map((d) => ({ type: 'application/ld+json', children: JSON.stringify(d) })),
  };
}

const address = { '@type': 'PostalAddress', addressLocality: 'Agartala', addressRegion: 'Tripura', addressCountry: 'IN' };

export const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Anmay Saha',
  url: SITE_URL,
  jobTitle: 'Civil Engineer, Building Planner & Construction Professional',
  description: 'Anmay Saha is a Civil Engineer, Building Planner and Construction Professional based in Agartala, Tripura, working across building planning, construction, interior design and project execution.',
  address,
  homeLocation: { '@type': 'Place', name: 'Agartala, Tripura, India' },
  knowsAbout: ['Civil Engineering', 'Building Planning', 'Construction Management', 'Interior Design', 'Project Execution', 'Materials Science', 'Art'],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'B.Tech in Civil Engineering' },
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'M.Tech in Materials Science' },
    { '@type': 'EducationalOccupationalCredential', name: 'AMC Approved Building Planner' },
  ],
  memberOf: { '@type': 'Organization', name: 'Institution of Engineers (India)' },
  worksFor: { '@id': `${SITE_URL}/green-constructions#business` },
};

export const websiteLd = { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: SITE_NAME, url: SITE_URL, inLanguage: 'en-IN', publisher: { '@id': `${SITE_URL}/#person` } };

export const businessLd = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': `${SITE_URL}/green-constructions#business`,
  name: 'Green Constructions',
  url: `${SITE_URL}/green-constructions`,
  description: 'Building planning, construction, interior design and project execution practice led by Er. Anmay Saha in Agartala, Tripura.',
  founder: { '@id': `${SITE_URL}/#person` },
  foundingDate: '2019',
  address,
  areaServed: [{ '@type': 'City', name: 'Agartala' }, { '@type': 'State', name: 'Tripura' }],
};

export const crumbs = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE_URL}${path}` })),
});
