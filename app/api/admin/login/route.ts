// app/api/admin/login/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_PIN = process.env.ADMIN_PIN || "123456";

export async function POST(req: Request) {
  try {
    const { pin } = await req.json();
    if (pin !== ADMIN_PIN) {
      return NextResponse.json({ ok: false, error: "Invalid PIN" }, { status: 401 });
    }
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_authed", "true", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8h
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_authed", "", { path: "/", maxAge: 0 });
  return res;
}
