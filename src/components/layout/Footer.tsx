import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { footerNav, siteMeta } from "@/data/content";

const socials: { label: string; href: string; path: string }[] = [
  {
    label: "Bid Spot on LinkedIn",
    href: "#",
    path: "M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3 0-2.95-1.8-2.95s-2.07 1.4-2.07 2.85V21h-4z",
  },
  {
    label: "Bid Spot on X",
    href: "#",
    path: "M17.5 3h3l-6.6 7.5L21.7 21h-5.9l-4.2-5.5L6.6 21H3.5l7-8L2.7 3h6l3.8 5zM16 19h1.6L8 5H6.3z",
  },
];

export function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-border-subtle bg-surface-base">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-text-secondary">
              {siteMeta.description}
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex size-9 items-center justify-center rounded-md border border-border-subtle text-text-secondary transition-colors duration-fast ease-standard hover:border-border-strong hover:text-text-primary"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <h2 className="text-sm font-semibold text-text-primary">{col.heading}</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary transition-colors duration-fast ease-standard hover:text-text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border-subtle pt-8 text-xs text-text-tertiary sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {siteMeta.name}. All rights reserved.</p>
          <p className="font-mono">Programmatic buying with precision at scale.</p>
        </div>
      </Container>
    </footer>
  );
}
