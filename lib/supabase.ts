// lib/supabase.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// We only need the anon public client for this demo (no auth cookies).
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Use the same client factory for server and browser.
export const createClient = () => createSupabaseClient(url, anon);
export const createBrowserSupabase = () => createSupabaseClient(url, anon);
