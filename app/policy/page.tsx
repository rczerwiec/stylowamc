import React from "react";

const terms = [
  {
    title: "§1 Postanowienia ogólne",
    content: [
      "Serwis internetowy działający pod adresem stylowamc.pl oferujący sprzedaż wirtualnych przedmiotów oraz usług. Prowadzony przez Radosława Czerwca prowadzącego działalność nierejestrowalną pod adresem Czciradz 31a/7 67-120 Kożuchów.",
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
    content: [
      "USŁUGOBIORCA / klient / gracz - osoba fizyczna lub prawna, która użytkuje serwer gier lub zakupiła usługę na stronie stylowamc.pl/shop.",
      "USŁUGA - udostępnienie użytkownikowi uprawnień na serwerze gry lub dostarczenie wirtualnych przedmiotów, które mogą być wykorzystywane tylko i wyłącznie na naszym serwerze dostępnym w grze: „Minecraft” pod adresem stylowamc.pl.",
      "SERWIS - Strona internetowa stylowamc.pl dostępna pod adresem https://stylowamc.pl/shop należąca do usługodawcy.",
    ],
  },
  {
    title: "§3 Warunki korzystania z usług",
    content: [
      "W celu korzystania ze strony stylowamc.pl użytkownik powinien posiadać aktualną przeglądarkę internetową Firefox, Chrome, Safari, Brave bądź Opera oraz system operacyjny: Windows, Android, OSX, iOS bądź Linux.",
      "W celu dostępu do serwera stylowamc.pl konieczne jest posiadanie zainstalowanej gry Minecraft oraz korzystanie ze stabilnego połączenia internetowego o prędkości co najmniej 1Mbps.",
    ],
  },
  {
    title: "§4 Kontakt",
    content: [
      "Kontakt do właściciela serwisu możliwy jest poprzez e-mail: stylowamc.wsparcie@gmail.com.",
    ],
  },
  {
    title: "§5 Płatności",
    content: [
      "Operatorem płatności sms, przelew, paysafecard obsługiwanych w ramach serwisu jest firma eplatnosci sp.z.o.o. REGON: 365908633; NIP: 5512627147; KRS: 0000648389.",
      "Reklamacje dotyczące płatności należy składać do sprzedawcy stylowamc.pl pod adresem e-mail: stylowamc.wsparcie@gmail.com.",
    ],
  },
  {
    title: "§6 Rodzaje sprzedawanych przedmiotów oraz usług",
    content: [
      "Oferujemy dodawanie wirtualnych przedmiotów/rang/doładowań/efektów na konto użytkownika (podany nick w formularzu przed dokonywaniem zakupu).",
      "Zakupione produkty są jedynie wirtualnymi dodatkami do gry, które nie przedstawiają poza grą wartości materialnej.",
    ],
  },
  {
    title: "§7 Zasady użytkowania",
    content: [
      "Użytkownik posiadając konto na serwerze stylowamc.pl akceptuje regulamin serwera podany na stronie internetowej oraz na serwerze.",
      "Zabronione jest oszukiwanie podczas wymiany, podszywanie się pod administrację, obrażanie graczy, spamowanie, używanie cheatów, reklama innych serwerów oraz wykorzystywanie błędów gry.",
    ],
  },
  {
    title: "§8 Polityka prywatności / RODO",
    content: [
      "Podstawa prawna: Niniejsza Polityka Prywatności jest zgodna z przepisami wynikającymi z RODO.",
      "Administrator Danych Osobowych: Administratorem danych osobowych jest usługodawca.",
      "Przetwarzanie danych osobowych odbywa się na podstawie art. 6 RODO i w celach informacyjnych Administrator Danych Osobowych powołuje się na prawnie uzasadniony interes, którym jest informowanie o zmianach w serwisie",
      "Dane osobowe będą przechowywane przez okres ważności konta w serwisie."
    ],
  },
  {
    title: "§9 Odstąpienie od umowy",
    content: [
      "Niniejszy punkt Regulaminu ma zastosowanie jedynie do Usługobiorców będących konsumentami i dotyczy umów zawieranych między nimi, a Usługodawcą.",
      "Prawo odstąpienia od umowy zawartej na odległość nie przysługuje konsumentowi w odniesieniu do umów:",
      "   a) o świadczenie usług, jeżeli Usługodawca wykonał w pełni usługę za wyraźną zgodą konsumenta, który został poinformowany przed rozpoczęciem świadczenia, że po spełnieniu świadczenia przez Usługodawcę utraci prawo odstąpienia od umowy.",
      "   b) w której przedmiotem świadczenia jest rzecz nieprefabrykowana, wyprodukowana według specyfikacji konsumenta lub służąca zaspokojeniu jego zindywidualizowanych potrzeb.",
      "   c) o dostarczanie treści cyfrowych, które nie są zapisane na nośniku materialnym, jeżeli spełnianie świadczenia rozpoczęło się za wyraźną zgodą konsumenta przed upływem terminu do odstąpienia od umowy i po poinformowaniu go przez Sprzedawcę o utracie prawa odstąpienia od umowy.",
      "Termin do odstąpienia od umowy o świadczenie usługi rozpoczyna się od dnia zawarcia umowy.",
      "Czas na odstąpienie od umowy wynosi 14 dni kalendarzowych od dnia zawarcia umowy.",
      "W celu chęci odstąpienia od umowy Usługobiorca powinien wysłać oświadczenie elektroniczne przed upływem terminu odstąpienia od umowy na adres email: stylowamc.wsparcie@gmail.com.",
      "Przykładowy wzór odstąpienia od umowy:",
      "   Data odstąpienia od umowy.",
      "   Imię nazwisko",
      "   Adres Usługobiorcy",
      "   Adres email",
      "   Nickname w serwisie",
      "   Usługa jakiej dotyczy odstąpienie",
      "   Podpis Usługobiorcy",
    ],
  },
  {
    title: "§10 Postanowienia końcowe",
    content: [
      "Umowy zawierane poprzez Sklep internetowy zawierane są w języku polskim.",
      "Sprzedawca zastrzega sobie prawo do dokonywania zmian Regulaminu z ważnych przyczyn, to jest: zmiany przepisów prawa, zmiany sposobów płatności i dostaw - w zakresie, w jakim te zmiany wpływają na realizację postanowień niniejszego Regulaminu.",
      "O każdej zmianie Sprzedawca poinformuje Klienta z co najmniej 7-dniowym wyprzedzeniem.",
      "W sprawach nieuregulowanych w niniejszym Regulaminie mają zastosowanie powszechnie obowiązujące przepisy prawa polskiego, w szczególności: Kodeksu cywilnego; ustawy o świadczeniu usług drogą elektroniczną; ustawy o prawach konsumenta, ustawy o ochronie danych osobowych.",
      "Klient ma prawo skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń w postaci wysłania maila na stylowamc.wsparcie@gmail.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-900 text-white p-6">
      {/* Nagłówek */}
      <h2 className="text-3xl font-bold mb-6">📜 Regulamin Serwera</h2>

      {/* Sekcje regulaminu */}
      <div className="max-w-4xl w-full bg-gray-800 p-6 rounded-lg shadow-md">
        {terms.map((section, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold text-yellow-400">{section.title}</h3>
            <ul className="mt-2 text-gray-300 text-sm space-y-1">
              {section.content.map((item, i) => (
                <li key={i} className="pl-4 list-disc">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
