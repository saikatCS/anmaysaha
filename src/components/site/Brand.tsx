import logo from "@/assets/anmay-art-logo.png";

export function Brand({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <img
        src={logo}
        alt=""
        width={44}
        height={44}
        className={`${compact ? "h-9 w-9" : "h-10 w-10"} shrink-0 object-contain ${tone === "light" ? "rounded-md bg-cream p-1" : ""}`}
      />
      <span className="min-w-0 leading-tight">
        <span
          className={`block truncate font-serif ${compact ? "text-[1.05rem]" : "text-lg"} font-bold tracking-wide ${
            tone === "light" ? "text-cream" : "text-foreground"
          }`}
        >
          ANMAY ART
        </span>
        <span className={`block truncate text-[0.62rem] tracking-[0.18em] uppercase ${tone === "light" ? "text-cream/60" : "text-muted-foreground"}`}>
          Design | Plan | Build
        </span>
      </span>
    </span>
  );
}
