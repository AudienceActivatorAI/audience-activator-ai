"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, LayoutDashboard, Loader2 } from "lucide-react";
import { Container, Eyebrow } from "@/components/primitives";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-navy placeholder:text-slate/60 outline-none transition-colors focus:border-blue/40 focus:ring-2 focus:ring-blue/10";

export function SignInPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "pending">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    window.setTimeout(() => setStatus("pending"), 500);
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-white pt-28 pb-16 sm:pt-32">
      <div className="bg-grid absolute inset-0 mask-fade-x" aria-hidden />
      <div
        className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-blue/10 blur-3xl"
        aria-hidden
      />

      <Container className="relative">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-line bg-white shadow-float lg:grid-cols-[1fr_1.05fr]">
          <div className="flex flex-col justify-between bg-navy p-8 text-white sm:p-10">
            <div>
              <Eyebrow tone="dark" className="text-blue-300">
                DealerOS Command Center
              </Eyebrow>
              <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
                One login for your entire dealer stack.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
                BDC Command, AI systems, market intel, sequences, and manager
                workflows — governed from a single command center behind Audience
                Activator AI.
              </p>
            </div>

            <ul className="mt-10 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <LayoutDashboard className="mt-0.5 size-4 shrink-0 text-blue-300" />
                Floor status, AI coverage, and appointment risk in one view
              </li>
              <li className="flex items-start gap-2">
                <LayoutDashboard className="mt-0.5 size-4 shrink-0 text-blue-300" />
                Shared shopper context across web, phone, chat, and marketplace
              </li>
              <li className="flex items-start gap-2">
                <LayoutDashboard className="mt-0.5 size-4 shrink-0 text-blue-300" />
                Built for licensed dealers on the full platform
              </li>
            </ul>
          </div>

          <div className="p-8 sm:p-10">
            {status === "pending" ? (
              <div className="flex h-full min-h-[360px] flex-col justify-center">
                <p className="font-mono text-[0.62rem] tracking-[0.16em] text-blue-600 uppercase">
                  Access pending
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-navy">
                  Command Center login is being enabled for your store.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  DealerOS sign-in connects here as stores are provisioned on the
                  platform. If you are an existing customer, your account team will
                  send credentials. New dealers can request a walkthrough below.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/#cta" className={cn(buttonVariants({ size: "lg" }))}>
                    Request demo
                    <ArrowRight />
                  </Link>
                  <Link
                    href="/products/dealeros"
                    className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                  >
                    About DealerOS
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-left text-sm font-medium text-blue-600 hover:underline"
                >
                  Back to sign in
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold tracking-tight text-navy">
                  Sign in
                </h2>
                <p className="mt-2 text-sm text-slate">
                  Use your dealer credentials to open the Command Center.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[0.62rem] tracking-[0.14em] text-slate uppercase">
                      Work email
                    </span>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@dealership.com"
                      className={fieldClass}
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[0.62rem] tracking-[0.14em] text-slate uppercase">
                      Password
                    </span>
                    <input
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className={fieldClass}
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={cn(buttonVariants({ size: "lg" }), "mt-2 w-full")}
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Signing in…
                      </>
                    ) : (
                      "Sign in to Command Center"
                    )}
                  </button>
                </form>

                <p className="mt-6 text-center text-xs leading-relaxed text-slate">
                  Need access?{" "}
                  <Link href="/#cta" className="font-medium text-blue-600 hover:underline">
                    Request a demo
                  </Link>{" "}
                  to get your store onboarded.
                </p>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
