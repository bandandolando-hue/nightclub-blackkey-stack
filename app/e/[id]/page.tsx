// app/e/[id]/page.tsx
export default function EntityDetailPage(props: any) {
  const id = String(props?.params?.id ?? "");
  // const ref = props?.searchParams?.ref ?? undefined; // optional

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Entity {id}</h1>
      <p className="opacity-70">Placeholder details for {id}.</p>
    </div>
  );
}
