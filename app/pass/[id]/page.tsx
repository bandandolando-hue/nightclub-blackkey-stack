export default function Page(props: any) {
  const id = String(props?.params?.id ?? "");
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Item {id}</h1>
      <p className="opacity-70">Placeholder page for {id}.</p>
    </div>
  );
}

