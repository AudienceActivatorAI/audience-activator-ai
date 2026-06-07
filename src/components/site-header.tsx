"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Platform", href: "/#platform" },
  { label: "Solution", href: "/#solution" },
  { label: "Products", href: "/products" },
  { label: "Outcomes", href: "/#outcomes" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-white/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-navy/70 transition-colors hover:bg-navy/5 hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="#"
            className="px-3 py-2 text-sm font-medium text-navy/70 transition-colors hover:text-navy"
          >
            Sign in
          </Link>
          <Link
            href="/#cta"
            className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
          >
            Request Demo
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-full text-navy md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu — absolute so collapsed panel does not inflate header height */}
      <div
        className={cn(
          "absolute inset-x-0 top-16 z-50 md:hidden transition-all duration-200",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="mx-4 rounded-2xl border border-line bg-white p-4 shadow-float">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-navy hover:bg-mist"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-line pt-3">
            <Link
              href="#"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ variant: "outline", size: "md" }))}
            >
              Sign in
            </Link>
            <Link
              href="/#cta"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ variant: "primary", size: "md" }))}
            >
              Request Demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
