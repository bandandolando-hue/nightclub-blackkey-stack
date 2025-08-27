// @ts-nocheck
// app/api/admin/campaigns/[id]/queue/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(_req: Request, { params }: any) {
  const id = params?.id as string;
  // TODO: enqueue campaign by id
  return NextResponse.json({ ok: true, queued: id });
}

