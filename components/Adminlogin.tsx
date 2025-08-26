'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLogin() {
  const router = useRouter();
  const q = useSearchParams();
  const show = q.get('admin') === 'login';

  const [pin, setPin] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!show) { setPin(''); setErr(''); setBusy(false); }
  }, [show]);

  if (!show) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || `HTTP ${res.status}`);
      // remove ?admin=login from URL and refresh
      const url = new URL(window.location.href);
      url.searchParams.delete('admin');
      window.history.replaceState({}, '', url.toString());
      router.refresh();
    } catch (e:any) {
      setErr(e.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={submit}
        className="bg-neutral-900 border border-neutral-700 rounded-2xl p-5 w-full max-w-xs shadow-xl"
      >
        <h3 className="text-lg font-semibold mb-3">Admin sign-in</h3>
        <input
          type="password"
          inputMode="numeric"
          pattern="\d*"
          placeholder="Enter PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full bg-black/40 border border-neutral-700 rounded-xl p-3 mb-2"
          autoFocus
        />
        {err && <div className="text-red-400 text-sm mb-2">{err}</div>}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={busy || !pin}
            className="btn btn-primary"
          >
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.delete('admin');
              window.history.replaceState({}, '', url.toString());
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
