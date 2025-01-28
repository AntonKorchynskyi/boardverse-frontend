import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "BoardVerse",
  description: "Board game online platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen text-gray-100 bg-backgroundPanel">
        <Navbar />
        <main className="flex-grow" style={{width: '80%', margin: 'auto'}}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

