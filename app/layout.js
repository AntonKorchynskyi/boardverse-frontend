import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "BoardVerse",
  description: "Board game online platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar></Navbar>
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}
