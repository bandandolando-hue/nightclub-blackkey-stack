// app/backoffice/events/[id]/tickets/page.tsx
export default function EventTicketsPage(props: any) {
  const id = String(props?.params?.id ?? "");

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Tickets for Event {id}</h1>
      <p className="opacity-70">Manage ticket tiers for event {id} here.</p>
      {/* TODO: render tiers table / forms */}
    </div>
  );
}
