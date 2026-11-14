import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import appCss from "../styles.css?url";
import { Button } from "@/components/ui/button";

function GlobalPreloader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    let exitTimer: number | undefined;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setExiting(true);
      exitTimer = window.setTimeout(() => setVisible(false), 260);
    };
    const play = () => {
      video?.play().catch(() => undefined);
    };

    video?.addEventListener("ended", finish);
    play();

    return () => {
      video?.pause();
      video?.removeEventListener("ended", finish);
      if (exitTimer) window.clearTimeout(exitTimer);
    };
  }, []);

  if (!visible) return null;
  return (
    <div
      role="status"
      aria-label="Loading Anmay Art"
      className={`fixed inset-0 z-[200] grid place-items-center bg-[#FFFFFF] transition-opacity duration-250 ${exiting ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <video
        ref={videoRef}
        src="/preloder.mp4"
        muted
        autoPlay
        playsInline
        preload="auto"
        aria-hidden="true"
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: ({ children }: { children: ReactNode }) => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  ),
  component: () => (
    <>
      <GlobalPreloader />
      <Outlet />
    </>
  ),
  notFoundComponent: () => (
    <main className="mx-auto max-w-4xl px-5 py-32 text-center">
      <h1 className="text-6xl">Page not found</h1>
      <Button asChild className="mt-8">
        <Link to="/">Return home</Link>
      </Button>
    </main>
  ),
});
