'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase';
import Link from 'next/link';

type EventRow = {
  id: string;
  title: string | null;
  starts_at: string | null;
  published: boolean | null;
};

export default function AdminEventsPage() {
  const supabase = createBrowserSupabase();
  const [rows, setRows] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('id,title,starts_at,published')
      .order('starts_at', { ascending: false });

    if (!error) setRows((data as any) || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Events</h1>

        {/* We'll wire this button in the NEXT step */}
        <button
          className="btn btn-primary"
          onClick={() => alert('New Event coming next step')}
        >
          New Event
        </button>
      </div>

      {loading && <div className="opacity-70 text-sm">Loading…</div>}

      {!loading && rows.length === 0 && (
        <div className="opacity-70 text-sm">No events yet.</div>
      )}

      <div className="grid gap-2">
        {rows.map((e) => (
          <div key={e.id} className="card flex items-center justify-between">
            <div>
              <div className="font-medium">{e.title || 'Untitled Event'}</div>
              <div className="text-xs opacity-70">
                {e.starts_at ? new Date(e.starts_at).toLocaleString() : '—'}
              </div>
              <div className="text-xs mt-1">
                {e.published ? 'Published' : 'Draft'}
              </div>
            </div>
            <div className="flex gap-2">
              <Link className="btn" href={`/e/${e.id}`}>
                View
              </Link>
              {/* Publish/Unpublish will be added next step too */}
              <button className="btn" onClick={() => alert('Publish toggle coming next step')}>
                Toggle Publish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
