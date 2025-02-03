import Image from "next/image";

const MainBanner = () => (
  <div className="relative flex items-center bg-[#8B2E06] px-16 rounded-xl shadow-strong border border-text-dark max-w-4xl mx-auto overflow-visible">
    <div className="flex flex-col text-left text-white">
      <h1 className="text-5xl font-extrabold font-alegreya-sans">StylowaMC</h1>
      <p className="text-lg mt-2 font-medium">
        Szukasz serwera OneBlock?
        <br />
        Dołącz do nas i doświadcz zabawy jakiej nigdy jeszcze nie widziałeś!
      </p>
      <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-md transition transform hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 uppercase">
        SKOPIUJ IP SERWERA
      </button>
    </div>
    <div className="relative w-80 h-80 ml-auto opacity-0">
      {" "}
      {/* Placeholder dla wypełnienia tła */}
    </div>
    <div className="absolute top-[-80px] right-[-130px] w-[28rem] h-[28rem] animate-float">
      {" "}
      {/* Powiększone i lepiej dopasowane logo */}
      <Image
        src="/images/logo.png" // Ścieżka do obrazu
        alt="Baner StylowaMC"
        className="w-full h-full object-contain"
        width={800} // Szerokość obrazu w pikselach
        height={600} // Wysokość obrazu w pikselach
      />
    </div>
  </div>
);

export default MainBanner;
