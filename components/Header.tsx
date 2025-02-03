import Image from "next/image";
import Link from "next/link";

const Header = () => (
  <header className="p-4 bg-[#1A1A1A] flex items-center justify-between w-full border-b border-gray-700 shadow-md relative overflow-visible">
    {/* Logo i Nawigacja */}
    <div className="flex items-center space-x-6">
      <div className="absolute w-28 h-28 flex items-center">
        <Image
          src="/images/logo.png"
          alt="Logo"
          className="h-full w-auto"
          width={500}
          height={300}
        />
      </div>
      <nav>
        <ul className="flex space-x-6 text-lg font-semibold text-white pl-28">
          <li>
            <Link href="/" className="hover:text-yellow-400 transition">
              STRONA GŁÓWNA
            </Link>
          </li>
          <li>
            <Link href="/vote" className="hover:text-yellow-400 transition">
              GŁOSUJ
            </Link>
          </li>
          <li>
            <Link href="/ranking" className="hover:text-yellow-400 transition">
              RANKING
            </Link>
          </li>
          <li>
            <Link
              href="https://stylowamc.fandom.com/pl/f"
              className="hover:text-yellow-400 transition"
            >
              WIKI
            </Link>
          </li>
          <li>
            <Link
              href="/shop"
              className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition transform hover:scale-105 animate-pulse"
            >
              SKLEP
            </Link>
          </li>
        </ul>
      </nav>
    </div>

    {/* Panel użytkownika */}
    <Link href="/login">
    <span className="flex items-center bg-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <div className="w-10 h-10 rounded-full ring-2 ring-gray-300 flex items-center justify-center overflow-hidden">
        <img
          src="https://minotar.net/helm/Steve/64"
          alt="Gość"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-white font-medium ml-3">
        <span className="block">Witaj, Gość</span>
        <span className="block text-sm text-blue-400">zaloguj się</span>
      </div>
    </span>
  </Link>
  </header>
);

export default Header;

