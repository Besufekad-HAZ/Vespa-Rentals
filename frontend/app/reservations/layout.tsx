import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ReservationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="container mx-auto px-4 py-8 flex-1">{children}</main>
      <Footer />
    </>
  );
}
