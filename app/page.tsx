import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default async function HomePage() {
  const supabase = createClient();
  const { data: events } = await supabase.from("events").select("*").gte("starts_at", new Date().toISOString()).order("starts_at", { ascending: true });
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold">Upcoming</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {events?.map((e:any) => (
          <Link key={e.id} href={`/e/${e.id}`} className="card hover:border-accent transition">
            <div className="text-sm opacity-70">{new Date(e.starts_at).toLocaleString()}</div>
            <div className="text-xl font-semibold">{e.name}</div>
            <p className="opacity-80 line-clamp-3">{e.promo_copy}</p>
          </Link>
        )) || <div>No upcoming events</div>}
      </div>
    </main>
  );
}
