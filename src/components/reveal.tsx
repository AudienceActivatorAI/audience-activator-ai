import * as React from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span";
  eager?: boolean;
};

/** Static wrapper — scroll animations disabled for reliable mobile rendering. */
export function Reveal({
  children,
  className,
  as = "div",
}: RevealProps) {
  const Tag = as;
  return <Tag className={cn(className)}>{children}</Tag>;
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  eager?: boolean;
};

export function Stagger({ children, className }: StaggerProps) {
  return <div className={cn(className)}>{children}</div>;
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  return <div className={cn(className)}>{children}</div>;
}
