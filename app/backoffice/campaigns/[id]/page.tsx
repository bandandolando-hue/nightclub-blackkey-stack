type Params = { id: string };
export default function Page({ params }: { params: Params }) {
  const { id } = params;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Item {id}</h1>
      <p className="opacity-70">Placeholder page for {id}.</p>
    </div>
  );
}
