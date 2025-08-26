import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const supabase = createClient();
  const { full_name, email, phone, event_id, referral, consent_email, consent_sms } = body;

  // upsert profile
  const { data: profile, error: pErr } = await supabase.from("profiles").upsert({ full_name, email, phone }, { onConflict: "email" }).select().single();
  if (pErr || !profile) return NextResponse.json({ error: pErr?.message || "Profile error" }, { status: 400 });

  // ensure subscriber record
  await supabase.from("subscribers").upsert({
    email, phone, full_name, consent_email: !!consent_email, consent_sms: !!consent_sms, source: "rsvp"
  }, { onConflict: "email" });

  // create RSVP
  const admit_before = new Date(new Date().setHours(22,0,0,0)); // 10pm default
  const { data: rsvp, error: rErr } = await supabase.from("rsvps").insert({
    event_id, profile_id: profile.id, referral_code: referral || null, admit_before: admit_before.toISOString(), status: "confirmed"
  }).select().single();
  if (rErr) return NextResponse.json({ error: rErr.message }, { status: 400 });

  return NextResponse.json({ ok: true, rsvp });
}
