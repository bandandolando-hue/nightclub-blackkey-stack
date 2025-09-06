import { NextRequest, NextResponse } from "next/server"; import { createClient } from "@/lib/supabase";
export async function POST(req: NextRequest){
  const supabase = createClient();
  const body = await req.json();
  const { name, channels, caption, html, text, mediaUrl } = body;
  const { data: campaign, error } = await supabase.from('campaigns').insert({ name, status: 'draft' }).select().single();
  if(error || !campaign) return NextResponse.json({ error: error?.message || 'insert failed' }, { status: 400 });
  for(const ch of channels as string[]){
    await supabase.from('campaign_messages').insert({ campaign_id: campaign.id, provider: ch, payload_json: { caption, html, text, mediaUrl } });
  }
  return NextResponse.json({ ok: true, id: campaign.id });
}
