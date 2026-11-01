import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Review Responder — Demo",
  description:
    "Generate professional, empathetic replies to customer reviews with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
