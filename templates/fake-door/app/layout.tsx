import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "Something new is on the way. Leave your email for early access.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
