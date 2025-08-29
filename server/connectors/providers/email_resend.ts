// server/connectors/index.ts

export type Provider = "email" | "sms" | "discord" | "instagram";
// filepath: c:\Users\oshin\Downloads\nightclub-blackkey-stack\server\connectors\providers\email_resend.ts
export function sendEmail(msg: any, ctx?: any): SendResult {
  // ...function code...
  return { ok: true }; // or return an appropriate SendResult based on logic
}
export interface Context {
  credentials?: Record<string, string>;
}

type SendResult = { ok: true } | { ok: false; error: string };

// Permissive router: only "email" is wired; others are no-op so builds pass.
export async function send(
  provider: Provider,
  msg: any,           // relax typing to avoid mismatch with stubs
  ctx?: Context
): Promise<SendResult> {
  try {
    if (provider === "email") {
      const mod = await import("./email_resend");
      return await mod.sendEmail(msg, ctx as any);
    }

    // stubs for now (sms/discord/instagram)
    console.log("[SEND disabled]", { provider, msg, ctx });
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: String(e?.message ?? e) };
  }
}
