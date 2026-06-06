import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em]",
  {
    variants: {
      variant: {
        default: "border-line bg-mist text-slate",
        navy: "border-navy/10 bg-navy/5 text-navy",
        accent: "border-blue/20 bg-blue/8 text-blue-600",
        dark: "border-white/15 bg-white/5 text-blue-300",
      },
      size: {
        sm: "px-2.5 py-1",
        md: "px-3 py-1.5",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  );
}
