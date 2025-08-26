export type ParsedTier = { name: string; price_cents: number; currency: string; admit_before?: string; is_comp?: boolean; };
export function parseTier(line: string): ParsedTier | null {
  const s = line.trim(); if (!s) return null;
  const comp = /comp|free\b/i.test(s) && !/\$\d/.test(s);
  const priceMatch = s.match(/\$?\s*(\d+)(?:\.(\d{2}))?/);
  const price = priceMatch ? parseInt(priceMatch[1], 10) * 100 + (priceMatch[2] ? parseInt(priceMatch[2],10) : 0) : 0;
  const admitMatch = s.match(/before\s+(\d{1,2})(?::?(\d{2}))?\s*(am|pm)?/i) || s.match(/\bb4\s+(\d{1,2})(am|pm)?/i);
  let admitIso: string | undefined;
  if (admitMatch) {
    const hour = parseInt(admitMatch[1], 10); const minute = admitMatch[2] ? parseInt(admitMatch[2],10) : 0;
    const ampm = admitMatch[3] || (admitMatch[2] ? '' : admitMatch[2]); let h = hour % 12;
    if ((ampm || '').toLowerCase() === 'pm') h += 12;
    const now = new Date(); now.setHours(h, minute, 0, 0); admitIso = now.toISOString();
  }
  const nameMatch = s.match(/^[A-Za-z ]+/);
  const name = nameMatch ? nameMatch[0].trim().toUpperCase() : (comp ? 'COMP' : 'GA');
  return { name, price_cents: comp ? 0 : price, currency: 'USD', admit_before: admitIso, is_comp: comp || price === 0 };
}
