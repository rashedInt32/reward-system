import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="nav-bar">
          <Link href="/" className="nav-link mr-4">
            Home
          </Link>
          <Link href="/wallet" className="nav-link">
            Wallet
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
