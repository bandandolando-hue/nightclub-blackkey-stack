import { createClient } from "@/lib/supabase";
import QRCode from "qrcode";

export default async function PassPage({ params } : { params: { id: string } }) {
  const supabase = createClient();
  const { data: rsvp } = await supabase.from("rsvps").select("*").eq("id", params.id).single();
  if (!rsvp) return <div className="card">Pass not found.</div>;
  const payload = `rsvp:${rsvp.id}`;
  const svg = await QRCode.toString(payload, { type: "svg", margin: 0 });
  return (
    <div className="card space-y-3">
      <div className="text-sm opacity-70">Show this at the door.</div>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
      <div className="text-xs opacity-60">Admit before: {new Date(rsvp.admit_before).toLocaleTimeString()}</div>
    </div>
  );
}
