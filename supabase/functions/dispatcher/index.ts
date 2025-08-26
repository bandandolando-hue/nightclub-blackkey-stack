import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { send } from "../../../server/connectors/index.ts";

export const handler = async (req: Request): Promise<Response> => {
  const url = Deno.env.get("SUPABASE_URL")!; const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const now = new Date().toISOString();
  const res = await fetch(`${url}/rest/v1/scheduled_jobs?select=*&run_at=lte.${now}&status=eq.queued`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
  const jobs = await res.json();
  for (const j of jobs) {
    if (j.job_type === 'campaign_dispatch') {
      const cid = j.payload?.campaign_id;
      const mres = await fetch(`${url}/rest/v1/campaign_messages?select=*&campaign_id=eq.${cid}`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
      const msgs = await mres.json();
      for (const m of msgs) {
        const p = m.payload_json || {};
        await send(m.provider, { text: p.text, html: p.html, caption: p.caption, mediaUrl: p.mediaUrl }, { credentials: {} as any });
      }
      await fetch(`${url}/rest/v1/campaigns?id=eq.${cid}`, { method: 'PATCH', headers: { apikey: key, Authorization: `Bearer ${key}`, 'content-type':'application/json' }, body: JSON.stringify({ status: 'sent' }) });
    }
    await fetch(`${url}/rest/v1/scheduled_jobs?id=eq.${j.id}`, { method: 'PATCH', headers: { apikey: key, Authorization: `Bearer ${key}`, 'content-type':'application/json' }, body: JSON.stringify({ status: 'done' }) });
  }
  return new Response(JSON.stringify({ ok: true, processed: jobs.length }), { headers: { "content-type": "application/json" } });
};
Deno.serve(handler);
