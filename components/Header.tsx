import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <div className="nav-bar z-10">
      <nav className="container max-w-[900px] mx-auto flex justify-between items-center">
        <Link href="/" className="flex">
          <Image src="/images/home.png" alt="Logo" width={35} height={35} />
        </Link>
        <Link
          href="/wallet"
          className="group flex items-center bg-[var(--secondary)] rounded-full  overflow-hidden h-10 w-10 shadow-lg pl-[10px] transition-all duration-300 ease-in-out hover:w-24"
        >
          <Image
            src="/images/wallet.png"
            alt="Wallet Icon"
            width={20}
            height={20}
          />
          <span className="text-sm opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-2 transition-[opacity, transform] duration-400 delay-100 pr-3">
            Wallet
          </span>
        </Link>
      </nav>
    </div>
  );
}
