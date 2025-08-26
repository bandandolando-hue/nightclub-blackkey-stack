// app/api/media/[...slug]/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(
  _req: Request,
  { params }: { params: { slug: string[] } }
) {
  const [bucket, ...rest] = params.slug || [];
  const path = rest.join("/");
  if (!bucket || !path) {
    return NextResponse.json({ error: "bad path" }, { status: 400 });
  }

  const supa = createClient(url, serviceKey);
  const { data, error } = await supa.storage.from(bucket).download(path);
  if (error || !data) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const ext = path.split(".").pop()?.toLowerCase();
  const type =
    ext === "png" ? "image/png" :
    ext === "jpg" || ext === "jpeg" ? "image/jpeg" :
    ext === "webp" ? "image/webp" :
    ext === "gif" ? "image/gif" :
    "application/octet-stream";

  return new NextResponse(data, {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
