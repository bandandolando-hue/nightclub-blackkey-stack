import { DRY_RUN, Message, SendResult, Context } from '../index';
export async function sendInstagram(msg: Message, ctx: Context): Promise<SendResult> {
  if (DRY_RUN) { console.log('[DRYRUN][IG]', msg.caption, msg.mediaUrl); return { ok: true, id: 'dryrun-ig' }; }
  return { ok: false, error: 'IG send not implemented in demo' };
}
