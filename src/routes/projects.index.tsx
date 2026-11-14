import { seo, crumbs } from "@/lib/seo";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { ProjectGrid } from "@/components/site/Sections";
import { useProjects } from "@/lib/remote-content";

export const Route = createFileRoute("/projects/")({
  head: () =>
    seo({
      path: "/projects",
      title: "Projects | Building Planning & Construction Portfolio — Anmay Saha, Tripura",
      description:
        "Residential, commercial and interior projects from the building planning and construction portfolio of Anmay Saha, Civil Engineer in Agartala, Tripura.",
      jsonLd: [
        crumbs([
          ["Home", "/"],
          ["Projects", "/projects"],
        ]),
      ],
    }),
  component: Projects,
});

const UNNATI_FACEBOOK = "https://www.facebook.com/";
const BOOKS_PDF_PATH: string | null = null;

const filterCategories = [
  "Building Planning",
  "Construction",
  "Interior Planning",
  "Interior Designing",
  "Renovation",
] as const;

type FilterCategory = (typeof filterCategories)[number];
type Category = FilterCategory | "ArtWorld";
type SpecialCategory = "Books" | "Unnati" | "Cretoverse";

const allCategories: readonly (Category | SpecialCategory)[] = [
  ...filterCategories,
  "ArtWorld",
  "Books",
  "Unnati",
  "Cretoverse",
];

function displayCategory(category: string | null | undefined): FilterCategory | null {
  const normalized = category?.trim().toLowerCase();
  if (!normalized) return null;
  if (
    ["residential", "planning", "building planning", "building planning & design"].includes(
      normalized,
    )
  ) {
    return "Building Planning";
  }
  if (["commercial", "construction", "construction management"].includes(normalized)) {
    return "Construction";
  }
  if (["interior", "interior planning"].includes(normalized)) {
    return "Interior Planning";
  }
  if (normalized === "interior designing") return "Interior Designing";
  if (["renovation", "renovation & remodeling"].includes(normalized)) return "Renovation";
  return null;
}

function Projects() {
  const projects = useProjects();
  const [category, setCategory] = useState<Category>("Building Planning");
  const filtered =
    category === "ArtWorld"
      ? []
      : projects.filter((project) => displayCategory(project.category) === category);

  const handleCategoryClick = (selected: Category | SpecialCategory) => {
    if (selected === "ArtWorld") {
      setCategory(selected);
      return;
    }
    if (selected === "Books") {
      if (BOOKS_PDF_PATH) window.open(BOOKS_PDF_PATH, "_blank", "noopener,noreferrer");
      return;
    }
    if (selected === "Unnati") {
      window.open(UNNATI_FACEBOOK, "_blank", "noopener,noreferrer");
      return;
    }
    if (selected === "Cretoverse") {
      window.open("https://cretoverse.com", "_blank", "noopener,noreferrer");
      return;
    }
    setCategory(selected);
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Selected projects"
        title="Spaces with a point of view."
        subtitle="A selection of residential, commercial and interior concepts."
      />
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-10 flex flex-wrap gap-2" aria-label="Project categories">
          {allCategories.map((item) => {
            const isFilter = filterCategories.includes(item as FilterCategory);
            const isActive = isFilter
              ? category === item
              : item === "ArtWorld" && category === "ArtWorld";
            const isBooksUnavailable = item === "Books" && !BOOKS_PDF_PATH;

            if (item === "ArtWorld") {
              return (
                <Link
                  key={item}
                  to="/artworks"
                  onClick={() => handleCategoryClick(item)}
                  className={`relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full px-5 text-sm font-semibold transition-all duration-300 ${
                    isActive ? "btn-brand shadow-lift" : "btn-ghost-brand hover:-translate-y-0.5"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item}
                  <span
                    aria-hidden
                    className={`absolute inset-x-5 bottom-1 h-0.5 rounded-full bg-current transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              );
            }

            if (item === "Books") {
              return (
                <Button
                  key={item}
                  type="button"
                  variant={isActive ? "default" : "outline"}
                  className={`relative h-10 overflow-hidden rounded-full px-5 text-sm font-semibold transition-all duration-300 ${
                    isActive ? "btn-brand shadow-lift" : "btn-ghost-brand hover:-translate-y-0.5"
                  } ${isBooksUnavailable ? "cursor-not-allowed opacity-70" : ""}`}
                  onClick={() => handleCategoryClick(item)}
                  disabled={isBooksUnavailable}
                  title={
                    isBooksUnavailable
                      ? "Books PDF unavailable: add the PDF file to public/"
                      : undefined
                  }
                >
                  {item}
                  <span
                    aria-hidden
                    className={`absolute inset-x-5 bottom-1 h-0.5 rounded-full bg-current transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Button>
              );
            }

            if (item === "Unnati" || item === "Cretoverse") {
              const href = item === "Unnati" ? UNNATI_FACEBOOK : "https://cretoverse.com";
              return (
                <a
                  key={item}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCategoryClick(item)}
                  className="relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full px-5 text-sm font-semibold btn-ghost-brand transition-all duration-300 hover:-translate-y-0.5"
                >
                  {item}
                  <span
                    aria-hidden
                    className="absolute inset-x-5 bottom-1 h-0.5 rounded-full bg-current opacity-0 transition-opacity duration-300"
                  />
                </a>
              );
            }

            return (
              <Button
                key={item}
                type="button"
                variant={isActive ? "default" : "outline"}
                className={`relative h-10 overflow-hidden rounded-full px-5 text-sm font-semibold transition-all duration-300 ${
                  isActive ? "btn-brand shadow-lift" : "btn-ghost-brand hover:-translate-y-0.5"
                }`}
                onClick={() => handleCategoryClick(item)}
                aria-pressed={isActive}
              >
                {item}
                <span
                  aria-hidden
                  className={`absolute inset-x-5 bottom-1 h-0.5 rounded-full bg-current transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Button>
            );
          })}
        </div>
        {category === "ArtWorld" ? (
          <p className="py-16 text-muted-foreground">Opening ArtWorld artworks…</p>
        ) : filtered.length ? (
          <ProjectGrid items={filtered} />
        ) : (
          <p className="py-16 text-muted-foreground">
            No {category.toLowerCase()} projects are available yet.
          </p>
        )}
      </section>
    </SiteLayout>
  );
}
