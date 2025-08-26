import { DRY_RUN, Message, SendResult, Context } from '../index';
export async function sendX(msg: Message, ctx: Context): Promise<SendResult> {
  if (DRY_RUN) { console.log('[DRYRUN][X]', msg.text); return { ok: true, id: 'dryrun-x' }; }
  return { ok: false, error: 'X send not implemented in demo' };
}
