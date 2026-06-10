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
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-transparent bg-transparent">
      <input
        id="site-nav-toggle"
        type="checkbox"
        className="peer/nav sr-only"
        aria-hidden
      />

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
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
            href="/sign-in"
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

        <label
          htmlFor="site-nav-toggle"
          className="-mr-2 inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-navy md:hidden"
        >
          <Menu className="size-5 peer-checked/nav:hidden" aria-hidden />
          <X className="hidden size-5 peer-checked/nav:block" aria-hidden />
          <span className="sr-only">Toggle menu</span>
        </label>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-16 z-50 -translate-y-1 opacity-0 transition-all duration-200 peer-checked/nav:pointer-events-auto peer-checked/nav:translate-y-0 peer-checked/nav:opacity-100 md:hidden">
        <div className="mx-4 rounded-2xl border border-line bg-white p-4 shadow-float">
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-navy hover:bg-mist"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-line pt-3">
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ variant: "outline", size: "md" }))}
            >
              Sign in
            </Link>
            <Link
              href="/#cta"
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
