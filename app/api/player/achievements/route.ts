import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get("uuid");
  const username = searchParams.get("username");

  if (!uuid && !username) {
    return NextResponse.json(
      { error: "Nie podano UUID ani nazwy użytkownika" },
      { status: 400 }
    );
  }

  try {
    let achievements;
    
    if (username) {
      achievements = await prisma.playerAchievements.findMany({
        where: { player_name: username },
        orderBy: { unlock_date: 'desc' },
        select: {
          id: true,
          uuid: true,
          player_name: true,
          achievement_id: true,
          achievement_name: true,
          achievement_description: true,
          material: true,
          unlock_date: true
        }
      });
    } else {
      if (!uuid) {
        return NextResponse.json(
          { error: "UUID nie może być null" },
          { status: 400 }
        );
      }

      achievements = await prisma.playerAchievements.findMany({
        where: { uuid: uuid as string },
        orderBy: { unlock_date: 'desc' },
        select: {
          id: true,
          uuid: true,
          player_name: true,
          achievement_id: true,
          achievement_name: true,
          achievement_description: true,
          material: true,
          unlock_date: true
        }
      });
    }
    console.log(achievements)

    return NextResponse.json({ achievements });
  } catch (error) {
    console.error("Błąd podczas pobierania osiągnięć:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas pobierania osiągnięć" },
      { status: 500 }
    );
  }
} 