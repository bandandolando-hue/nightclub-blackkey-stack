import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// placeholder so you can hit it later
export async function POST() {
  return NextResponse.json({ ok: true, note: "toggle stub" });
}
