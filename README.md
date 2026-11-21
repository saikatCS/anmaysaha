# Anmay Art

A premium, modern portfolio website for **Anmay Art**, the personal brand of **Anmay Saha**, a Civil Engineer, Building Planner, and Construction Professional (Founder & Proprietor of **Green Constructions**), based in Agartala, Tripura, India.

**Live site**: https://anmaysaha-hm3m.vercel.app

---

## Project Brief

This is a portfolio and personal-brand website that showcases his engineering and construction work as well as his personal artworks. It is designed to feel premium, trustworthy, and clean, like a boutique architecture and design studio site rather than a generic template.

## Tech Stack
- React + Vite
- Tailwind CSS
- Supabase (database, auth and storage for images)
- Fully responsive: mobile, tablet, desktop

## Color Palette
- Primary Green (brand/accent): `#5C7A3D` (olive-forest green), used for the logo "A" icon, active nav underline, primary buttons, icons and section labels
- Dark Green (secondary): `#3A5227`, used for dark cards and badges (e.g. the "Founder & Proprietor" badge on the hero image)
- Near-Black (text/footer): `#1A1A1A`, used for the footer background and headings
- Off-White / Cream background: `#FAFAF7`
- Light Gray section background: `#F5F5F2`
- White: `#FFFFFF`
- Gold/Mustard accent (signature text, "Build" highlight word): `#B8935A`
- Body text gray: `#6B6B6B`

**Typography:** an elegant serif for big headline text (e.g. "I Design. I Plan. I Build with Purpose.") paired with a clean sans-serif for body, nav and UI text. A signature/script font style is used only for the "Anmay Saha" signature graphic elements.

## Site Structure / Pages
1. **Home**: full landing page (sections below)
2. **About**: extended bio, credentials, timeline
3. **Services**: all services in detail
4. **Projects**: full portfolio grid/gallery, filterable by category (Residential, Commercial, Interior, Renovation)
5. **Artworks**: gallery of personal artworks, separate from construction projects
6. **Life**: personal/lifestyle blog-style page
7. **Blog / News**: news and articles list plus individual post pages (admin-managed, see below)
8. **Contact**: contact form, map and details

## Header / Navigation
- Logo: green "A" icon mark and "ANMAY ART" wordmark, with the small tagline "Design | Plan | Build" underneath
- Nav links: Home, About, Services, Projects, Artworks, Life, Blog, Contact
- Active link shown with a green underline
- Right side: "Get a Quote" pill button, green background, white text, arrow icon
- Sticky on scroll, white background, subtle shadow when scrolled

## Home Page Sections (in order)

### 1. Hero Section
- Small green uppercase label: "DESIGNING SPACES. BUILDING DREAMS."
- Large serif headline: "I Design. I Plan. I Build with Purpose." with the word "Build" styled in the primary green
- Subtext: "I'm **Anmay Saha**, a Civil Engineer, Building Planner & Construction Professional creating sustainable, functional and aesthetic spaces that stand the test of time."
- 4 credential badges in a row, each with a small icon: "B.Tech Civil Engineer", "M.Tech Materials Science", "AMC Approved Building Planner", "AMIE (Associate Member)"
- Two buttons: "Explore My Work →" (solid green) and "Contact Me →" (outlined)
- Right side: large hero photo of a modern white multi-story residence with plants and balconies, with a diagonal-cut mask edge on the left side
- Overlaid dark-green card on the bottom-left of the hero image with a signature-style "Anmay Saha" script text, "Founder & Proprietor", "Green Constructions"
- Faint decorative building line-art illustration behind the text on the left (subtle, low opacity)

### 2. About Me Section
- Left: photo of Anmay Saha (professional headshot, arms crossed, blazer, glasses) on a soft green organic blob-shaped background
- Right: green label "ABOUT ME", heading "Crafting Spaces with Passion & Precision.", a paragraph about blending an engineering foundation with a creative eye for design, a script-style signature graphic, and a "Know More About Me →" outlined button
- Far right: 2x2 stat grid in a light card: "8+ Years of Experience", "150+ Projects Completed", "100+ Happy Clients", "5★ Client Rating", each with a small green icon

### 3. Services Section (light gray background)
- Green label "WHAT I DO", heading "Services That I Offer"
- 6 service cards in a row (responsive grid, wraps on smaller screens), each with icon, title and short description:
  1. Building Planning & Design
  2. Construction Management
  3. Interior Design Solutions
  4. Renovation & Remodeling
  5. Structural Consultation
  6. AMC Approved Building Planner
- Centered green "View All Services →" button below the cards

### 4. Featured Projects Section
- Green label "FEATURED PROJECTS", heading "Some of My Recent Work", "View All Projects →" button at the top right
- 4-column image grid (responsive); each card has a project photo, a small icon, the project name and the location ("Agartala, Tripura")
- Example cards: Modern Residence, Commercial Complex, Residential Building, Interior Project
- Carousel dot indicators below (3 dots) suggesting more projects load or slide

### 5. Education & Artworks Split Section (light green-tinted background on the left half)
- Left half: green label "EDUCATION & CREDENTIALS" with a checklist (green checkmarks): B.Tech in Civil Engineering, M.Tech in Materials Science, AMC Approved Building Planner, Associate Member – Institution of Engineers (India); a "Read More" button; plus a small quote card with a leaf icon: "My mission is to create sustainable and timeless spaces that enhance lives and communities."
- Right half: green label "ARTWORKS", a short line about expressing creativity through art, an "Explore Artworks →" outlined button, and a row of 3 small square artwork thumbnail images

### 6. CTA Banner (dark green background, full width)
- Left: small label "LET'S WORK TOGETHER", heading "Have a Project in Mind?", subtext "Let's create something amazing together."
- Middle: 3 small feature bullets with icons: "Custom Solutions – Tailored to your needs", "Quality Assurance – We never compromise", "On-Time Delivery – Your time matters"
- Right: white pill button "Get Free Consultation →"

### 7. Footer (near-black background)
- Column 1: logo, tagline, short description and social icons (Facebook, Instagram, LinkedIn, YouTube)
- Column 2: Quick Links (Home, About, Services, Projects, Artworks, Life, Blog, Contact)
- Column 3: Services list
- Column 4: Contact info (phone, email, address "Agartala, Tripura, India", working hours "Mon - Sat: 9:00 AM - 7:00 PM")
- Column 5: Newsletter signup, with an email input and a green send button
- Bottom bar: "© 2025 Anmay Art. All Rights Reserved." plus Privacy Policy and Terms of Service links

## Other Pages (brief)
- **About page**: full bio, career timeline, credentials in detail, philosophy
- **Services page**: each service from the home grid gets its own detailed block with an image
- **Projects page**: full gallery grid with category filter tabs (All / Residential / Commercial / Interior / Renovation); each project opens a detail view (image gallery, description, location, year)
- **Artworks page**: pure image gallery/masonry grid of artworks, with a lightbox on click
- **Life page**: personal blog-style page with photos and short posts about personal interests and lifestyle
- **Blog/News page**: card grid of news and articles (image, title, date, excerpt) pulled from admin-managed content; an individual post page shows the full content
- **Contact page**: contact form (name, email, phone, message) that saves submissions to Supabase, plus an embedded Google Map, address, phone, email and working hours

## Admin Panel

A separate, hidden admin panel is accessible only by direct URL. It is not linked anywhere in the public site navigation or footer.

### Admin Login
- Login screen with email and password fields
- Real authentication through Supabase Auth (email/password provider)
- Admin access is granted through the `user_roles` table (role `admin`)
- Supabase Row Level Security ensures only the admin can write, update or delete content; public visitors can only read
- A "Logout" button in the admin dashboard header

### Admin Dashboard Features
A clean, simple dashboard with these management sections:

1. **News / Blog Manager**
   - List of all posts (title, date, published/draft status)
   - Add new post: title, category, cover image upload (Supabase Storage), short excerpt, full content, publish date
   - Edit and delete existing posts
   - Toggle published/draft

2. **Projects Manager**
   - Add, edit and delete portfolio projects: title, category (Residential/Commercial/Interior/Renovation), location, year, cover image and gallery images (multiple upload), description
   - Reorder, and feature a project on the homepage (toggle "Show on homepage")

3. **Artworks Manager**
   - Add, edit and delete artwork entries: title, image upload, medium/description

4. **Services Manager**
   - Add, edit, delete and reorder the services shown on the homepage and services page: icon, title, short description, full description

5. **Stats Manager**
   - Edit the 4 stat numbers in the About section (Years of Experience, Projects Completed, Happy Clients, Rating)

6. **Contact Submissions**
   - Read-only inbox of messages submitted through the public Contact form (name, email, phone, message, date)

7. **Site Settings**
   - Edit the basic contact info shown in the footer and contact page: phone, email, address, working hours, social media links

### Admin UI Style
- Clean, minimal dashboard using the same green and white brand colors, simplified (white background, sidebar with green active states)
- Table/list views with "Add New" buttons and edit and delete icon buttons
- Image uploads preview before saving and are stored in Supabase Storage
- Confirmation before delete actions
- Success and error toast notifications on save

## Data
Supabase tables: `posts` (news/blog), `projects`, `artworks`, `services`, `stats`, `contact_submissions`, `site_settings`, `user_roles`.
Public pages read live from these tables, so whatever is uploaded from the admin panel appears on the live site right away.

## Quality Bar
- The site's job is to make visiting clients trust Anmay Saha's professionalism and want to hire him, so it prioritizes a premium, uncluttered, confident visual design: generous whitespace, consistent spacing, smooth hover states on cards and buttons, subtle scroll-in animations on sections, and sharp, high-quality image placeholders until real photos are uploaded through the admin panel.
- Every future feature should be additive: existing sections and design are not altered or removed when new features are added.

---

## Development

You need [Node.js](https://nodejs.org) and npm installed.

```sh
git clone https://github.com/saikatCS/anmaysaha.git
cd anmaysaha
npm install
npm run dev
```

### Environment variables

Create a `.env` file in the project root (never commit it):

```sh
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

### Build

```sh
npm run build
```

### Deployment

The site is deployed on Vercel. Add the same environment variables in the Vercel project settings before deploying.

---

Managed and developed by [WebInnovex 360](https://webinnovex360.online).
