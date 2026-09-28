ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS tagline text NOT NULL DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS scope text NOT NULL DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS approach text NOT NULL DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS key_features text NOT NULL DEFAULT '';

CREATE TABLE IF NOT EXISTS public.gc_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  brief text NOT NULL DEFAULT '',
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gc_projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gc_projects TO authenticated;
GRANT ALL ON public.gc_projects TO service_role;
ALTER TABLE public.gc_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gc public read" ON public.gc_projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "gc admin write" ON public.gc_projects FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

GRANT SELECT ON public.artworks, public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.artworks, public.projects TO authenticated;