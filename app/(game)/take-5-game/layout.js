import Navbar from "@/components/Navbar";

export const metadata = {
    title: "6 Nimmt (Game)",
  };
  
  export default function GameLayout({ children }) {
    return (
      <div className="flex flex-col min-h-screen text-gray-100 bg-gray-900 w-full">
        {/* should probably have a unique navBar */}
        <Navbar />
        <main className="flex-grow mx-0">
          {children}
        </main>
      </div>
    );
  }
  