import { createClient } from "@/lib/supabase";
export default async function CampaignShow({ params }:{ params: { id: string } }){
  const supabase = createClient();
  const { data: c } = await supabase.from('campaigns').select('*').eq('id', params.id).single();
  const { data: msgs } = await supabase.from('campaign_messages').select('*').eq('campaign_id', params.id);
  if(!c) return <div className="card">Not found</div>;
  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex justify-between items-center">
          <div><div className="text-xl font-semibold">{c.name}</div><div className="text-sm opacity-70">{c.status}</div></div>
          <form action={`/api/admin/campaigns/${c.id}/queue`} method="post"><button className="btn btn-primary">Queue (dry-run)</button></form>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">{msgs?.map((m:any) => (
        <div key={m.id} className="card"><div className="font-semibold">{m.provider}</div><pre className="text-xs opacity-80">{JSON.stringify(m.payload_json, null, 2)}</pre></div>
      )) || null}</div>
    </div>
  );
}
