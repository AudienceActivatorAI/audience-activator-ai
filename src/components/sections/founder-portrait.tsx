"use client";

import Image from "next/image";
import * as React from "react";

const HEADSHOT = "/team/james-hamilton.jpg";

export function FounderPortrait() {
  const [useFallback, setUseFallback] = React.useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-mist shadow-sm">
      {useFallback ? (
        <div
          className="grid aspect-square w-full place-items-center bg-gradient-to-br from-navy to-blue text-white"
          aria-label="James Hamilton, Managing Partner at TredFi"
        >
          <span className="text-5xl font-semibold tracking-tight">JH</span>
        </div>
      ) : (
        <Image
          src={HEADSHOT}
          alt="James Hamilton, Managing Partner at TredFi"
          width={480}
          height={480}
          className="aspect-square w-full object-cover object-center"
          priority
          onError={() => setUseFallback(true)}
        />
      )}
    </div>
  );
}
