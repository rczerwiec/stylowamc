export interface CompetitionData {
  id: string;
  title: string;
  date: string;
  description: string;
  participants: number;
  mainImage: string;
  top3: {
    name: string;
    place: number;
    prize: string;
    image: string;
  }[];
  allEntries: {
    place: number;
    playerName: string;
    description: string;
    mainImage: string;
    gallery: string[];
    teamMembers: string[];
  }[];
}

export const competitions: Record<string, CompetitionData> = {
  'wyspy-marzec-2025': {
    id: 'wyspy-marzec-2025',
    title: 'TOP 5 Wysp - Edycja 1',
    date: 'Marzec 2025',
    description: 'Pierwszy konkurs budowlany na serwerze StylowaMC. Gracze mieli za zadanie stworzyć najpiękniejszą wyspę w trybie OneBlock. Ocenialiśmy nie tylko wygląd, ale także funkcjonalność i kreatywność w wykorzystaniu przestrzeni. Na tej podstawie wyłoniliśmy 5 najlepszych wysp.',
    participants: 9,
    mainImage: '/images/konkurs1/koxtar1.png',
    top3: [
      {
        name: 'Koxtar',
        place: 1,
        prize: '3 Stylowe Klucze',
        image: '/images/konkurs1/koxtar1.png'
      },
      {
        name: 'xFeneq',
        place: 2,
        prize: '2 Stylowe Klucze',
        image: '/images/konkurs1/xfeneq1.png'
      },
      {
        name: 'pieselord',
        place: 3,
        prize: '1 Stylowy Klucz',
        image: '/images/konkurs1/pieselord1.png'
      }
    ],
    allEntries: [
      {
        place: 5,
        playerName: 'gengarus_',
        description: 'Mała, ale niezwykle urocza wioska! Na wyspie znajdziemy piękny kościół oraz dwa wyjątkowe domy, z których jeden pełni funkcję centrum mechanizmów Slimefun. Szczególną atrakcją jest mini zoo, które dodaje charakteru całej konstrukcji. Jednak prawdziwa niespodzianka kryje się pod spodem wyspy - gigantyczna farma kaktusów! To pokazuje, że nawet niewielka przestrzeń może być wykorzystana w niezwykle kreatywny sposób.',
        mainImage: '/images/konkurs1/gengarus1.png',
        gallery: [
          '/images/konkurs1/gengarus2.png',
          '/images/konkurs1/gengarus3.png',
          '/images/konkurs1/gengarus4.png',
        ],
        teamMembers: ['kubix3901_',"tymbel5","SebekOG"]
      },
      {
        place: 4,
        playerName: 'nika24533',
        description: 'Witajcie w Żabim Królestwie! Ta wyjątkowa wyspa to miejsce, gdzie żaby są głównym motywem przewodnim. Konstrukcja składa się z kilku mniejszych wysepek połączonych malowniczymi mostami. Na każdej z nich znajdziemy coś wyjątkowego: uroczą mini osadę, majestatyczny kościół, a przede wszystkim - ogromny zamek będący domem dla graczy. Całość przypomina scenerię wyjętą prosto z bajki, gdzie każdy element opowiada swoją własną historię.',
        mainImage: '/images/konkurs1/nika1.png',
        gallery: [
          '/images/konkurs1/nika2.png',
          '/images/konkurs1/nika3.png',
          '/images/konkurs1/nika4.png',
        ],
        teamMembers: ['Arabisko', 'lastsproutISGod', 'Zuzia1043']
      },
      {
        place: 3,
        playerName: 'pieselord',
        description: 'Witajcie w Żabim Królestwie! Ta wyjątkowa wyspa to miejsce, gdzie żaby są głównym motywem przewodnim. Konstrukcja składa się z kilku mniejszych wysepek połączonych malowniczymi mostami. Na każdej z nich znajdziemy coś wyjątkowego: uroczą mini osadę, majestatyczny kościół, a przede wszystkim - ogromny zamek będący domem dla graczy. Całość przypomina scenerię wyjętą prosto z bajki, gdzie każdy element opowiada swoją własną historię.',
        mainImage: '/images/konkurs1/pieselord1.png',
        gallery: [
          '/images/konkurs1/pieselord2.png',
          '/images/konkurs1/pieselord3.png',
          '/images/konkurs1/pieselord4.png',
        ],
        teamMembers: ['Deereto', 'BlobsterBlob1']
      },
      {
        place: 2,
        playerName: 'xFeneq',
        description: 'Na pierwszy rzut oka ta wyspa może wydawać się niepozorna, ale to właśnie w jej podziemiach kryje się prawdziwa magia! Gdy zejdziemy pod powierzchnię, wkraczamy do fascynującego świata zaawansowanej technologii. Znajdziemy tu imponujący zestaw mechanizmów, wydajną zarabiarkę, zaawansowany mob grinder oraz wiele innych technicznych cudów, których działanie pozostaje tajemnicą dla przeciętnego gracza. To miejsce, które zachęca do eksploracji i odkrywania kolejnych sekretów ukrytych w jego wnętrzu.',
        mainImage: '/images/konkurs1/xfeneq1.png',
        gallery: [
          '/images/konkurs1/xfeneq2.png',
          '/images/konkurs1/xfeneq3.png',
          '/images/konkurs1/xfeneq4.png',
        ],
        teamMembers: ['Deereto', 'Drakx_', "PolskiPapiesz", "PoProstuISGod","pro5432154321","MiszaTheOne"]
      },
      {
        place: 1,
        playerName: 'Koxtar',
        description: 'Zwycięska wyspa, stworzona przez duet Koxtar i Franix, to prawdziwe arcydzieło sztuki budowlanej! Mimo że nie jest największa, każdy pojedynczy blok został tu umieszczony z niezwykłą precyzją i przemyśleniem. Teren został tak mistrzowsko odwzorowany, że sprawia wrażenie, jakby został wycięty z zupełnie innego świata i przeniesiony na OneBlocka. Prawdziwą niespodzianką jest ukryte pod wyspą kasyno - miejsce, gdzie możesz spróbować swojego szczęścia i może... przepuścić cały swój ciężko zarobiony hajs! To połączenie estetyki z rozrywką sprawia, że wyspa zasłużenie zajmuje pierwsze miejsce.',
        mainImage: '/images/konkurs1/koxtar1.png',
        gallery: [
          '/images/konkurs1/koxtar1.png',
          '/images/konkurs1/koxtar2.png',
          '/images/konkurs1/koxtar3.png',
          '/images/konkurs1/koxtar4.png',
        ],
        teamMembers: ['franix_']
      }
    ]
  }
}; 