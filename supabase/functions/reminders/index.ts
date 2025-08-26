import "jsr:@supabase/functions-js/edge-runtime.d.ts";
export const handler = async (req: Request): Promise<Response> => {
  const url = Deno.env.get("SUPABASE_URL")!; const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const site = Deno.env.get("NEXT_PUBLIC_SITE_URL") || "http://localhost:3000";
  const now = new Date(); const in24 = new Date(now.getTime() + 24*60*60*1000).toISOString(); const in2h = new Date(now.getTime() + 2*60*60*1000).toISOString();
  const res = await fetch(`${url}/rest/v1/events?select=*`, { headers: { apikey: key, Authorization: `Bearer ${key}` } }); const events = await res.json();
  const targets = events.filter((e:any) => { const s = new Date(e.starts_at).toISOString(); return s.slice(0,13) === in24.slice(0,13) || s.slice(0,13) === in2h.slice(0,13); });
  for (const ev of targets) {
    const rsvpRes = await fetch(`${url}/rest/v1/rsvps?select=id,profile:profiles(email,phone)&event_id=eq.${ev.id}`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
    const rsvps = await rsvpRes.json();
    for (const r of rsvps) { console.log("Would notify", r.profile?.email, r.profile?.phone, "for event", ev.name); }
  }
  return new Response(JSON.stringify({ ok: true, targets: targets.length }), { headers: { "content-type": "application/json" } });
};
Deno.serve(handler);
