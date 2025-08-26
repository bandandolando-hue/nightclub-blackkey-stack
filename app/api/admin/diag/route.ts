// app/api/admin/diag/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const isAdmin = cookie.split(/;\s*/).some((c) => c.startsWith("admin_authed=true"));

  const haveUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const haveService = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  return NextResponse.json({
    ok: true,
    isAdmin,
    haveUrl,
    haveService,
  });
}
