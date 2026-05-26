import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import SmoothScroll from "@/components/shared/SmoothScroll";


export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen">
      <Navbar/>
      <SmoothScroll />
      
      <main className="relative z-10 min-h-dvh">
        {children}
      </main>
      <Footer/>
    </div>
  );
}