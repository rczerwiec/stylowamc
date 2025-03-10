import React from 'react';

const InfoBox = () => (
  <div className="mt-8 w-full max-w-3xl bg-[#1A1A1A] p-8 rounded-xl border border-gray-700 text-center font-alegreya-sans shadow-soft">
    <h2 className="text-accent font-extrabold text-2xl mb-2">🛠️ Aktualności z Serwera</h2>
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-yellow-400 font-bold text-xl pb-2">To już dziś! </h3>
      <p>
        Dziękujemy za ogromne zainteresowanie serwerem w pierwszych 24h! Zakładaliśmy, że na starcie będzie około 30 graczy, jednak serwer w peaku osiągnął liczbę 47 graczy, a łącznie odwiedziło go prawie 200 graczy! Cieszymy się, że serwer wam się podoba i będziemy stale chcieli dodawać wam nowe tryby, funkcje oraz ulepszać to co obecnie mamy.
      </p>
      <br />
      <p>
        Wiemy również, że serwer boryka się wciąż z wieloma błędami, które na bieżąco łatamy... Pamiętajcie, że serwer jest budowany kompletnie od zera przez zaledwie 5 osób, które robią to wszystko hobbistycznie. Na pierwsze edycje trybów również trzeba zawsze brać poprawkę, że są one swoistymi wersjami &quot;beta&quot;.
      </p>
      <br />
      <p>
        Jeszcze raz wielkie dzięki!
      </p>
    </div>
  </div>
);

export default InfoBox;
