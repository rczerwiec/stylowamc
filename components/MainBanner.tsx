import Image from "next/image";
import dirtTexture from "../public/images/dirt2.jpg"; // Upewnij się, że ścieżka jest poprawna

const MainBanner = () => (
  <div
    className="relative flex flex-col md:flex-row items-center md:items-start px-6 md:px-8 py-8 rounded-xl shadow-strong border border-text-dark max-w-4xl mx-auto overflow-visible"
    style={{
      backgroundImage: `url(${dirtTexture.src})`,
      backgroundSize: "cover",
    }}
  >
    {/* Półprzezroczysta nakładka */}
    <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>

    <div className="relative flex flex-col text-center md:text-left text-white w-full md:pr-60 md:w-auto">
      <h1 className="text-3xl md:text-5xl font-extrabold font-alegreya-sans drop-shadow-lg">
        StylowaMC
      </h1>
      <p className="text-md md:text-lg mt-2 font-medium drop-shadow-lg">
        Szukasz serwera OneBlock?
        <br className="hidden md:block" />
        Dołącz do nas i doświadcz zabawy jakiej nigdy jeszcze nie widziałeś!
      </p>
      <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-md transition transform hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 uppercase">
        SKOPIUJ IP SERWERA
      </button>
    </div>

    {/* Na desktopie obrazek zostaje, na telefonach go nie ma */}
    <div className="hidden md:block absolute top-[-80px] right-[-150px] w-[28rem] h-[28rem] animate-float">
      <Image
        src="/images/logo.png" // Ścieżka do obrazu
        alt="Baner StylowaMC"
        className="w-full h-full object-contain"
        width={800}
        height={600}
      />
    </div>
  </div>
);

export default MainBanner;
