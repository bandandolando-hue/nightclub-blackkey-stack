'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

function titleCase(s: string) {
  return s
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function AdminHeader() {
  const pathname = usePathname(); // e.g. /admin/events/123/tickets
  const segments = useMemo(() => {
    const parts = (pathname || '').split('/').filter(Boolean); // ["admin","events","123","tickets"]
    const adminIndex = parts.indexOf('admin');
    const trail = adminIndex >= 0 ? parts.slice(adminIndex) : parts;
    // Build cumulative hrefs for each breadcrumb
    const crumbs = trail.map((seg, i) => {
      const href = '/' + trail.slice(0, i + 1).join('/');
      return { label: seg === 'admin' ? 'Admin' : titleCase(seg), href };
    });
    return crumbs;
  }, [pathname]);

  return (
    <div className="mb-6">
      {/* Breadcrumbs */}
      <div className="text-sm opacity-80 flex flex-wrap items-center gap-1">
        {segments.map((c, i) => (
          <span key={c.href} className="flex items-center gap-1">
            {i > 0 && <span className="opacity-50">›</span>}
            {i < segments.length - 1 ? (
              <Link href={c.href} className="hover:underline">
                {c.label}
              </Link>
            ) : (
              <span className="font-medium">{c.label}</span>
            )}
          </span>
        ))}
      </div>

      {/* Admin nav */}
      <nav className="flex gap-4 mt-3 text-sm">
        <Link className="hover:text-accent" href="/admin/campaigns">Campaigns</Link>
        <Link className="hover:text-accent" href="/admin/subscribers">Subscribers</Link>
        <Link className="hover:text-accent" href="/admin/events">Events</Link>
        <Link className="hover:text-accent" href="/admin/branding">Branding</Link>
      </nav>
    </div>
  );
}
