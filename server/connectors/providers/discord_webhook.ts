import { DRY_RUN, Message, SendResult, Context } from '../index';
export async function sendDiscord(msg: Message, ctx: Context): Promise<SendResult> {
  if (!msg.webhookUrl) return { ok: false, error: 'Missing webhookUrl' };
  if (DRY_RUN) { console.log('[DRYRUN][DISCORD]', msg.webhookUrl, msg.text || msg.caption); return { ok: true, id: 'dryrun-discord' }; }
  const res = await fetch(msg.webhookUrl, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ content: msg.text || msg.caption || '' }) });
  if (!res.ok) return { ok:false, error: `HTTP ${res.status}` };
  return { ok:true, id: 'discord' };
}
