# Anmay's Portfolio Builder

# Anmay Art — Lovable Build Prompt

Copy everything below into Lovable as your project prompt.

---

## PROJECT BRIEF

Build a premium, modern portfolio website for **Anmay Art** — the personal brand of **Anmay Saha**, a Civil Engineer, Building Planner, and Construction Professional (Founder & Proprietor of **Green Constructions**), based in Agartala, Tripura, India.

This is a portfolio + personal-brand website that showcases his engineering/construction work AND his personal artworks. It must feel premium, trustworthy, and clean — like a boutique architecture/design studio site, not a generic template.

## TECH STACK (STRICT)
- React + Vite
- Tailwind CSS
- Supabase (database + auth + storage for images)
- Do NOT use Next.js. Do NOT use TanStack Router or TanStack Query.
- Use React Router for routing.
- Fully responsive: mobile, tablet, desktop.

## COLOR PALETTE (match exactly)
- Primary Green (brand/accent): `#5C7A3D` (olive-forest green) — used for logo "A" icon, active nav underline, primary buttons, icons, section labels
- Dark Green (secondary): `#3A5227` — used for dark cards/badges (e.g. the "Founder & Proprietor" badge on hero image)
- Near-Black (text/footer): `#1A1A1A` — footer background, headings
- Off-White / Cream background: `#FAFAF7`
- Light Gray section background: `#F5F5F2`
- White: `#FFFFFF`
- Gold/Mustard accent (signature text, "Build" highlight word): `#B8935A`
- Body text gray: `#6B6B6B`

Typography: elegant serif for big headline text (e.g. "I Design. I Plan. I Build with Purpose.") paired with clean sans-serif for body/nav/UI text. Use a signature/script font style purely for the "Anmay Saha" signature graphic elements.

## SITE STRUCTURE / PAGES
1. **Home** (full landing page, sections below)
2. **About** (extended bio, credentials, timeline)
3. **Services** (all services in detail)
4. **Projects** (full portfolio grid/gallery, filterable by category: Residential, Commercial, Interior, Renovation)
5. **Artworks** (gallery of personal artworks, separate from construction projects)
6. **Life** (personal/lifestyle blog-style page)
7. **Blog / News** (news & articles list + individual post pages — THIS IS ADMIN-MANAGED, see below)
8. **Contact** (contact form + map + details)

## HEADER / NAVIGATION
- Logo: green "A" icon mark + "ANMAY ART" wordmark, with small tagline "Design | Plan | Build" underneath
- Nav links: Home, About, Services, Projects, Artworks, Life, Blog, Contact
- Active link shown with green underline
- Right side: "Get a Quote" pill button, green background, white text, arrow icon
- Sticky on scroll, white background, subtle shadow when scrolled

## HOME PAGE SECTIONS (in order)

### 1. Hero Section
- Small green uppercase label: "DESIGNING SPACES. BUILDING DREAMS."
- Large serif headline: "I Design. I Plan. I Build with Purpose." — the word "Build" styled in the primary green color
- Subtext: "I'm **Anmay Saha**, a Civil Engineer, Building Planner & Construction Professional creating sustainable, functional and aesthetic spaces that stand the test of time."
- 4 credential badges in a row, each with a small icon: "B.Tech Civil Engineer", "M.Tech Materials Science", "AMC Approved Building Planner", "AMIE (Associate Member)"
- Two buttons: "Explore My Work →" (solid green) and "Contact Me →" (outlined)
- Right side: large hero photo of a modern white multi-story residence with plants/balconies, image has a diagonal-cut/angled mask edge on the left side
- Overlaid dark-green card on the bottom-left of the hero image with a signature-style "Anmay Saha" script text, "Founder & Proprietor", "Green Constructions"
- Faint decorative building line-art illustration behind the text on the left (subtle, low opacity)

### 2. About Me Section
- Left: photo of Anmay Saha (professional headshot, arms crossed, blazer, glasses) on a soft green organic blob-shaped background
- Right: green label "ABOUT ME", heading "Crafting Spaces with Passion & Precision.", paragraph about blending engineering foundation with creative eye for design, a script-style signature graphic, and "Know More About Me →" outlined button
- Far right: 2x2 stat grid in a light card: "8+ Years of Experience", "150+ Projects Completed", "100+ Happy Clients", "5★ Client Rating" — each with a small green icon

### 3. Services Section (light gray background)
- Green label "WHAT I DO", heading "Services That I Offer"
- 6 service cards in a row (responsive grid, wraps on smaller screens), each with icon + title + short description:
  1. Building Planning & Design
  2. Construction Management
  3. Interior Design Solutions
  4. Renovation & Remodeling
  5. Structural Consultation
  6. AMC Approved Building Planner
- Centered green "View All Services →" button below the cards

### 4. Featured Projects Section
- Green label "FEATURED PROJECTS", heading "Some of My Recent Work", "View All Projects →" button top-right
- 4-column image grid (responsive), each card: project photo, small icon + project name + location ("Agartala, Tripura")
- Example cards: Modern Residence, Commercial Complex, Residential Building, Interior Project
- Carousel dot indicators below (3 dots) suggesting more projects load/slide

### 5. Education & Artworks Split Section (light green-tinted background on left half)
- Left half: green label "EDUCATION & CREDENTIALS" with a checklist (green checkmarks): B.Tech in Civil Engineering, M.Tech in Materials Science, AMC Approved Building Planner, Associate Member – Institution of Engineers (India); "Read More" button; plus a small quote card with a leaf icon: "My mission is to create sustainable and timeless spaces that enhance lives and communities."
- Right half: green label "ARTWORKS", short line about expressing creativity through art, "Explore Artworks →" outlined button, and a row of 3 small square artwork thumbnail images

### 6. CTA Banner (dark green background, full width)
- Left: small label "LET'S WORK TOGETHER", heading "Have a Project in Mind?", subtext "Let's create something amazing together."
- Middle: 3 small feature bullets with icons: "Custom Solutions – Tailored to your needs", "Quality Assurance – We never compromise", "On-Time Delivery – Your time matters"
- Right: white pill button "Get Free Consultation →"

### 7. Footer (near-black background)
- Column 1: Logo + tagline + short description + social icons (Facebook, Instagram, LinkedIn, YouTube)
- Column 2: Quick Links (Home, About, Services, Projects, Artworks, Life, Blog, Contact)
- Column 3: Services list
- Column 4: Contact Info (phone, email, address "Agartala, Tripura, India", working hours "Mon - Sat: 9:00 AM - 7:00 PM")
- Column 5: Newsletter signup — email input + green send button
- Bottom bar: "© 2025 Anmay Art. All Rights Reserved." + Privacy Policy + Terms of Service links

## OTHER PAGES (brief)
- **About page**: full bio, career timeline, credentials in detail, philosophy
- **Services page**: each service from the home grid gets its own detailed block with image
- **Projects page**: full gallery grid with category filter tabs (All / Residential / Commercial / Interior / Renovation), each project opens a detail view (image gallery, description, location, year)
- **Artworks page**: pure image gallery/masonry grid of artworks, lightbox on click
- **Life page**: personal blog-style page — photos + short posts about personal interests/lifestyle
- **Blog/News page**: card grid of news/articles (image, title, date, excerpt) — pulls from admin-managed content; individual post page with full content
- **Contact page**: contact form (name, email, phone, message) that saves submissions to Supabase, plus embedded Google Map, address, phone, email, working hours

## ADMIN PANEL (IMPORTANT — BUILD THIS CAREFULLY)

Build a separate, hidden admin panel accessible only at the route:
```
/anmayart
```
This route should NOT be linked anywhere in the public site navigation or footer — it's a direct-access-only URL.

### Admin Login
- Simple login screen at `/anmayart` with email + password fields
- Use Supabase Auth (email/password provider) for real authentication — create one admin user with:
  - Email: `anmayart@gmail.com`
  - Password: `anmay@2026`
- After login, redirect to `/anmayart/dashboard`
- Add Supabase Row Level Security so only this authenticated admin user can write/update/delete content — public visitors can only read.
- Add a "Logout" button in the admin dashboard header.

### Admin Dashboard Features
Build a clean, simple dashboard (sidebar or top-tab navigation) with these management sections:

1. **News / Blog Manager**
   - List of all posts (title, date, published/draft status)
   - Add New Post: title, category, cover image upload (Supabase Storage), short excerpt, full content (rich text or markdown editor), publish date
   - Edit / Delete existing posts
   - Toggle published/draft

2. **Projects Manager**
   - Add/Edit/Delete portfolio projects: title, category (Residential/Commercial/Interior/Renovation), location, year, cover image + gallery images (multiple upload), description
   - Reorder / feature a project on homepage (toggle "Show on homepage")

3. **Artworks Manager**
   - Add/Edit/Delete artwork entries: title, image upload, medium/description

4. **Services Manager**
   - Add/Edit/Delete/reorder services shown on homepage and services page: icon (pick from a small icon set), title, short description, full description

5. **Testimonials/Stats Manager** (optional but nice)
   - Edit the 4 stat numbers on the About section (Years of Experience, Projects Completed, Happy Clients, Rating)

6. **Contact Submissions**
   - View list of messages submitted through the public Contact form (name, email, phone, message, date) — read-only inbox view

7. **Site Settings**
   - Edit basic contact info shown in footer/contact page: phone, email, address, working hours, social media links

### Admin UI style
- Clean, minimal dashboard using the same green/white brand colors but simplified (white background, sidebar with green active states)
- Table/list views with "Add New" buttons, edit and delete icon buttons
- Image uploads should preview before saving and store in Supabase Storage buckets
- Confirm before delete actions (modal)
- Show success/error toast notifications on save

## DATA REQUIREMENTS
Set up Supabase tables for: `posts` (news/blog), `projects`, `artworks`, `services`, `stats`, `contact_submissions`, `site_settings`. Public pages should read live from these tables (no hardcoded content for anything admin-manageable) so that whatever Anmay uploads from `/anmayart` instantly appears on the live site.

## GENERAL QUALITY BAR
- This site's whole job is to make visiting clients trust Anmay Saha's professionalism and want to hire him — so prioritize a premium, uncluttered, confident visual design: generous whitespace, consistent spacing, smooth hover states on cards/buttons, subtle scroll-in animations on sections, and sharp, high-quality image placeholders until real photos are uploaded via the admin panel.
- Keep every future feature request additive — do not alter or remove existing sections/design when new features are added later.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://civil-creative-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/88a29b94-5d6d-45c0-8c4b-1db720fefc90).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
