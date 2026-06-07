import Link from "next/link";
import { Logo } from "@/components/logo";
import { Container } from "@/components/primitives";
import { TREDFI_URL } from "@/lib/products";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Intelligence Engine", href: "/#intelligence" },
      { label: "Unified Profile", href: "/#solution" },
      { label: "Architecture", href: "/#platform" },
      { label: "Ownership Model", href: "/#ownership" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Super Pixel", href: "/products/super-pixel" },
      { label: "BDC Copilot", href: "/products/bdc-copilot" },
      { label: "Marketplace Copilot", href: "/products/marketplace-copilot" },
      { label: "DealerOS Command Center", href: "/products/dealeros" },
      { label: "TredFi", href: "/products/tredfi" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "TredFi — Parent Company", href: TREDFI_URL, external: true },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/#cta" },
    ],
  },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className = "text-sm text-white/70 transition-colors hover:text-white";

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 text-white">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div className="flex flex-col gap-5">
            <Logo tone="dark" withDescriptor />
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              The intelligence layer that connects every shopper, every
              conversation, and every opportunity across the dealership.
            </p>
            <a
              href={TREDFI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
            >
              <span className="font-mono text-[0.62rem] tracking-[0.14em] text-white/35 uppercase">
                Parent Company
              </span>
              <span className="font-medium text-white/80">TredFi</span>
            </a>
            <p className="font-mono text-[0.7rem] tracking-[0.18em] text-blue-300 uppercase">
              Intent · Identity · Activation
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h4 className="font-mono text-[0.7rem] tracking-[0.16em] text-white/45 uppercase">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={`${col.title}-${link.label}-${link.href}`}>
                      <FooterLinkItem link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Audience Activator AI · A{" "}
            <a
              href={TREDFI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 transition-colors hover:text-white"
            >
              TredFi
            </a>{" "}
            company
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="#" className="hover:text-white/80">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white/80">
              Terms
            </Link>
            <Link href="#" className="hover:text-white/80">
              Dealer Intelligence Infrastructure™
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
