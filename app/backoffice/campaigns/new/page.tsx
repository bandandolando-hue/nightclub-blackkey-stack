'use client';
import { useState } from "react";
export default function NewCampaign(){
  const [name, setName] = useState('Friday Hype Blast');
  const [channels, setChannels] = useState<string[]>(['email','sms','instagram']);
  const [caption, setCaption] = useState('Neon Jungle tonight • free b4 10 with RSVP');
  const [html, setHtml] = useState('<h2>Neon Jungle</h2><p>Free before 10 with RSVP</p>');
  const [text, setText] = useState('Neon Jungle tonight. Free before 10 with RSVP');
  const [mediaUrl, setMediaUrl] = useState('https://placehold.co/1080x1350');
  function toggle(c:string){ setChannels(prev => prev.includes(c) ? prev.filter(x=>x!==c) : [...prev,c]); }
  async function save(){
    const res = await fetch('/api/admin/campaigns', { method: 'POST', body: JSON.stringify({ name, channels, caption, html, text, mediaUrl }) });
    if(!res.ok){ alert('Save failed'); return; }
    const { id } = await res.json(); window.location.href = `/admin/campaigns/${id}`;
  }
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="card space-y-3">
        <input className="w-full rounded-xl bg-black/40 p-3 border border-neutral-800" value={name} onChange={e=>setName(e.target.value)} placeholder="Campaign name" />
        <div className="text-sm opacity-80">Channels</div>
        <div className="flex flex-wrap gap-2">
          {['email','sms','instagram','threads','tiktok','x','discord'].map(c => (
            <button key={c} onClick={()=>toggle(c)} className={`btn ${channels.includes(c)?'btn-primary':''}`}>{c}</button>
          ))}
        </div>
      </div>
      <div className="card space-y-3">
        <div className="font-semibold">Content</div>
        <input className="w-full rounded-xl bg-black/40 p-3 border border-neutral-800" value={mediaUrl} onChange={e=>setMediaUrl(e.target.value)} placeholder="Media URL (1080x1350 image for IG)" />
        <textarea className="w-full h-24 rounded-xl bg-black/40 p-3 border border-neutral-800" value={caption} onChange={e=>setCaption(e.target.value)} placeholder="Caption / post text" />
        <textarea className="w-full h-24 rounded-xl bg-black/40 p-3 border border-neutral-800" value={html} onChange={e=>setHtml(e.target.value)} placeholder="Email HTML" />
        <textarea className="w-full h-24 rounded-xl bg-black/40 p-3 border border-neutral-800" value={text} onChange={e=>setText(e.target.value)} placeholder="SMS text" />
        <button onClick={save} className="btn btn-primary">Save</button>
      </div>
    </div>
  );
}
