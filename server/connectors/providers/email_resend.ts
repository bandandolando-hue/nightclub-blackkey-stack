import { DRY_RUN, Message, SendResult, Context } from '../index';
export async function sendEmail(msg: Message, ctx: Context): Promise<SendResult> {
  if (DRY_RUN) { console.log('[DRYRUN][EMAIL]', msg.to, msg.subject); return { ok: true, id: 'dryrun-email' }; }
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const res = await resend.emails.send({ from: 'Club <noreply@yourclub.com>', to: [msg.to!], subject: msg.subject||'', html: msg.html||'', text: msg.text });
  if ((res as any).error) return { ok: false, error: String((res as any).error) };
  return { ok: true, id: (res as any)?.data?.id || 'resend' };
}
