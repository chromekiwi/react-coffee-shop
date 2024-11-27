import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Main({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="flex justify-center my-12 px-5">{children}</main>
      <Footer />
    </>
  );
}
