// app/api/backoffice/site-settings/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-side (service role) Supabase client.
 * Requires ONE of these env vars to be set:
 * - SUPABASE_SERVICE_ROLE_KEY   (preferred)
 * - SUPABASE_SERVICE_KEY        (fallback name you might have used)
 */
function adminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase env vars: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

/**
 * Ensure there is exactly one row for site settings and return its id.
 * We use a stable UUID so upsert can be idempotent across environments.
 */
async function getOrCreateSettingsId(supabase: ReturnType<typeof adminSupabase>) {
  const { data, error } = await supabase
    .from("site_settings")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (data?.id) return data.id;

  // Stable sentinel ID — safe because we always upsert by this id.
  const id = "00000000-0000-0000-0000-000000000001";

  const { error: insErr } = await supabase
    .from("site_settings")
    .upsert({ id }, { onConflict: "id" });

  if (insErr) throw insErr;
  return id;
}

// ---------- GET ----------
// Returns the single site settings row (or a minimal default shape).
export async function GET() {
  try {
    const supabase = adminSupabase();

    const { data, error } = await supabase
      .from("site_settings")
      .select("id, club_name, banner_text, logo_url, default_bg_url, updated_at")
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json(
      {
        ok: true,
        settings:
          data ?? {
            id: null,
            club_name: null,
            banner_text: null,
            logo_url: null,
            default_bg_url: null,
            updated_at: null,
          },
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Failed to load settings" },
      { status: 500 }
    );
  }
}

// ---------- POST ----------
// Upserts the single row with any provided fields.
export async function POST(req: Request) {
  try {
    const supabase = adminSupabase();

    // Parse & validate input
    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const payload: {
      club_name?: string | null;
      banner_text?: string | null;
      logo_url?: string | null;
      default_bg_url?: string | null;
    } = {
      club_name:
        typeof body.club_name === "string" ? body.club_name : null,
      banner_text:
        typeof body.banner_text === "string" ? body.banner_text : null,
      logo_url:
        typeof body.logo_url === "string" ? body.logo_url : null,
      default_bg_url:
        typeof body.default_bg_url === "string" ? body.default_bg_url : null,
    };

    // Make sure we have a row id to upsert against
    const id = await getOrCreateSettingsId(supabase);

    const update = {
      id,
      ...payload,
      updated_at: new Date().toISOString(),
    };

    // Supabase JS: use upsert instead of SQL ON CONFLICT
    const { data, error } = await supabase
      .from("site_settings")
      .upsert(update, { onConflict: "id" })
      .select("id, club_name, banner_text, logo_url, default_bg_url, updated_at")
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, settings: data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Failed to save settings" },
      { status: 500 }
    );
  }
}

// This route runs in Node (not Edge) because it needs the service key.
export const runtime = "nodejs";
