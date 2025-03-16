import "./globals.css";

export const metadata = {
  title: "BoardVerse",
  description: "Board game online platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

