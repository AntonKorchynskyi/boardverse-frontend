import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
      <div className="flex flex-col min-h-screen text-gray-100 bg-backgroundPanel">
        <Navbar />
        <main className="flex-grow w-4/5 m-auto" >{children}</main>
        <Footer />
      </div>
  );
}