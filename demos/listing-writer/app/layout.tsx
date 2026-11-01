import type { Metadata } from 'next';
import { Playfair_Display, Manrope } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'AI Listing Writer — Demo',
  description:
    'Generate compelling real-estate listings with AI. Drop in property details, get a polished description.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
