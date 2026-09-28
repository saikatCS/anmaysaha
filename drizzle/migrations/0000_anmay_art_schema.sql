-- roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- posts
CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL DEFAULT 'News',
  cover_image text,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  kind text NOT NULL DEFAULT 'blog',
  published boolean NOT NULL DEFAULT false,
  publish_date date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "posts public read" ON public.posts FOR SELECT TO anon, authenticated USING (published OR public.is_admin());
CREATE POLICY "posts admin write" ON public.posts FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER posts_touch BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- projects
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL DEFAULT 'Residential',
  location text NOT NULL DEFAULT 'Agartala, Tripura',
  year int,
  cover_image text,
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  description text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects public read" ON public.projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "projects admin write" ON public.projects FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER projects_touch BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- artworks
CREATE TABLE public.artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image text,
  medium text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.artworks TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.artworks TO authenticated;
GRANT ALL ON public.artworks TO service_role;
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "artworks public read" ON public.artworks FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "artworks admin write" ON public.artworks FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- services
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  icon text NOT NULL DEFAULT 'building',
  short_description text NOT NULL DEFAULT '',
  full_description text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "services public read" ON public.services FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "services admin write" ON public.services FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- stats
CREATE TABLE public.stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value text NOT NULL,
  icon text NOT NULL DEFAULT 'award',
  sort_order int NOT NULL DEFAULT 0
);
GRANT SELECT ON public.stats TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.stats TO authenticated;
GRANT ALL ON public.stats TO service_role;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "stats public read" ON public.stats FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "stats admin write" ON public.stats FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- contact submissions
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_submissions TO anon;
GRANT SELECT, INSERT, DELETE ON public.contact_submissions TO authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admin reads submissions" ON public.contact_submissions FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "admin deletes submissions" ON public.contact_submissions FOR DELETE TO authenticated USING (public.is_admin());

-- site settings (single row)
CREATE TABLE public.site_settings (
  id int PRIMARY KEY DEFAULT 1,
  phone text NOT NULL DEFAULT '+91 87948 25288',
  email text NOT NULL DEFAULT 'anmayart7@gmail.com',
  address text NOT NULL DEFAULT 'Agartala, Tripura, India',
  working_hours text NOT NULL DEFAULT 'Mon - Sat: 9:00 AM - 7:00 PM',
  facebook text NOT NULL DEFAULT '',
  instagram text NOT NULL DEFAULT '',
  linkedin text NOT NULL DEFAULT '',
  youtube text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings public read" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "settings admin write" ON public.site_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

INSERT INTO public.site_settings (id) VALUES (1);

INSERT INTO public.stats (label, value, icon, sort_order) VALUES
  ('Years of Experience','8+','award',1),
  ('Projects Completed','150+','building',2),
  ('Happy Clients','100+','users',3),
  ('Client Rating','5★','star',4);

INSERT INTO public.services (title, icon, short_description, full_description, sort_order) VALUES
  ('Building Planning & Design','ruler','Smart and innovative planning tailored to your needs.','From concept sketches to municipal-ready drawings, every plan balances buildability, budget and beauty.',1),
  ('Construction Management','hardhat','End-to-end execution with quality & on-time delivery.','Site supervision, vendor coordination, quality checks and transparent progress reporting at every stage.',2),
  ('Interior Design Solutions','sofa','Functional and aesthetic interior spaces.','Space planning, material palettes, lighting and bespoke joinery designed around how you actually live.',3),
  ('Renovation & Remodeling','hammer','Transforming spaces with modern solutions.','Structural upgrades and modern refreshes that extend the life and value of existing buildings.',4),
  ('Structural Consultation','shield','Safe, sustainable and future-ready structures.','Load analysis, structural detailing and safety audits grounded in materials-science expertise.',5),
  ('AMC Approved Building Planner','badge','Government approved plans with compliance & accuracy.','Approved planning and documentation support for smooth sanction and compliance with local authorities.',6);