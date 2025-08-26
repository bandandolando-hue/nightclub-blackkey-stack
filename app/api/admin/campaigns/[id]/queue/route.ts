import { NextRequest, NextResponse } from "next/server"; import { createClient } from "@/lib/supabase";
export async function POST(req: NextRequest, { params }:{ params: { id: string } }){
  const supabase = createClient();
  const runAt = new Date(Date.now() + 60*1000).toISOString();
  await supabase.from('scheduled_jobs').insert({ job_type: 'campaign_dispatch', run_at: runAt, payload: { campaign_id: params.id } });
  await supabase.from('campaigns').update({ status: 'scheduled' }).eq('id', params.id);
  return NextResponse.redirect(`/admin/campaigns/${params.id}`);
}
