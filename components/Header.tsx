import Image from 'next/image';

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
          <li><a href="#" className="hover:text-yellow-400 transition">STRONA GŁÓWNA</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition">GŁOSUJ</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition">RANKING</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition">WIKI</a></li>
          <li>
            <a
              href="#"
              className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition transform hover:scale-105 animate-pulse"
            >
              SKLEP
            </a>
          </li>
        </ul>
      </nav>
    </div>
  
    {/* Panel użytkownika */}
    <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg shadow-md">
      <div className="w-10 h-10 rounded-md flex items-center justify-center">
        <img src={`https://minotar.net/cube/Stylowy/64`} alt="Stylowy" className="w-full h-full" />
      </div>
      <span className="text-white font-medium ml-2">Witaj, Stylowy!</span>
    </div>
  </header>
  
);

export default Header;
