import React from 'react';

const InfoBox = () => (
  <div className="mt-8 w-full max-w-3xl bg-[#1A1A1A] p-8 rounded-xl border border-gray-700 text-center font-alegreya-sans shadow-soft">
    <h2 className="text-accent font-extrabold text-2xl mb-2">Aktualności z Serwera</h2>
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-yellow-400 font-bold text-xl pb-2">Wszystko idzie w dobrym kierunku! </h3>
      <p>
        Minał właśnie tydzień od startu serwera, a my już w tym możemy pochwalić się bardzo dobrymi wynikami!
      </p>
      <br />
      <p>
       W zaledwie tydzień od startu, udało nam się zwrócić koszty wystartowania serwera oraz przyciągnąć łącznie 400 graczy! Stale rozwijamy nasz serwer OneBlock o nowe funkcję oraz na bieżąco poprawiamy błędy i zmieniamy rzeczy, które mogą się Wam nie podobać.
      </p>
      <br />
      <p>
        Jeszcze raz wielkie dzięki za tak ogromne zainteresowanie serwerem!
      </p>
    </div>
  </div>
);

export default InfoBox;
