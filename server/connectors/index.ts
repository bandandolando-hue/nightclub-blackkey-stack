export type Provider = 'email'|'sms'|'instagram'|'threads'|'tiktok'|'x'|'discord'|'webhook';
export type SendResult = { ok: boolean; id?: string; error?: string };
export const DRY_RUN = process.env.BLACKKEY_DRYRUN !== 'false';
export interface Message { to?: string; subject?: string; text?: string; html?: string; caption?: string; mediaUrl?: string; webhookUrl?: string; }
export interface Context { credentials: Record<string, string>; }
export async function send(provider: Provider, msg: Message, ctx: Context): Promise<SendResult> {
  if (provider === 'email') return (await import('./providers/email_resend')).sendEmail(msg, ctx);
  if (provider === 'sms') return (await import('./providers/sms_twilio')).sendSMS(msg, ctx);
  if (provider === 'discord') return (await import('./providers/discord_webhook')).sendDiscord(msg, ctx);
  if (provider === 'instagram') return (await import('./providers/instagram_graph')).sendInstagram(msg, ctx);
  if (provider === 'threads') return (await import('./providers/threads_api')).sendThreads(msg, ctx);
  if (provider === 'tiktok') return (await import('./providers/tiktok_api')).sendTikTok(msg, ctx);
  if (provider === 'x') return (await import('./providers/x_api')).sendX(msg, ctx);
  if (provider === 'webhook') return (await import('./providers/generic_webhook')).sendWebhook(msg, ctx);
  return { ok: false, error: 'Unknown provider' };
}
