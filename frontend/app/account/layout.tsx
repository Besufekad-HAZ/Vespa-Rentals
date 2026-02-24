import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="container mx-auto min-w-0 max-w-[100vw] px-4 py-8 min-h-[calc(100vh-8rem)]">{children}</main>
      <Footer />
    </>
  );
}
