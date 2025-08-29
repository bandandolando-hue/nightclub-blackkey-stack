import { DRY_RUN, Message, SendResult, Context } from '../index';

export async function sendSMS(msg: Message, ctx: Context): Promise<SendResult> {
  if (DRY_RUN) { 
    console.log('[DRYRUN][SMS]', msg.to, msg.text); 
    return { ok: true, id: 'dryrun-sms' }; 
  }
  const twilioModule = await import('twilio');
  const twilio = twilioModule.default ?? twilioModule;
  const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);
  const res = await client.messages.create({ to: msg.to!, from: process.env.TWILIO_FROM!, body: msg.text });
  return { ok: true, id: res.sid };
}