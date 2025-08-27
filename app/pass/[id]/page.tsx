import { createClient } from "@/lib/supabase";
import QRCode from "qrcode";

export default function Page(props: any) {
  const id = String(props?.params?.id ?? "");
  return <div>Item {id}</div>;
}

