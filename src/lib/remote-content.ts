import { useMemo, useSyncExternalStore } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { artworks as staticArtworks, projects as staticProjects } from '@/lib/portfolio';
import { greenProjects as staticGreen, type GreenProject } from '@/lib/green-constructions';

export type Artwork = (typeof staticArtworks)[number] & { remoteId?: string };
export type Project = (typeof staticProjects)[number] & {
  remoteId?: string; scope?: string; approach?: string; gallery?: { src: string; caption: string }[];
};
export type GcSection = { title: string; copy: string; image: string };
export type GcGalleryItem = { src: string; caption: string };

type State = { ready: boolean; artworks: Artwork[]; projects: Project[]; green: GreenProject[] };
const empty: State = { ready: false, artworks: [], projects: [], green: [] };
let state: State = empty;
let loaded = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const GC_SECTION_TITLES = ['Project overview', 'Design & planning', 'Construction', 'Interior', 'Completed space'];

export async function refreshRemoteContent() {
  const [a, p, g] = await Promise.all([
    supabase.from('artworks').select('*').order('sort_order').order('created_at'),
    supabase.from('projects').select('*').order('sort_order').order('created_at'),
    supabase.from('gc_projects').select('*').order('sort_order').order('created_at'),
  ]);
  if (a.error || p.error || g.error) throw a.error ?? p.error ?? g.error;
  state = {
    ready: true,
    artworks: (a.data ?? []).map((r) => ({ remoteId: r.id, slug: `art-${r.id}`, title: r.title, medium: r.medium || 'Artwork', image: r.image ?? '', description: r.description })),
    projects: (p.data ?? []).map((r) => ({
      remoteId: r.id, slug: r.slug, title: r.title, category: r.tagline || r.category, image: r.cover_image ?? '',
      location: r.location, year: r.year ? String(r.year) : '', overview: r.description,
      features: r.key_features.split('\n').map((s) => s.trim()).filter(Boolean),
      scope: r.scope, approach: r.approach, gallery: (r.gallery as GcGalleryItem[]) ?? [],
    })),
    green: (g.data ?? []).map((r) => {
      const sections = (r.sections as GcSection[]) ?? [];
      return {
        slug: `gc-${r.id}`, title: r.title, category: r.category, location: r.location, overview: r.brief,
        scope: sections[0]?.copy ?? '', cover: r.cover_image || sections[4]?.image || sections[0]?.image || undefined,
        sections: sections.map((s, i) => ({ number: `0${i + 1}`, title: s.title || GC_SECTION_TITLES[i] || '', copy: s.copy, images: s.image ? [{ src: s.image, alt: `${r.title} — ${s.title}` }] : [] })),
        gallery: ((r.gallery as GcGalleryItem[]) ?? []).map((x) => ({ src: x.src, alt: x.caption || r.title })),
      } satisfies GreenProject;
    }),
  };
  loaded = true;
  emit();
}

function subscribe(l: () => void) {
  listeners.add(l);
  if (!loaded) { loaded = true; refreshRemoteContent().catch(() => { loaded = false; }); }
  return () => listeners.delete(l);
}
const useRemote = () => useSyncExternalStore(subscribe, () => state, () => empty);

// All items (including the original ones) live in the database so they can be edited/deleted in /admin.
// Static data is only shown until the database answers (or if it cannot be reached).
export const useArtworks = (): Artwork[] => { const s = useRemote(); return useMemo(() => s.ready ? s.artworks : staticArtworks, [s]); };
export const useProjects = (): Project[] => { const s = useRemote(); return useMemo(() => s.ready ? s.projects : staticProjects, [s]); };
export const useGreenProjects = (): GreenProject[] => { const s = useRemote(); return useMemo(() => s.ready ? s.green : staticGreen, [s]); };
