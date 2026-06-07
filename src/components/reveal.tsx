"use client";

import * as React from "react";
import {
  motion,
  useAnimation,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span";
  /** Skip scroll animation — use for above-the-fold hero content */
  eager?: boolean;
};

function isAboveFold(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  as = "div",
  eager = false,
}: RevealProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | HTMLLIElement | HTMLSpanElement | null>(
    null,
  );
  const controls = useAnimation();
  const inView = useInView(ref, {
    once: true,
    amount: 0.12,
    margin: "0px 0px -40px 0px",
  });

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  React.useEffect(() => {
    if (reduce || eager) {
      void controls.start("show");
      return;
    }
    if (inView) {
      void controls.start("show");
    }
  }, [controls, eager, inView, reduce]);

  // Mobile Safari often skips the first whileInView pass for above-the-fold nodes.
  React.useEffect(() => {
    if (reduce || eager) return;
    const node = ref.current;
    if (!node) return;

    const revealIfVisible = () => {
      if (isAboveFold(node)) void controls.start("show");
    };

    revealIfVisible();
    requestAnimationFrame(revealIfVisible);
    window.addEventListener("resize", revealIfVisible, { passive: true });
    return () => window.removeEventListener("resize", revealIfVisible);
  }, [controls, eager, reduce]);

  if (reduce) {
    const Tag = as;
    return <Tag className={cn(className)}>{children}</Tag>;
  }

  const motionProps = {
    className: cn(className),
    variants,
    initial: "hidden" as const,
    animate: controls,
  };

  if (as === "li") {
    return (
      <motion.li ref={ref as React.Ref<HTMLLIElement>} {...motionProps}>
        {children}
      </motion.li>
    );
  }

  if (as === "span") {
    return (
      <motion.span ref={ref as React.Ref<HTMLSpanElement>} {...motionProps}>
        {children}
      </motion.span>
    );
  }

  return (
    <motion.div ref={ref as React.Ref<HTMLDivElement>} {...motionProps}>
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  eager?: boolean;
};

export function Stagger({ children, className, gap = 0.08, eager = false }: StaggerProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const inView = useInView(ref, {
    once: true,
    amount: 0.12,
    margin: "0px 0px -40px 0px",
  });

  React.useEffect(() => {
    if (reduce || eager) {
      void controls.start("show");
      return;
    }
    if (inView) void controls.start("show");
  }, [controls, eager, inView, reduce]);

  React.useEffect(() => {
    if (reduce || eager) return;
    const node = ref.current;
    if (!node) return;
    const revealIfVisible = () => {
      if (isAboveFold(node)) void controls.start("show");
    };
    revealIfVisible();
    requestAnimationFrame(revealIfVisible);
  }, [controls, eager, reduce]);

  if (reduce) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 16,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={cn(className)}>{children}</div>;
  }
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
