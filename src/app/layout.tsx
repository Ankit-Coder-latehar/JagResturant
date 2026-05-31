import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jag Restaurant Dubai | Authentic Turkish & Azerbaijani Fine Dining",
  description: "Experience the pinnacle of culinary artistry at Jag Restaurant, Dubai. Fusing rich Turkish and Azerbaijani imperial traditions with Michelin-inspired luxury. Located on Jumeirah Beach Road.",
  keywords: [
    "Jag Restaurant Dubai",
    "Turkish Cuisine Dubai",
    "Azerbaijani Cuisine Dubai",
    "Jumeirah Fine Dining",
    "Lüks Türk Restoranı",
    "Shah Plov Dubai",
    "Adana Kebab Dubai",
    "Authentic Dining Dubai"
  ],
  authors: [{ name: "Jag Restaurant Concierge" }],
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
