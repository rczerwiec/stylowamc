import React from 'react';

const InfoBox = () => (
  <div className="mt-8 w-full max-w-3xl bg-[#1A1A1A] p-8 rounded-xl border border-gray-700 text-center font-alegreya-sans shadow-soft">
    <h2 className="text-accent font-extrabold text-2xl mb-2">🛠️ Aktualności z Serwera</h2>
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-yellow-400 font-bold text-xl pb-2">To już dziś! </h3>
      <p>
        Już dzisiaj startuje nasz serwer OneBlock!</p><br></br><p> Nasz serwer jak i strona są w wersji Beta, co oznacza, że mogą pojawiać się na nim błędy (szczególnie na stronie). 
        Pracujemy również nad nowymi metodami płatności oraz zwiększeniem ilości benefitów płynących z rang. </p>
        <br></br><p>W dniu 09.03.2025 pojawi się nowa zakładka w sklepie z rozpiską wszystkich dostępnych rang.
      </p>
    </div>
  </div>
);

export default InfoBox;
