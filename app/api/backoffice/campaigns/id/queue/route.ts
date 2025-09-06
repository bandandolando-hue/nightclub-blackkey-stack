// @ts-nocheck
// app/api/backoffice/campaigns/[id]/queue/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { id: string };
export async function POST(_req: Request, { params }:{ params: Promise<Params> ;}) {
  const id = await params;;
  // TODO: enqueue campaign by id
  return NextResponse.json({ ok: true, queued: id });
}

