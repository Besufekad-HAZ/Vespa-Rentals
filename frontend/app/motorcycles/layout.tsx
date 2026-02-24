import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function MotorcyclesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="container mx-auto min-w-0 max-w-[100vw] px-4 py-8 flex-1">{children}</main>
      <Footer />
    </>
  );
}
