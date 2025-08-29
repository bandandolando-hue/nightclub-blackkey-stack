// app/widget/page.tsx
export default function WidgetPage(props: any) {
  const eventId = props?.searchParams?.eventId ?? undefined;
  const ref = props?.searchParams?.ref ?? undefined;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Widget</h1>
      <div className="opacity-70 text-sm">
        eventId: {String(eventId ?? "")} | ref: {String(ref ?? "")}
      </div>
      {/* TODO: render actual widget preview/config */}
    </div>
  );
}
