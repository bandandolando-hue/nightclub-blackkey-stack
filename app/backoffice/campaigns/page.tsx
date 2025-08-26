import Link from "next/link"; import { createClient } from "@/lib/supabase";
export default async function CampaignsPage(){
  const supabase = createClient();
  const { data: list } = await supabase.from('campaigns').select('*').order('created_at', { ascending: false });
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">Campaigns</div>
        <a className="btn btn-primary" href="/admin/campaigns/new">New campaign</a>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {list?.map((c:any) => (
          <Link key={c.id} href={`/admin/campaigns/${c.id}`} className="rounded-xl border border-neutral-800 p-4 hover:border-accent">
            <div className="font-semibold">{c.name}</div><div className="text-sm opacity-70">{c.status}</div>
          </Link>
        )) || <div className="card">No campaigns</div>}
      </div>
    </div>
  );
}
