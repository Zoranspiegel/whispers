import Footer from './footer';
import Header from './header';
import Navbar from './navbar';

export default function privateLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full max-w-sm grid mx-auto grid-rows-[10%,10%,1fr,2%] py-2 gap-2">
      <Header />
      <Navbar />
      <main className="rounded-lg border-2 border-foreground text-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
