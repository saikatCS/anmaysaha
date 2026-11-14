CREATE TABLE IF NOT EXISTS public.blog_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('artworld', 'construction')),
  video_id text NOT NULL,
  video_url text NOT NULL,
  caption text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_videos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_videos TO authenticated;
GRANT ALL ON public.blog_videos TO service_role;
ALTER TABLE public.blog_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "blog videos public read" ON public.blog_videos FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "blog videos admin write" ON public.blog_videos FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER blog_videos_touch BEFORE UPDATE ON public.blog_videos FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE IF NOT EXISTS public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  file_url text NOT NULL,
  file_type text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.certificates TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.certificates TO authenticated;
GRANT ALL ON public.certificates TO service_role;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "certificates public read" ON public.certificates FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "certificates admin write" ON public.certificates FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER certificates_touch BEFORE UPDATE ON public.certificates FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
