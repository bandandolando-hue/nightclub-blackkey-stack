import { DRY_RUN, Message, SendResult, Context } from '../index';
export async function sendThreads(msg: Message, ctx: Context): Promise<SendResult> {
  if (DRY_RUN) { console.log('[DRYRUN][THREADS]', msg.caption); return { ok: true, id: 'dryrun-threads' }; }
  return { ok: false, error: 'Threads send not implemented in demo' };
}
