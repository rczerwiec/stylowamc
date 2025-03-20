import { NextResponse } from 'next/server';

async function getServerStats() {
  try {
    const response = await fetch('https://api.mcstatus.io/v2/status/java/stylowamc.pl');
    const data = await response.json();
    
    return {
      playersOnline: data.players?.online || 0,
      maxPlayers: data.players?.max || 0,
    };
  } catch (error) {
    console.error('Błąd pobierania statystyk serwera:', error);
    return {
      playersOnline: 0,
      maxPlayers: 0,
    };
  }
}

export async function GET() {
  const stats = await getServerStats();
  
  return NextResponse.json(stats);
} 