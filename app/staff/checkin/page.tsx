'use client';
import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { createBrowserSupabase } from "@/lib/supabase";

export default function Checkin() {
  const supabase = createBrowserSupabase();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let active = true;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (!videoRef.current) return;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        while (active) {
          const res = await codeReader.decodeOnceFromVideoDevice(undefined, videoRef.current!);
          const text = res.getText();
          setResult(text);
          if (text.startsWith("rsvp:")) {
            const rsvpId = text.split(":")[1];
            await supabase.from("checkins").insert({ rsvp_id: rsvpId });
          }
        }
      } catch (e) { console.error(e); }
    })();
    return () => { active = false; codeReader.reset(); };
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Check-in</h1>
      <div className="card space-y-3">
        <video ref={videoRef} className="w-full rounded-xl" />
        <div className="text-sm opacity-80">Result: {result || "—"}</div>
      </div>
    </div>
  );
}
