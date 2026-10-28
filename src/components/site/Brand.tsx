import logo from "@/assets/anmay-art-logo.png";

export function Brand({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <img
        src={logo}
        alt=""
        width={44}
        height={44}
        className={`${compact ? "h-9 w-9" : "h-10 w-10"} shrink-0 object-contain ${tone === "light" ? "rounded-lg bg-white/95 p-1.5" : ""}`}
      />
      <span className="min-w-0 leading-tight">
        <span
          className={`block truncate font-serif ${compact ? "text-[1.05rem]" : "text-lg"} font-bold tracking-wide ${
            tone === "light" ? "text-white" : "text-foreground"
          }`}
        >
          ANMAY ART
        </span>
        <span className={`block truncate text-[0.7rem] font-medium ${tone === "light" ? "text-white/65" : "text-muted-foreground"}`}>
          Design · Plan · Build
        </span>
      </span>
    </span>
  );
}
