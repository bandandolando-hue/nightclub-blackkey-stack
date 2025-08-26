// app/api/admin/upload/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;         // must be set
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // must be set (server-only)

function assertAdmin(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const ok = cookie.split(/;\s*/).some((c) => c.startsWith("admin_authed=true"));
  if (!ok) throw new Error("unauthorized");
}

export async function POST(req: Request) {
  try {
    if (!url) return NextResponse.json({ error: "SUPABASE URL missing" }, { status: 500 });
    if (!serviceKey) return NextResponse.json({ error: "Service role key missing" }, { status: 500 });

    assertAdmin(req);

    const form = await req.formData();
    const file = form.get("file") as File | null;
    const bucket = String(form.get("bucket") || "");
    if (!file || !bucket) {
      return NextResponse.json({ error: "missing file or bucket" }, { status: 400 });
    }

    const supa = createClient(url, serviceKey);
    const ext = (file.name.split(".").pop() || "bin").toLowerCase();
    const path = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

    // Wrap Supabase call so any JSON.parse errors become JSON responses instead of HTML
    let uploadError: any = null;
    try {
      const ab = await file.arrayBuffer();
      const { error } = await supa.storage
        .from(bucket)
        .upload(path, ab, { contentType: file.type || "application/octet-stream", upsert: false });
      uploadError = error || null;
    } catch (e: any) {
      // This is where the SDK can throw if it got non-JSON
      return NextResponse.json({ error: `upload failed: ${e?.message || String(e)}` }, { status: 500 });
    }
    if (uploadError) {
      return NextResponse.json({ error: uploadError.message || String(uploadError) }, { status: 400 });
    }

    const proxiedUrl = `/api/media/${encodeURIComponent(bucket)}/${encodeURIComponent(path)}`;
    return NextResponse.json({ ok: true, path, url: proxiedUrl });
  } catch (e: any) {
    const msg = e?.message || "unexpected error";
    const code = msg === "unauthorized" ? 401 : 500;
    return NextResponse.json({ error: msg }, { status: code });
  }
}

