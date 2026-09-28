<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the TanStack Start routing shell required by this hosted project; use only public file routes, since swapping the framework breaks deployment.
- Public portfolio content lives in local typed data and /public/assets; never query backend services, since the site is static by design.
- Keep Green Constructions project stories in static typed data with empty image arrays until real project-specific photography is supplied, to avoid misrepresenting concept imagery as built work.
- Phones (<768px) use src/components/mobile.tsx (header, menu, bottom nav, footer, home) switched via md: CSS classes in SiteLayout; why: dedicated mobile design without duplicating routes.
- Green Constructions phones use a dedicated public-page component and scoped stylesheet, switched at the md breakpoint; why: the mobile case-study/navigation experience must not alter the desktop editorial page.
- Green Constructions mobile imagery uses existing static image assets in `<img>` elements, and project planning visuals remain labelled illustrative until verified project photographs arrive; why: avoid implying an illustration documents completed work.
- Existing site imagery is imported directly from PNG/JPG files, not `.asset.json` pointers; why: the owner needs straightforward static image references while keeping the original artwork unchanged.
- Keep Green Constructions page copy in one shared local content module read by mobile and desktop; why: future text changes must not drift between layouts.

- Admin-uploaded artworks, recent work and GC projects load in the browser from Lovable Cloud via src/lib/remote-content.ts and are appended to the static data; why: owner edits content at /admin without code changes.
