import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sabbar Komodo Cruises | Private Liveaboard",
  description:
    "Sail Komodo aboard Sabbar: a customisable private liveaboard from Labuan Bajo with snorkelling, trekking, beach time and sunset.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
