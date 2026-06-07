"use client";

import * as React from "react";
import { PricingGateForm } from "@/components/sections/pricing-gate-form";

const STORAGE_KEY = "aa-sales-sheet-unlocked";

export function SalesSheetGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    try {
      setUnlocked(window.localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setUnlocked(false);
    }
    setReady(true);
  }, []);

  function handleUnlocked() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Cookie from API still allows repeat visits in same browser session patterns.
    }
    setUnlocked(true);
  }

  if (!ready) {
    return (
      <section className="min-h-[50vh] bg-white pt-32" aria-hidden>
        <div className="mx-auto h-8 w-48 animate-pulse rounded-full bg-mist" />
      </section>
    );
  }

  if (!unlocked) {
    return <PricingGateForm onUnlocked={handleUnlocked} />;
  }

  return <>{children}</>;
}
