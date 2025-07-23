import { Lato } from "next/font/google";
import "./globals.css";
import { Layer } from "@/components/Layer";
import { Header } from "@/components/Header";

const primaryFont = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${primaryFont.className} text-[var(--primary)] bg-gradient-to-br from-slate-900 to-cyan-900`}
      >
        <Header />
        <Layer />
        <div className="container m-auto max-w-[760px]">{children}</div>
      </body>
    </html>
  );
}
