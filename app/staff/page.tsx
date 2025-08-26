'use client';
import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase";
import Link from "next/link";

export default function StaffPage() {
  const supabase = createBrowserSupabase();
  const [events, setEvents] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("events").select("*").order("starts_at", { ascending: true }).then(({ data }) => setEvents(data || []));
  }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Staff</h1>
      <div className="card">
        <div className="flex justify-between mb-4">
          <div className="font-semibold">Events</div>
          <a className="btn" href="/staff/checkin">Check-in</a>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {events.map(e => (
            <Link className="rounded-xl border border-neutral-800 p-4 hover:border-accent transition" key={e.id} href={`/e/${e.id}`}>
              <div className="text-sm opacity-70">{new Date(e.starts_at).toLocaleString()}</div>
              <div className="text-lg font-semibold">{e.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
