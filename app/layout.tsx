import "./globals.css";
import { ReactNode } from "react";
import AdminLogin from "@/components/AdminLogin";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Nightclub Blackkey",
  description: "Marketing Engine Draft",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        {/* Admin login modal appears if ?admin=login */}
        <AdminLogin />

        <div className="container py-8">
          {/* Header with navigation */}
          <header className="flex justify-between items-center py-4">
            <h1 className="font-bold text-xl">Nightclub Blackkey</h1>
            <nav className="flex gap-4 text-sm opacity-80">
  <a href="/calendar" className="hover:opacity-100">Calendar</a>
  <a href="/staff" className="hover:opacity-100">Staff</a>
  <a href="/backoffice/events" className="hover:opacity-100">Admin</a>
</nav>


          </header>

          {/* Page content */}
          {children}
        </div>
      </body>
    </html>
  );
}


