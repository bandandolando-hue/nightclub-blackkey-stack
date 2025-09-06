// app/backoffice/events/[id]/tickets/page.tsx
// app/e/[id]/page.tsx (example)
type Params = { id: string };

export default async function Page(
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;   // <-- must await
  // ...rest of the page

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Tickets for Event {id}</h1>
      <p className="opacity-70">Manage ticket tiers for event {id} here.</p>
      {/* TODO: render tiers table / forms */}
    </div>
  );
}
