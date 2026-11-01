import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Handoff — AI Automation Agency",
  description:
    "AI automations for worldwide small businesses. Quick bots, workflow systems, and ongoing support. No enterprise theater.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="grain">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
