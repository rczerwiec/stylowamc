import React from 'react';

const InfoBox = () => (
  <div className="mt-8 w-full max-w-3xl bg-[#1A1A1A] p-8 rounded-xl border border-gray-700 text-center font-alegreya-sans shadow-soft">
    <h2 className="text-accent font-extrabold text-2xl mb-2">🛠️ Aktualności z Serwera</h2>
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-yellow-400 font-bold text-xl">🚧 Serwer w trakcie budowy 🚧</h3>
      <p className="text-md text-text-light mt-2">
        Cześć! Intensywnie pracujemy nad nową edycją serwera, która jest już na zaawansowanym etapie. Wkrótce podzielimy się z wami szczegółami. Śledźcie nasze kanały społecznościowe, aby być na bieżąco.
      </p>
      <p className="text-md text-text-light mt-2">
        Udostępniliśmy Wam już jednak pierwszą wersję nowej strony internetowej, na której w przyszłości będziecie mogli korzystać z wielu ciekawych funkcji.
      </p>

    </div>
  </div>
);

export default InfoBox;
