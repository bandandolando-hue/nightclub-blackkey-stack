import RSVPForm from "@/components/RSVPForm";
export default function Widget({ searchParams } : { searchParams: { eventId?: string, ref?: string } }) {
  if (!searchParams.eventId) return <div className="card">Missing eventId</div>;
  return (
    <div className="max-w-md mx-auto p-4">
      <div className="card">
        <h3 className="font-semibold mb-2">RSVP</h3>
        <RSVPForm eventId={searchParams.eventId} referral={searchParams.ref} />
      </div>
    </div>
  );
}
