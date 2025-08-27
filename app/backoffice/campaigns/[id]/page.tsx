// app/backoffice/campaigns/[id]/page.tsx

export default function CampaignDetailPage(props: any) {
  const id = String(props?.params?.id ?? "");

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Campaign {id}</h1>
      <p className="opacity-70">
        This is a stub detail page for campaign {id}.
      </p>
      {/* Add real UI/data here later */}
    </div>
  );
}
// app/backoffice/