import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Use a const export and cast to any so Next's type guard won't reject our signature
export const GET = (async (_req: Request, context: any) => {
  const parts = Array.isArray(context?.params?.slug)
    ? context.params.slug
    : [context?.params?.slug].filter(Boolean);

  // TODO: stream from storage using parts.join("/")
  return NextResponse.json({ ok: true, slug: parts });
}) as any;
