'use client';
import { useState } from "react";

export default function RSVPForm({ eventId, referral } : { eventId: string, referral?: string }) {
  const [status, setStatus] = useState<string>("");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      full_name: form.get("full_name"),
      email: form.get("email"),
      phone: form.get("phone"),
      consent_email: form.get("consent_email") === "on",
      consent_sms: form.get("consent_sms") === "on",
      event_id: eventId,
      referral
    };
    const res = await fetch("/api/rsvp", { method: "POST", body: JSON.stringify(payload) });
    const json = await res.json();
    if (json.ok) {
      setStatus("confirmed");
      window.location.href = `/pass/${json.rsvp.id}`;
    } else {
      alert(json.error || "Something went wrong");
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input required name="full_name" placeholder="Full name" className="w-full rounded-xl bg-black/40 p-3 border border-neutral-800" />
      <input required type="email" name="email" placeholder="Email" className="w-full rounded-xl bg-black/40 p-3 border border-neutral-800" />
      <input required name="phone" placeholder="Phone" className="w-full rounded-xl bg-black/40 p-3 border border-neutral-800" />
      <label className="flex items-center gap-2 text-sm opacity-80"><input type="checkbox" name="consent_email" /> Email updates</label>
      <label className="flex items-center gap-2 text-sm opacity-80"><input type="checkbox" name="consent_sms" /> SMS updates (STOP to opt-out)</label>
      <button className="btn btn-primary" type="submit">Confirm RSVP</button>
    </form>
  );
}
