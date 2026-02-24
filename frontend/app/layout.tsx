import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-screen bg-[#0a0a0f] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
