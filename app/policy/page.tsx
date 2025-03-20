'use client';

import React from "react";
import { FaShieldAlt, FaUserShield, FaFileContract, FaGavel, FaCreditCard, FaGamepad, FaUserCog, FaLock, FaHandshake, FaBalanceScale } from "react-icons/fa";
import { motion } from "framer-motion";

const terms = [
  {
    title: "§1 Postanowienia ogólne",
    icon: <FaShieldAlt />,
    content: [
      "Serwis internetowy działający pod adresem www.stylowamc.pl oferujący sprzedaż wirtualnych przedmiotów oraz usług. Prowadzony przez Radosława Czerwca prowadzącego działalność nierejestrowalną pod adresem Czciradz 31a/7 67-120 Kożuchów.",
      "Niniejszy Regulamin skierowany jest zarówno do Konsumentów, jak i do Przedsiębiorców korzystających ze Sklepu i określa zasady korzystania ze Sklepu internetowego oraz zasady i tryb zawierania Umów Sprzedaży z Klientem na odległość za pośrednictwem Sklepu.",
      "Każdy Użytkownik z chwilą podjęcia czynności zmierzających do korzystania z Usług Elektronicznych Serwisu internetowego stylowamc.pl, zobowiązany jest do przestrzegania postanowień niniejszego Regulaminu.",
      "Właściciel strony i sklepu zastrzega sobie pełne prawo do wprowadzenia zmian w poniższym regulaminie.",
      "Właściciel strony i sklepu zastrzega sobie pełne prawo do zmian w prowadzonych usługach oraz cenach reprezentujących usługi świadczone przez firmę obsługującą płatności.",
      "Administracja nie odpowiada za utracone zakupione wirtualne przedmioty lub usługi, które mogły wyniknąć np. z nadania blokady na konto gracza, który dopuścił się złamania regulaminu gry dostępnego na naszej stronie, a także w przypadku włamania na konto gracza.",
      "Warunkiem korzystania przez Użytkownika z Konta w naszym serwisie internetowym jest zapoznanie się z Regulaminem i akceptacja jego postanowień.",
    ],
  },
  {
    title: "§2 Definicje",
    icon: <FaFileContract />,
    content: [
      "USŁUGOBIORCA / klient / gracz - osoba fizyczna lub prawna, która użytkuje serwer gier lub zakupiła usługę na stronie www.stylowamc.pl/shop.",
      "USŁUGA - udostępnienie użytkownikowi uprawnień na serwerze gry lub dostarczenie wirtualnych przedmiotów, które mogą być wykorzystywane tylko i wyłącznie na naszym serwerze dostępnym w grze Minecraft pod adresem stylowamc.pl.",
      "SERWIS - Strona internetowa stylowamc.pl dostępna pod adresem https://www.stylowamc.pl należąca do usługodawcy.",
    ],
  },
  {
    title: "§3 Warunki korzystania z usług",
    icon: <FaGavel />,
    content: [
      "Użytkownik zobowiązuje się do korzystania z Serwisu zgodnie z obowiązującymi przepisami prawa i zasadami współżycia społecznego.",
      "Zabrania się dostarczania treści o charakterze bezprawnym.",
      "Użytkownik akceptuje fakt, że zakupione przedmioty i usługi są wirtualne i nie mają wartości materialnej.",
      "Użytkownik ma prawo do korzystania z zakupionych usług tylko w okresie ich ważności.",
    ],
  },
  {
    title: "§4 Kontakt",
    icon: <FaUserShield />,
    content: [
      "Kontakt z administracją serwera jest możliwy poprzez:",
      "   - Discord: https://discord.gg/stylowamc",
      "   - E-mail: kontakt@stylowamc.pl",
      "Czas odpowiedzi może wynosić do 48 godzin roboczych.",
    ],
  },
  {
    title: "§5 Płatności",
    icon: <FaCreditCard />,
    content: [
      "Wszystkie płatności obsługiwane są przez zewnętrznego operatora płatności.",
      "Ceny podane w sklepie są cenami brutto i zawierają podatek VAT.",
      "Realizacja usługi następuje automatycznie po zaksięgowaniu wpłaty.",
      "W przypadku problemów z płatnością, prosimy o kontakt z administracją.",
    ],
  },
  {
    title: "§6 Rodzaje świadczonych usług",
    icon: <FaGamepad />,
    content: [
      "Serwis świadczy następujące usługi:",
      "   - Sprzedaż rang premium",
      "   - Sprzedaż wirtualnych przedmiotów",
      "   - Dostęp do specjalnych funkcji serwera",
      "Szczegółowy opis usług znajduje się w sklepie.",
    ],
  },
  {
    title: "§7 Zasady korzystania",
    icon: <FaUserCog />,
    content: [
      "Użytkownik zobowiązuje się do:",
      "   - Przestrzegania regulaminu serwera",
      "   - Nieudostępniania swojego konta osobom trzecim",
      "   - Niekorzystania z niedozwolonych modyfikacji gry",
      "Naruszenie zasad może skutkować zablokowaniem konta.",
    ],
  },
  {
    title: "§8 Polityka prywatności RODO",
    icon: <FaLock />,
    content: [
      "Administratorem danych osobowych jest właściciel serwisu.",
      "Dane osobowe przetwarzane są zgodnie z RODO.",
      "Użytkownik ma prawo do:",
      "   - Dostępu do swoich danych",
      "   - Sprostowania danych",
      "   - Usunięcia danych",
      "   - Ograniczenia przetwarzania",
    ],
  },
  {
    title: "§9 Odstąpienie od umowy",
    icon: <FaHandshake />,
    content: [
      "Ze względu na charakter świadczonych usług (treści cyfrowe), prawo do odstąpienia od umowy jest wyłączone.",
      "Użytkownik wyraża zgodę na rozpoczęcie świadczenia usługi przed upływem terminu do odstąpienia od umowy.",
      "Akceptacja regulaminu oznacza utratę prawa do odstąpienia od umowy.",
    ],
  },
  {
    title: "§10 Postanowienia końcowe",
    icon: <FaBalanceScale />,
    content: [
      "Regulamin wchodzi w życie z dniem publikacji.",
      "Właściciel zastrzega sobie prawo do zmiany regulaminu.",
      "W sprawach nieuregulowanych zastosowanie mają przepisy prawa polskiego.",
      "Wszelkie spory będą rozstrzygane przez sąd właściwy dla siedziby właściciela.",
    ],
  },
];

export default function PolicyPage() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Nagłówek */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent mb-2">
          Regulamin Serwera
        </h1>
        <p className="text-gray-400">
          Zapoznaj się z zasadami korzystania z naszego serwisu
        </p>
      </div>

      {/* Sekcje regulaminu */}
      <div className="grid grid-cols-1 gap-6">
        {terms.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 transition-all duration-300 hover:border-gray-600"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-yellow-500 text-2xl">
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold">
                {section.title}
              </h2>
            </div>
            <ul className="space-y-4">
              {section.content.map((item, i) => (
                <li 
                  key={i} 
                  className={`pl-6 relative text-gray-300 before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-yellow-500/50 before:rounded-full ${
                    item.startsWith('   ') ? 'ml-6 before:hidden' : ''
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
