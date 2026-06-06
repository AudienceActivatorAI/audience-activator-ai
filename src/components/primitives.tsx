import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-6 lg:px-8", className)}
      {...props}
    />
  );
}

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  tone?: "light" | "mist" | "dark";
};

export function Section({
  className,
  tone = "light",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-tone={tone}
      className={cn(
        "relative scroll-mt-24 py-20 sm:py-28 lg:py-32",
        tone === "mist" && "bg-mist",
        tone === "dark" && "bg-navy-900 text-white",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function Eyebrow({
  className,
  children,
  tone = "light",
}: {
  className?: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2",
        tone === "dark" ? "text-blue-300" : "text-blue-600",
        className,
      )}
    >
      <span
        className={cn(
          "inline-block h-px w-6",
          tone === "dark" ? "bg-blue-300/60" : "bg-blue/50",
        )}
        aria-hidden
      />
      {children}
    </span>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]",
          tone === "dark" ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-lg leading-relaxed",
            tone === "dark" ? "text-white/65" : "text-slate",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
