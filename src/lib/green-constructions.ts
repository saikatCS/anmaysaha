export type GreenProject = {
  slug: string;
  title: string;
  category: string;
  location: string;
  overview: string;
  scope: string;
  cover?: string | undefined;
  gallery?: { src: string; alt: string }[];
  sections: { number: string; title: string; copy: string; images: { src: string; alt: string }[] }[];
};

// Project-specific photos have not been supplied. Keep these arrays empty rather
// than presenting unrelated portfolio concepts as documented work.
export const greenProjects: GreenProject[] = [
  {
    slug: 'the-elite', title: 'The Elite', category: 'Hotel & Restaurant',
    location: 'Orient Chowmohoni, Agartala',
    overview: 'The Elite is a hotel and restaurant project involving architectural design and execution, structural construction, and interior detailing.',
    scope: 'Architectural design · Structural construction · Interior detailing',
    sections: [
      { number: '01', title: 'Project overview', copy: 'A hospitality project connecting the building structure with the experience of its interior spaces.', images: [] },
      { number: '02', title: 'Design & planning', copy: 'Architectural design forms part of the documented project scope. Drawings and planning photographs can be added when available.', images: [] },
      { number: '03', title: 'Construction', copy: 'Structural construction is part of the documented project scope. Construction-stage photographs have not yet been provided.', images: [] },
      { number: '04', title: 'Interior', copy: 'Interior detailing is part of the documented project scope. Room-specific photographs have not yet been provided.', images: [] },
      { number: '05', title: 'Completed space', copy: 'Completed-project photography has not yet been provided.', images: [] },
    ],
  },
  {
    slug: 'mr-binoys-house', title: "Mr. Binoy’s House", category: 'G+2 Residential Project',
    location: 'Gandhighat, Agartala',
    overview: 'A residential project identified in the supplied material, with architectural planning, interior design, and construction/interior execution.',
    scope: 'Architectural planning · Interior design · Construction and interior execution',
    sections: [
      { number: '01', title: 'Project overview', copy: 'A G+2 residential project in Gandhighat, Agartala.', images: [] },
      { number: '02', title: 'Planning', copy: 'Architectural planning is identified in the project material. Project drawings have not yet been provided.', images: [] },
      { number: '03', title: 'Construction', copy: 'Construction execution is identified in the project material. Progress photographs have not yet been provided.', images: [] },
      { number: '04', title: 'Interior', copy: 'Interior design and execution are identified in the project material. Interior photographs have not yet been provided.', images: [] },
      { number: '05', title: 'Completed result', copy: 'Completed-project photography has not yet been provided.', images: [] },
    ],
  },
];