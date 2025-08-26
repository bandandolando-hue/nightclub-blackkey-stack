'use client';
import { useEffect, useState } from "react";
import { parseTier } from "@/lib/tierParser";

export default function TicketsPage({ params }:{ params: { id: string } }){
  const [lines, setLines] = useState<string>("GA $15\nFREE before 10pm\nVIP $50");
  const [parsed, setParsed] = useState<any[]>([]);
  useEffect(() => { const p = lines.split('\n').map(l => parseTier(l)).filter(Boolean); setParsed(p as any[]); }, [lines]);
  async function save(){
    const res = await fetch(`/api/admin/events/${params.id}/tiers`, { method: 'POST', body: JSON.stringify({ tiers: parsed }) });
    if(!res.ok){ alert('Save failed'); return; }
    alert('Saved');
  }
  return (
    <div className="space-y-4">
      <div className="card">
        <div className="font-semibold mb-2">Paste ticket tiers (one per line)</div>
        <textarea value={lines} onChange={e=>setLines(e.target.value)} className="w-full h-40 rounded-xl bg-black/40 p-3 border border-neutral-800" />
        <button onClick={save} className="btn btn-primary mt-3">Save tiers</button>
      </div>
      <div className="card">
        <div className="font-semibold mb-2">Parsed preview</div>
        <pre className="text-xs">{JSON.stringify(parsed, null, 2)}</pre>
      </div>
    </div>
  );
}
