import { createClient } from "@/lib/supabase";
export default async function SubscribersPage(){
  const supabase = createClient();
  const { data: subs } = await supabase.from('subscribers').select('*').limit(200).order('created_at', { ascending: false });
  return (
    <div className="card">
      <div className="font-semibold mb-2">Subscribers</div>
      <table className="w-full text-sm">
        <thead className="opacity-70"><tr><th className="text-left">Name</th><th className="text-left">Email</th><th className="text-left">Phone</th><th>Tags</th><th>Consents</th></tr></thead>
        <tbody>
          {subs?.map((s:any) => (
            <tr key={s.id} className="border-t border-neutral-800">
              <td>{s.full_name || '—'}</td><td>{s.email || '—'}</td><td>{s.phone || '—'}</td>
              <td>{(s.tags||[]).join(', ')}</td><td>{s.consent_email ? 'Email ' : ''}{s.consent_sms ? 'SMS' : ''}</td>
            </tr>
          )) || null}
        </tbody>
      </table>
    </div>
  );
}
