import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <div className="nav-bar z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="">
          Home
        </Link>
        <Link
          href="/wallet"
          className="group rounded-full bg-[var(--secondary)] px-3 py-3 flex items-center shadow-lg transition-all"
        >
          <Image
            src="/images/wallet.png"
            alt="Wallet Icon"
            width={20}
            height={20}
          />
          <span className="pl-2 text-sm opacity-0 translate-x-1 group-hover:flex group-hover:translate-x-0 transition-all group-hover:opacity-100">
            Wallet
          </span>
        </Link>
      </nav>
    </div>
  );
}
