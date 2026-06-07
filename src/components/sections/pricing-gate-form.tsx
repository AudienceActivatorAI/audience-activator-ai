"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Lock } from "lucide-react";
import { Container, Eyebrow } from "@/components/primitives";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-navy placeholder:text-slate/60 outline-none transition-colors focus:border-blue/40 focus:ring-2 focus:ring-blue/10";

const roleOptions = [
  "Owner / Dealer Principal",
  "General Manager",
  "General Sales Manager",
  "BDC / Internet Director",
  "BDC Manager",
  "Finance Manager",
  "Marketing Director",
  "Other",
];

type Props = {
  onUnlocked: () => void;
};

export function PricingGateForm({ onUnlocked }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/pricing-gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = (await res.json()) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      onUnlocked();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-white pt-32 pb-20 sm:pt-36">
      <div className="bg-grid absolute inset-0 mask-fade-x" aria-hidden />
      <div
        className="pointer-events-none absolute -top-32 right-[-8%] h-[480px] w-[480px] rounded-full bg-blue/10 blur-3xl"
        aria-hidden
      />
      <Container className="relative">
        <div className="mx-auto max-w-xl">
          <div className="flex justify-center">
            <span className="grid size-12 place-items-center rounded-2xl bg-mist text-blue">
              <Lock className="size-5" />
            </span>
          </div>
          <div className="mt-6 text-center">
            <Eyebrow className="justify-center">Exclusive independent dealer offer</Eyebrow>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Access Pricing
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate">
              Exclusive pricing is available to select independent dealers. Share your
              store details to view the June license offer, lead economics, and covered
              launch stack.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="font-mono text-[0.62rem] tracking-[0.14em] text-slate uppercase">
                  Dealership name *
                </span>
                <input
                  name="dealership"
                  required
                  autoComplete="organization"
                  placeholder="Northstar Motors"
                  className={fieldClass}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[0.62rem] tracking-[0.14em] text-slate uppercase">
                  Your name *
                </span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Alex Manager"
                  className={fieldClass}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[0.62rem] tracking-[0.14em] text-slate uppercase">
                  Role *
                </span>
                <select name="role" required defaultValue="" className={cn(fieldClass, "appearance-none")}>
                  <option value="" disabled>
                    Select your role
                  </option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[0.62rem] tracking-[0.14em] text-slate uppercase">
                  Work email *
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
                  Phone *
                </span>
                <input
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="(555) 555-0100"
                  className={fieldClass}
                />
              </label>
            </div>

            {status === "error" ? (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "loading"}
              className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full")}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="animate-spin" />
                  Verifying…
                </>
              ) : (
                <>
                  Access Pricing
                  <ArrowRight />
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs leading-relaxed text-slate">
              By continuing, you agree to be contacted about this exclusive dealer offer.
              Your website, CRM, and pixel leads always stay yours.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
