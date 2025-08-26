import { createClient } from "@/lib/supabase";
import RSVPForm from "@/components/RSVPForm";

export const revalidate = 0;

export default async function EventPage({ params, searchParams } : { params: { id: string }, searchParams: { ref?: string } }) {
  const supabase = createClient();
  const { data: event } = await supabase.from("events").select("*").eq("id", params.id).single();
  if (!event) return <div className="card">Event not found.</div>;

  return (
    <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-6">
      <div className="card">
        <div className="text-sm opacity-70">{new Date(event.starts_at).toLocaleString()}</div>
        <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
        <p className="opacity-80 mb-4 whitespace-pre-wrap">{event.promo_copy}</p>
        <div className="rounded-xl border border-neutral-800 p-4">
          <h3 className="font-semibold mb-2">RSVP</h3>
          <RSVPForm eventId={event.id} referral={searchParams.ref} />
        </div>
      </div>
      <aside className="card space-y-4">
        <h3 className="font-semibold">Share</h3>
        <p className="opacity-80 text-sm">Give friends your referral link:</p>
        <pre className="text-xs bg-black/40 p-3 rounded-xl break-all">{`${process.env.NEXT_PUBLIC_SITE_URL}/e/${event.id}?ref=YOURCODE`}</pre>
      </aside>
    </div>
  );
}
