import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  tone?: "light" | "dark";
  withDescriptor?: boolean;
  className?: string;
  href?: string;
};

const sizing = "text-[0.95rem] sm:text-base";

export function Logo({
  tone = "light",
  withDescriptor = false,
  className,
  href = "/",
}: LogoProps) {
  const dark = tone === "dark";
  return (
    <Link
      href={href}
      aria-label="Audience Activator AI — home"
      className={cn("group inline-flex flex-col leading-none", className)}
    >
      <span
        className={cn(
          "font-semibold tracking-[0.14em] uppercase",
          sizing,
        )}
      >
        <span className={dark ? "text-white" : "text-navy"}>Audience</span>{" "}
        <span className="text-blue">Activator</span>{" "}
        <span
          className={cn(
            "align-top text-[0.62em] font-medium tracking-[0.18em]",
            dark ? "text-white/55" : "text-slate",
          )}
        >
          AI
        </span>
      </span>
      {withDescriptor ? (
        <span
          className={cn(
            "mt-1.5 font-mono text-[0.62rem] tracking-[0.22em] uppercase",
            dark ? "text-white/45" : "text-slate",
          )}
        >
          Dealer Intelligence Infrastructure
        </span>
      ) : null}
    </Link>
  );
}
