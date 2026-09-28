import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBottomNav, MobileFooter, MobileHeader } from "@/components/mobile";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="m-pb flex min-h-screen flex-col bg-background md:pb-0">
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
    <section className="border-b border-border bg-stone">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-bold lg:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-muted-foreground">{subtitle}</p>}
      </div>
    </section>
  );
}
