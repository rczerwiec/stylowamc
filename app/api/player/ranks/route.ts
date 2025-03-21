import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PlayerRanks } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const uuid = searchParams.get('uuid');
    const username = searchParams.get('username');

    if (!uuid && !username) {
      return NextResponse.json(
        { error: "Nie podano UUID ani nazwy użytkownika" },
        { status: 400 }
      );
    }

    try {
      let playerUuid = uuid;

      if (!uuid && username) {
        // Jeśli podano nazwę użytkownika, najpierw znajdź gracza po nazwie
        const player = await prisma.playerStats.findFirst({
          where: { name: username },
          select: { uuid: true }
        });

        if (!player) {
          return NextResponse.json(
            { error: "Nie znaleziono gracza o podanej nazwie" },
            { status: 404 }
          );
        }

        playerUuid = player.uuid;
      }

      // Pobieramy rangi gracza
      const playerRanks = await prisma.PlayerRanks.findMany({
        where: {
          OR: [
            { uuid1: playerUuid },
            { uuid2: playerUuid }
          ]
        },
        orderBy: {
          from_when: 'desc'
        }
      });

      if (!playerRanks || playerRanks.length === 0) {
        return NextResponse.json({ ranks: [] });
      }

      // Zdefiniujmy domyślne kolory dla rang
      const defaultColors: { [key: string]: { color: string; bgColor: string } } = {
        'Admin': { color: 'text-red-400', bgColor: 'bg-red-400' },
        'HeadAdmin': { color: 'text-red-600', bgColor: 'bg-red-600' },
        'Wlasciciel': { color: 'text-red-700', bgColor: 'bg-red-700' },
        'Moderator': { color: 'text-green-500', bgColor: 'bg-green-500' },
        'J.Moderator': { color: 'text-green-400', bgColor: 'bg-green-400' },
        'Helper': { color: 'text-blue-500', bgColor: 'bg-blue-500' },
        'J.Helper': { color: 'text-blue-300', bgColor: 'bg-blue-300' },
        'ChatMod': { color: 'text-green-400', bgColor: 'bg-green-400' },
        'UVIP': { color: 'text-purple-400', bgColor: 'bg-purple-400' },
        'MVIP': { color: 'text-blue-400', bgColor: 'bg-blue-400' },
        'SVIP': { color: 'text-orange-400', bgColor: 'bg-orange-400' },
        'VIP': { color: 'text-yellow-600', bgColor: 'bg-yellow-600' },
        'Gracz': { color: 'text-gray-300', bgColor: 'bg-gray-300' }
      };

      // Formatujemy dane rang
      const formattedRanks = playerRanks.map((rank: PlayerRanks) => ({
        id: rank.id,
        uuid: rank.uuid1 || rank.uuid2 || '',
        player_name: rank.nickname,
        rank: rank.rank,
        color: defaultColors[rank.rank]?.color || 'text-gray-300',
        bg_color: defaultColors[rank.rank]?.bgColor || 'bg-gray-300',
        is_active: rank.to_when === null,
        from_date_formatted: rank.from_when.toLocaleDateString('pl-PL'),
        to_date_formatted: rank.to_when ? rank.to_when.toLocaleDateString('pl-PL') : 'obecnie',
        description: rank.description || ''
      }));

      return NextResponse.json({ ranks: formattedRanks });
    } catch (dbError) {
      console.error("Błąd podczas pobierania rang:", dbError);
      return NextResponse.json(
        { error: "Wystąpił błąd podczas pobierania rang" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Nieobsłużony błąd:", error);
    return NextResponse.json(
      { error: "Wystąpił nieoczekiwany błąd" },
      { status: 500 }
    );
  }
} 