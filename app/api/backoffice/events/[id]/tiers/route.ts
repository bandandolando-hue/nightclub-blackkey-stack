// @ts-nocheck
// app/api/backoffice/events/[id]/tiers/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  return NextResponse.json({ ok: true, eventId: id, tiers: [] });
}

export async function POST(req: Request, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ ok: true, eventId: id, received: body });
}
