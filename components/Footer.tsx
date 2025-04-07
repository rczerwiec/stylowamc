import React, { useState } from "react";
import { FaDiscord, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";
import packageJson from "../package.json"; // Adjust the path as needed
import { useRouter } from "next/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const version = packageJson.version;
  const router = useRouter();
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleCopyrightClick = () => {
    const currentTime = new Date().getTime();
    
    // Reset licznika jeśli minęło więcej niż 3 sekundy od ostatniego kliknięcia
    if (currentTime - lastClickTime > 3000) {
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }
    
    setLastClickTime(currentTime);
    
    // Po 5 kliknięciach w ciągu 3 sekund, przekieruj do panelu admina
    if (clickCount + 1 >= 5) {
      router.push('/admin/dashboard');
      setClickCount(0);
    }
  };

  return (
    <footer className="w-full bg-[#1A1A1A] py-6 flex flex-col items-center justify-center border-t border-gray-700 shadow-md">
      {/* Social Media Icons */}
      <div className="flex space-x-6 mb-4">
        <a href="http://dc.stylowamc.pl/" className="text-white hover:text-yellow-400 transition" aria-label="Discord">
          <FaDiscord className="h-6 w-6" />
        </a>
        <a href="http://fb.stylowamc.pl/" className="text-white hover:text-yellow-400 transition" aria-label="Facebook">
          <FaFacebook className="h-6 w-6" />
        </a>
        <a href="http://tiktok.stylowamc.pl/" className="text-white hover:text-yellow-400 transition" aria-label="TikTok">
          <FaTiktok className="h-6 w-6" />
        </a>
        <a href="http://yt.stylowamc.pl/" className="text-white hover:text-yellow-400 transition" aria-label="YouTube Channel 1">
          <FaYoutube className="h-6 w-6" />
        </a>
        <a href="http://stylowy.stylowamc.pl/" className="text-white hover:text-yellow-400 transition" aria-label="YouTube Channel 2">
          <FaYoutube className="h-6 w-6" />
        </a>
      </div>

      {/* Copyright and Version */}
      <p className="text-white text-sm text-center w-full px-4">
        <span 
          onClick={handleCopyrightClick} 
          className="cursor-pointer hover:text-yellow-400 transition-colors"
          title="Kliknij 5 razy, aby przejść do panelu administratora"
        >
          &copy;
        </span> {currentYear} StylowaMC. Wszelkie prawa zastrzeżone. <br className="md:hidden" />
        Wersja portalu: {version}
      </p>
    </footer>
  );
};

export default Footer;
