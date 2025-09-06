import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Use a const export and cast to any so Next's type guard won't reject our signature
// app/api/media/[...slug]/route.ts (example)
export async function GET(
  req: Request,
  ctx: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await ctx.params; // <-- must await
  // ...rest of handler

  // TODO: stream from storage using parts.join("/")
  return NextResponse.json({ ok: true, slug: slug });
}
