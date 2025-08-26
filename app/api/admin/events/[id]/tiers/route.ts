import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";
export async function POST(req: NextRequest, { params }:{ params: { id: string } }){
  const supabase = createClient();
  const body = await req.json();
  const tiers = (body.tiers || []) as any[];
  for(const t of tiers){
    await supabase.from('ticket_tiers').insert({ event_id: params.id, name: t.name, price_cents: t.price_cents, currency: t.currency, admit_before: t.admit_before, is_comp: t.is_comp });
  }
  return NextResponse.json({ ok: true });
}
