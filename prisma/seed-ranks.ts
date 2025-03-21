import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Interfejs dla danych rangi gracza
interface PlayerRankData {
  rank: string;
  fromDate: Date;
  toDate?: Date;
  isActive: boolean;
}

async function checkIfTableExists() {
  // Sprawdzamy czy tabela PlayerRanks istnieje
  try {
    // Spróbujmy pobrać jeden rekord, jeśli tabela nie istnieje, wywołamy błąd
    await (prisma as any).playerRanks.findFirst();
    return true;
  } catch (error) {
    return false;
  }
}

async function generateMigrationIfNeeded() {
  const schemaPath = path.join(process.cwd(), 'prisma/schema.prisma');
  const migrationPath = path.join(process.cwd(), 'prisma/migrations/20250401000000_add_player_ranks/migration.sql');
  
  // Sprawdź czy migracja już istnieje
  const migrationExists = fs.existsSync(migrationPath);
  
  if (!migrationExists) {
    console.log('Migracja dla tabeli PlayerRanks nie istnieje. Generowanie...');
    
    // Utwórz katalog migracji, jeśli nie istnieje
    const migrationDir = path.dirname(migrationPath);
    if (!fs.existsSync(migrationDir)) {
      fs.mkdirSync(migrationDir, { recursive: true });
    }
    
    // Zapisz plik migracji
    const migrationSQL = `-- CreateTable
CREATE TABLE \`PlayerRanks\` (
    \`id\` INTEGER NOT NULL AUTO_INCREMENT,
    \`uuid\` VARCHAR(191) NOT NULL,
    \`player_name\` VARCHAR(191) NOT NULL,
    \`rank\` VARCHAR(191) NOT NULL,
    \`from_date\` DATETIME(3) NOT NULL,
    \`to_date\` DATETIME(3) NULL,
    \`is_active\` BOOLEAN NOT NULL DEFAULT false,
    \`color\` VARCHAR(50) NULL,
    \`bg_color\` VARCHAR(50) NULL,

    INDEX \`PlayerRanks_uuid_idx\`(\`uuid\`),
    PRIMARY KEY (\`id\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`;
    
    fs.writeFileSync(migrationPath, migrationSQL);
    console.log('Wygenerowano plik migracji.');
    
    console.log('Upewnij się, że wykonasz migrację przed seedowaniem danych:');
    console.log('npm run prisma:migrate');
    
    return false;
  }
  
  return true;
}

async function main() {
  try {
    // Sprawdź czy tabela istnieje
    const tableExists = await checkIfTableExists();
    
    if (!tableExists) {
      console.log('Tabela PlayerRanks nie istnieje w bazie danych.');
      const migrationReady = await generateMigrationIfNeeded();
      
      if (!migrationReady) {
        console.log('Seedowanie anulowane. Najpierw wykonaj migrację.');
        return;
      }
    }
    
    // Pobieramy kilku przykładowych graczy z bazy danych
    const players = await prisma.playerStats.findMany({
      take: 10,
      select: {
        uuid: true,
        name: true,
      },
    });

    if (players.length === 0) {
      console.log('Nie znaleziono graczy w bazie danych. Seedowanie anulowane.');
      return;
    }

    console.log(`Znaleziono ${players.length} graczy. Rozpoczynam seedowanie rang...`);

    // Usuwamy istniejące rangi dla tych graczy
    for (const player of players) {
      try {
        await (prisma as any).playerRanks.deleteMany({
          where: {
            uuid: player.uuid,
          },
        });
      } catch (error) {
        console.error(`Błąd podczas usuwania rang dla gracza ${player.name || player.uuid}:`, error);
      }
    }

    // Rangi dostępne na serwerze
    const ranks = [
      { name: 'Gracz', color: 'text-gray-300', bgColor: 'bg-gray-300' },
      { name: 'VIP', color: 'text-pink-400', bgColor: 'bg-pink-400' },
      { name: 'VIP+', color: 'text-pink-600', bgColor: 'bg-pink-600' },
      { name: 'SVIP', color: 'text-purple-400', bgColor: 'bg-purple-400' },
      { name: 'Pomocnik', color: 'text-blue-300', bgColor: 'bg-blue-300' },
      { name: 'Budowniczy', color: 'text-yellow-600', bgColor: 'bg-yellow-600' },
      { name: 'ChatMod', color: 'text-green-400', bgColor: 'bg-green-400' },
      { name: 'Moderator', color: 'text-blue-400', bgColor: 'bg-blue-400' },
      { name: 'Admin', color: 'text-red-400', bgColor: 'bg-red-400' },
      { name: 'HeadAdmin', color: 'text-red-600', bgColor: 'bg-red-600' },
      { name: 'Owner', color: 'text-red-700', bgColor: 'bg-red-700' },
    ];

    // Dla każdego gracza tworzymy historię rang
    let createdRanks = 0;
    for (const player of players) {
      try {
        // Losowa liczba rang dla gracza (od 1 do 4)
        const ranksCount = Math.floor(Math.random() * 4) + 1;
        
        // Data dołączenia (losowo między 6 miesięcy a 2 lata temu)
        const joinDate = new Date();
        joinDate.setMonth(joinDate.getMonth() - (Math.floor(Math.random() * 18) + 6));

        // Losowo wybieramy rangi
        const playerRanks: PlayerRankData[] = [];
        let currentDate = new Date(joinDate);
        
        // Każdy gracz zaczyna od rangi "Gracz"
        playerRanks.push({
          rank: 'Gracz',
          fromDate: new Date(currentDate),
          isActive: ranksCount === 1, // Aktywne tylko jeśli to jedyna ranga
        });

        // Dodajemy kolejne rangi
        if (ranksCount > 1) {
          // Losowo wybieramy rangi (bez powtórzeń)
          const availableRanks = [...ranks.filter(r => r.name !== 'Gracz')];
          const selectedRanks = [];
          
          for (let i = 0; i < ranksCount - 1; i++) {
            if (availableRanks.length === 0) break;
            
            const randomIndex = Math.floor(Math.random() * availableRanks.length);
            selectedRanks.push(availableRanks[randomIndex]);
            availableRanks.splice(randomIndex, 1);
          }

          // Sortujemy wybrane rangi według "prestiżu" (indeksu w tablicy ranks)
          selectedRanks.sort((a, b) => {
            return ranks.findIndex(r => r.name === a.name) - ranks.findIndex(r => r.name === b.name);
          });

          // Dodajemy rangi z datami
          for (let i = 0; i < selectedRanks.length; i++) {
            currentDate = new Date(currentDate);
            currentDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 90) + 30); // 1-4 miesiące później
            
            if (currentDate > new Date()) {
              currentDate = new Date(); // Nie wybiegamy w przyszłość
            }

            playerRanks.push({
              rank: selectedRanks[i].name,
              fromDate: new Date(currentDate),
              isActive: i === selectedRanks.length - 1, // Aktywna tylko ostatnia ranga
            });
          }
        }

        // Ustawiamy daty końcowe na podstawie następnych rang
        for (let i = 0; i < playerRanks.length - 1; i++) {
          playerRanks[i].toDate = playerRanks[i + 1].fromDate;
        }

        // Dodajemy rangi do bazy danych
        for (const rankData of playerRanks) {
          const rankInfo = ranks.find(r => r.name === rankData.rank);
          
          try {
            await (prisma as any).playerRanks.create({
              data: {
                uuid: player.uuid,
                player_name: player.name || '',
                rank: rankData.rank,
                from_date: rankData.fromDate,
                to_date: rankData.toDate,
                is_active: rankData.isActive,
                color: rankInfo?.color,
                bg_color: rankInfo?.bgColor,
              }
            });
            
            createdRanks++;
          } catch (error) {
            console.error(`Błąd podczas dodawania rangi ${rankData.rank} dla gracza ${player.name || player.uuid}:`, error);
          }
        }

        console.log(`Dodano ${playerRanks.length} rang dla gracza ${player.name || player.uuid}`);
      } catch (playerError) {
        console.error(`Błąd podczas przetwarzania gracza ${player.name || player.uuid}:`, playerError);
      }
    }

    console.log(`Seedowanie zakończone! Dodano łącznie ${createdRanks} rang dla ${players.length} graczy.`);
  } catch (error) {
    console.error('Błąd podczas seedowania rang:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  }); 