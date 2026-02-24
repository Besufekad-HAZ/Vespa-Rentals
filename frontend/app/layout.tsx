import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Vespa Rentals | Rent or List Scooters",
  description:
    "Rent a Vespa for the day or list your own. Browse, reserve, and manage motorcycle rentals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sora.variable} min-h-screen overflow-x-hidden bg-[#0b0a0d] text-white antialiased`}
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }}
      >
        {children}
      </body>
    </html>
  );
}
