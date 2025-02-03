import React from 'react';
import { FaDiscord, FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa';
import packageJson from '../package.json'; // Adjust the path as needed

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const version = packageJson.version;

  return (
    <footer className="p-6 bg-[#1A1A1A] flex flex-col items-center justify-center w-full border-t border-gray-700 shadow-md relative">
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
      <p className="text-white text-sm">
        &copy; {currentYear} StylowaMC. Wszelkie prawa zastrzeżone. | Wersja portalu: {version}
      </p>
    </footer>
  );
};

export default Footer;
