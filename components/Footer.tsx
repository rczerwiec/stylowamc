import { FaDiscord, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => (
  <footer className="p-6 bg-[#1A1A1A] flex flex-col items-center justify-center w-full border-t border-gray-700 shadow-md relative">
    {/* Ikony społecznościowe */}
    <div className="flex space-x-6 mb-4">
      <a href="#" className="text-white hover:text-yellow-400 transition">
        <FaDiscord className="h-6 w-6" />
      </a>
      <a href="#" className="text-white hover:text-yellow-400 transition">
        <FaFacebook className="h-6 w-6" />
      </a>
      <a href="#" className="text-white hover:text-yellow-400 transition">
        <FaTwitter className="h-6 w-6" />
      </a>
    </div>
    
    {/* Prawa autorskie */}
    <p className="text-white text-sm">&copy; 2025 StylowaMC. Wszelkie prawa zastrzeżone.</p>
  </footer>
);

export default Footer;
