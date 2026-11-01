import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loop Zero — AI tools for Bangkok real estate agents",
  description:
    "Three AI tools built for the daily work of Bangkok real estate agents: listing descriptions, review replies, and lead qualification. Free tier, paid plans from ฿990/mo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-paper text-ink">{children}</body>
    </html>
  );
}
