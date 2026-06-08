"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const demoFocusOptions = [
  "Turn anonymous traffic into pipeline",
  "Automate BDC & speed-to-lead",
  "Marketplace & inventory motion",
  "Operations & command center",
  "Not sure — show me the stack",
] as const;

const defaultDemoFocus = "Full platform walkthrough";

const fieldClass =
  "w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-blue/50 focus:bg-white/[0.07]";

export function DemoRequestForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/demo", {
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

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <CheckCircle2 className="size-10 text-blue-300" />
        <h3 className="mt-4 text-xl font-semibold text-white">Request received</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">
          We&apos;ll follow up shortly. You can also book a time directly in the
          calendar beside this form.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={cn(buttonVariants({ variant: "glass", size: "md" }), "mt-6")}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="font-mono text-[0.62rem] tracking-[0.14em] text-white/45 uppercase">
            Dealership *
          </span>
          <input
            name="dealership"
            required
            autoComplete="organization"
            placeholder="Northstar Demo Motors"
            className={fieldClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[0.62rem] tracking-[0.14em] text-white/45 uppercase">
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
          <span className="font-mono text-[0.62rem] tracking-[0.14em] text-white/45 uppercase">
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
          <span className="font-mono text-[0.62rem] tracking-[0.14em] text-white/45 uppercase">
            Phone
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 555-0100"
            className={fieldClass}
          />
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="font-mono text-[0.62rem] tracking-[0.14em] text-white/45 uppercase">
            Demo focus <span className="text-white/30">(optional)</span>
          </span>
          <select
            name="demoFocus"
            defaultValue={defaultDemoFocus}
            className={cn(fieldClass, "appearance-none")}
          >
            <option value={defaultDemoFocus} className="bg-navy-900">
              {defaultDemoFocus}
            </option>
            {demoFocusOptions.map((option) => (
              <option key={option} value={option} className="bg-navy-900">
                {option}
              </option>
            ))}
          </select>
          <span className="text-xs leading-relaxed text-white/40">
            One software license covers the full platform — tell us what matters most
            at your store.
          </span>
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="font-mono text-[0.62rem] tracking-[0.14em] text-white/45 uppercase">
            Anything else?
          </span>
          <textarea
            name="message"
            rows={3}
            placeholder="Rooftop count, current stack, or what you want to improve first."
            className={cn(fieldClass, "resize-none")}
          />
        </label>
      </div>

      {status === "error" ? (
        <p className="mt-4 text-sm text-red-300" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(buttonVariants({ variant: "accent", size: "lg" }), "mt-6 w-full sm:w-auto")}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Request demo
            <ArrowRight />
          </>
        )}
      </button>
    </form>
  );
}
