import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBottomNav, MobileFooter, MobileHeader } from "@/components/mobile";

// `anmay` scopes the purple Anmay Art theme (see styles.css) to these pages only.
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="anmay flex min-h-screen flex-col bg-background text-foreground">
      <div className="sticky top-0 z-50 hidden md:block"><Header /></div>
      <MobileHeader />
      <main className="flex-1">{children}</main>
      <div className="hidden md:block"><Footer /></div>
      <MobileFooter />
      <MobileBottomNav />
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-stone">
      <div aria-hidden className="grid-lines absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div aria-hidden className="hero-glow absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 py-14 md:py-20 lg:px-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl leading-[1.1] md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{subtitle}</p>}
        <div className="rule-brand mt-7" />
      </div>
    </section>
  );
}
