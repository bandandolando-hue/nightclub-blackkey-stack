import { DRY_RUN, Message, SendResult, Context } from '../index';
export async function sendWebhook(msg: Message, ctx: Context): Promise<SendResult> {
  if (!msg.webhookUrl) return { ok: false, error: 'Missing webhookUrl' };
  if (DRY_RUN) { console.log('[DRYRUN][WEBHOOK]', msg.webhookUrl, msg.text || msg.caption); return { ok: true, id: 'dryrun-webhook' }; }
  const res = await fetch(msg.webhookUrl, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ payload: msg }) });
  if (!res.ok) return { ok:false, error: `HTTP ${res.status}` };
  return { ok:true, id: 'webhook' };
}
