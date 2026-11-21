import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Award, Expand, Play, X } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { useArtworks, useBlogVideos, useCertificates, useProjects, type Artwork } from "@/lib/remote-content";
import { seo, crumbs } from "@/lib/seo";

export const Route = createFileRoute("/achievement")({
  head: () =>
    seo({
      path: "/achievement",
      title: "Achievements & Creative Journey | Anmay Art",
      description:
        "Explore Anmay Saha’s artistic creations, architectural projects and creative journey.",
      jsonLd: [
        crumbs([
          ["Home", "/"],
          ["Achievements", "/achievement"],
        ]),
      ],
    }),
  component: Achievement,
});

type VideoItem = { id: string; embedUrl: string; title: string; description?: string };

const artWorldVideos: VideoItem[] = [
  {
    id: "eixqBf1hlMM",
    embedUrl: "https://www.youtube.com/embed/eixqBf1hlMM",
    title: "Handmade Clay Ganesh Idol",
    description: "A beautiful handmade clay Ganesh idol created by Anmay Saha.",
  },
  {
    id: "m4jvcOSqr_0",
    embedUrl: "https://www.youtube.com/embed/m4jvcOSqr_0",
    title: "ArtWorld Video 2",
    description: "A video showcasing the artistic process of creating a unique piece.",
  },
  {
    id: "DhwGFAyVjQ8",
    embedUrl: "https://www.youtube.com/embed/DhwGFAyVjQ8",
    title: "ArtWorld Video 3",
  },
  {
    id: "lhtmTt80FR4",
    embedUrl: "https://www.youtube.com/embed/lhtmTt80FR4",
    title: "ArtWorld Video 4",
  },
  {
    id: "EsiZ1qBaxNA",
    embedUrl: "https://www.youtube.com/embed/EsiZ1qBaxNA",
    title: "ArtWorld Video 5",
  },
];

const constructionVideos: VideoItem[] = [
  {
    id: "LIQFULL-L7Q",
    embedUrl: "https://www.youtube.com/embed/LIQFULL-L7Q",
    title: "Modern G+2 Residence at Gandhighat, Agartala | Designed by Er. Anmay Saha",
  },
  {
    id: "koUeMF4IqB0",
    embedUrl: "https://www.youtube.com/embed/koUeMF4IqB0",
    title: "Modern interior designing of 3BHK flat by Anmay",
  },
  {
    id: "8RWn8ijwnvE",
    embedUrl: "https://www.youtube.com/embed/8RWn8ijwnvE",
    title: "Construction Short Insight",
  },
];

function AutoGallery<T extends { image: string; title: string; slug: string }>({
  items,
  kind,
  onArtwork,
}: {
  items: T[];
  kind: "artwork" | "project" | "certificate";
  onArtwork?: (item: T) => void;
}) {
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    },
    [],
  );

  const pauseForInteraction = () => {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
  };
  const resumeAfterInteraction = () => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 900);
  };

  if (!items.length) {
    return (
      <p className="rounded-3xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
        No {kind}s are available yet.
      </p>
    );
  }

  const loopItems = [...items, ...items];
  return (
    <div
      className="achievement-window -mx-5 overflow-x-auto px-5 pb-4 scrollbar-none"
      aria-label={`${kind} gallery, swipe to explore`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onPointerDown={pauseForInteraction}
      onPointerUp={resumeAfterInteraction}
      onPointerCancel={resumeAfterInteraction}
    >
      <div className={`achievement-track flex gap-6 ${paused ? "[animation-play-state:paused]" : ""}`}>
        {loopItems.map((item, index) => (
          <div key={`${item.title}-${index}`} className="w-[min(78vw,300px)] shrink-0">
            {kind === "artwork" || kind === "certificate" ? (
              <button
                type="button"
                className="group block w-full text-left bg-white p-3 rounded-[28px] border border-stone-200/80 shadow-[0_8px_30px_rgba(44,53,43,0.06)] transition-all duration-300 hover:shadow-[0_14px_40px_rgba(106,46,192,0.12)] hover:border-primary/40"
                onClick={() => onArtwork && onArtwork(item)}
              >
                <div className={`overflow-hidden rounded-[20px] bg-stone-100 ${kind === "certificate" ? "min-h-[220px]" : "aspect-[4/5]"}`}>
                  {kind === "certificate" && "fileType" in item && item.fileType === "application/pdf" ? (
                    <div className="grid h-full place-items-center bg-stone-100 text-sm font-semibold text-primary">Open PDF certificate</div>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className={`w-full transition duration-700 ${kind === "certificate" ? "h-auto max-h-[420px] object-contain" : "h-full object-cover group-hover:scale-105"}`}
                    />
                  )}
                </div>
                <div className="p-2 pt-3">
                  <p className="text-base font-serif font-bold text-ink group-hover:text-primary transition-colors truncate">{item.title}</p>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                    {kind === "certificate" ? "View Certificate" : "Preview"} <Expand size={13} />
                  </span>
                </div>
              </button>
            ) : (
              <Link
                to="/projects/$slug"
                params={{ slug: item.slug }}
                className="group block bg-white p-3 rounded-[28px] border border-stone-200/80 shadow-[0_8px_30px_rgba(44,53,43,0.06)] transition-all duration-300 hover:shadow-[0_14px_40px_rgba(106,46,192,0.12)] hover:border-primary/40"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-[20px] bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-2 pt-3">
                  <p className="text-base font-serif font-bold text-ink group-hover:text-primary transition-colors truncate">{item.title}</p>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                    View project <ArrowUpRightIcon />
                  </span>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrowUpRightIcon() {
  return <ArrowRight size={14} className="-rotate-45" aria-hidden />;
}

function VideoAutoCarouselSlider({
  videos,
  label,
  activePlayingVideo,
  setActivePlayingVideo,
}: {
  videos: VideoItem[];
  label: string;
  activePlayingVideo: string | null;
  setActivePlayingVideo: (id: string | null) => void;
}) {
  const [index, setIndex] = useState(0);
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const autoScrollTimer = useRef<number | null>(null);
  const isAnyVideoPlaying = videos.some(v => activePlayingVideo === v.embedUrl);

  useEffect(() => {
    if (isAnyVideoPlaying) {
      if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
      return;
    }

    autoScrollTimer.current = window.setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 4500);

    return () => {
      if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    };
  }, [isAnyVideoPlaying, videos.length]);

  const move = (direction: 1 | -1) => {
    setActivePlayingVideo(null);
    setIndex((value) => (videos.length ? (value + direction + videos.length) % videos.length : 0));
  };

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-[32px] p-1">
        <div 
          ref={sliderTrackRef}
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {videos.map((current, idx) => {
            const isPlaying = activePlayingVideo === current.embedUrl;
            return (
              <div key={current.id + idx} className="w-full shrink-0 px-2">
                <div className="overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_12px_40px_rgba(44,53,43,0.08)] transition-all duration-300">
                  <div className="aspect-video bg-stone-900 relative">
                    {isPlaying ? (
                      <iframe
                        title={current.title}
                        src={`${current.embedUrl}?autoplay=1&rel=0`}
                        className="h-full w-full"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActivePlayingVideo(current.embedUrl)}
                        className="group relative h-full w-full text-left block"
                      >
                        <img
                          src={`https://i.ytimg.com/vi/${current.id}/hqdefault.jpg`}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:opacity-100 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/15 transition-colors" />
                        <span className="absolute inset-0 grid place-items-center">
                          <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-white shadow-xl transition transform group-hover:scale-110">
                            <Play fill="currentColor" size={24} className="ml-0.5" />
                          </span>
                        </span>
                        <span className="sr-only">Play {current.title}</span>
                      </button>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-4 p-6 bg-white">
                    <div className="min-w-0">
                      <h3 className="text-lg font-serif font-bold text-ink truncate">{current.title}</h3>
                      {current.description && (
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{current.description}</p>
                      )}
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => move(-1)}
                        aria-label={`Previous ${label} video`}
                        className="grid h-11 w-11 place-items-center rounded-full border border-stone-300 text-stone-700 transition hover:bg-stone-100"
                      >
                        <ArrowLeft size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(1)}
                        aria-label={`Next ${label} video`}
                        className="grid h-11 w-11 place-items-center rounded-full bg-primary text-white transition hover:opacity-90 shadow-md"
                      >
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2" aria-hidden>
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActivePlayingVideo(null); setIndex(i); }}
            className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-primary" : "w-2.5 bg-stone-300"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function Achievement() {
  const artworks = useArtworks();
  const projects = useProjects();
  const remoteArtVideos = useBlogVideos("artworld");
  const remoteConstructionVideos = useBlogVideos("construction");
  const remoteCertificates = useCertificates();
  const [preview, setPreview] = useState<(Artwork & { fileType?: string }) | null>(null);
  const [activePlayingVideo, setActivePlayingVideo] = useState<string | null>(null);
  const artVideos = [...artWorldVideos, ...remoteArtVideos.map((video) => ({ id: video.videoId, embedUrl: video.embedUrl, title: video.title, description: video.title }))];
  const constructionBlogVideos = [...constructionVideos, ...remoteConstructionVideos.map((video) => ({ id: video.videoId, embedUrl: video.embedUrl, title: video.title, description: video.title }))];
  const certificates = remoteCertificates.map((certificate) => ({
    slug: `certificate-${certificate.id}`,
    title: certificate.title,
    image: certificate.fileUrl,
    fileType: certificate.fileType,
  }));

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <SiteLayout>
      <div className="font-montserrat">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-stone-200/80 bg-stone-50 py-20 md:py-28">
          <div
            aria-hidden
            className="grid-lines absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)] opacity-40"
          />
          <div className="relative mx-auto max-w-7xl px-5 text-center lg:px-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs tracking-[0.2em] uppercase mb-4">
              Recognition &amp; milestones
            </span>
            <h1 className="mx-auto max-w-3xl text-4xl font-serif font-bold text-ink md:text-6xl leading-[1.15]">
              Achievements &amp; Creative Journey
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Explore Anmay Saha’s artistic creations, architectural projects and creative journey.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => scrollTo("artworld-gallery")}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary text-white px-8 text-sm font-bold shadow-lg transition-transform active:scale-95"
              >
                ArtWorld
              </button>
              <button
                type="button"
                onClick={() => scrollTo("construction-gallery")}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary/30 px-8 text-sm font-bold text-ink bg-white shadow-sm transition-transform active:scale-95 hover:bg-primary/5"
              >
                Construction
              </button>
            </div>
          </div>
        </section>

        {/* ARTWORLD GALLERY */}
        <section id="artworld-gallery" className="scroll-mt-24 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="ArtWorld"
              title="ArtWorld Gallery"
              text="Creative studies and artwork from the Anmay Art practice."
            />
            <AutoGallery
              items={artworks}
              kind="artwork"
              onArtwork={(item) => setPreview(item as Artwork)}
            />
            <div className="mt-12 text-center">
              <Link
                to="/artworks"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary text-white px-8 text-sm font-bold shadow-lg transition hover:opacity-95"
              >
                Load More Artworks <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ARTWORLD BLOG */}
        <section className="bg-stone-50 py-20 md:py-28 border-y border-stone-200/60">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="ArtWorld"
              title="ArtWorld Blog"
              text="Video stories and creative process. Auto-scrolling pauses instantly when any video is played."
            />
            <VideoAutoCarouselSlider
              videos={artVideos}
              label="ArtWorld"
              activePlayingVideo={activePlayingVideo}
              setActivePlayingVideo={setActivePlayingVideo}
            />
          </div>
        </section>

        {/* CONSTRUCTION GALLERY */}
        <section id="construction-gallery" className="scroll-mt-24 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Construction"
              title="Construction Gallery"
              text="Architectural and construction projects shaped with purpose."
            />
            <AutoGallery items={projects} kind="project" />
            <div className="mt-12 text-center">
              <Link
                to="/projects"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary text-white px-8 text-sm font-bold shadow-lg transition hover:opacity-95"
              >
                Load More Projects <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* CONSTRUCTION BLOG */}
        <section className="bg-stone-50 py-20 md:py-28 border-t border-stone-200/60">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Construction"
              title="Construction Blog"
              text="Stories from planning, design and building."
            />
            <VideoAutoCarouselSlider
              videos={constructionBlogVideos}
              label="Construction"
              activePlayingVideo={activePlayingVideo}
              setActivePlayingVideo={setActivePlayingVideo}
            />
          </div>
        </section>

        {/* CERTIFICATE GALLERY SECTION */}
        <section className="bg-background py-20 md:py-28 border-t border-stone-200/60">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Credentials & Honors"
              title="Certificate Gallery"
              text="Official recognitions, professional accreditations, and certifications."
            />
            <AutoGallery
              items={certificates}
              kind="certificate"
              onArtwork={(item) => setPreview(item as unknown as Artwork & { fileType?: string })}
            />
          </div>
        </section>
      </div>

      {preview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${preview.title} enlarged`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5 backdrop-blur-sm"
          onClick={() => setPreview(null)}
        >
          <button
            type="button"
            aria-label="Close artwork preview"
            onClick={() => setPreview(null)}
            className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
          >
            <X size={20} />
          </button>
          {preview.fileType === "application/pdf" ? (
            <iframe
              src={preview.image}
              title={preview.title}
              className="h-[90vh] w-full max-w-5xl rounded-2xl bg-white"
              onClick={(event) => event.stopPropagation()}
            />
          ) : (
            <img
              src={preview.image}
              alt={preview.title}
              className="max-h-[90vh] max-w-full object-contain rounded-2xl shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            />
          )}
        </div>
      )}
    </SiteLayout>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="text-primary tracking-[0.2em] uppercase font-bold text-xs">{eyebrow}</p>
      <h2
        id={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
        className="mt-3 text-3xl font-serif font-bold text-ink md:text-5xl tracking-tight"
      >
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}