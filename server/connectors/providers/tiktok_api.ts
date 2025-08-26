import { DRY_RUN, Message, SendResult, Context } from '../index';
export async function sendTikTok(msg: Message, ctx: Context): Promise<SendResult> {
  if (DRY_RUN) { console.log('[DRYRUN][TIKTOK]', msg.mediaUrl, msg.caption); return { ok: true, id: 'dryrun-tiktok' }; }
  return { ok: false, error: 'TikTok send not implemented in demo' };
}
