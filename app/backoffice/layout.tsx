// app/backoffice/layout.tsx
import { ReactNode } from "react";

export default function BackofficeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container py-8">
      <nav className="flex gap-4 mb-6 text-sm">
        <a className="hover:text-accent" href="/backoffice/events">Events</a>
        <a className="hover:text-accent" href="/backoffice/branding">Branding</a>
        <a className="hover:text-accent" href="/backoffice/feature-flags">Feature-Flags</a>
      </nav>
      {children}
    </div>
  );
}
