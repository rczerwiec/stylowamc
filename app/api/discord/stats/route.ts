import { NextResponse } from 'next/server';

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID;

async function getDiscordStats() {
  try {
    const response = await fetch(`https://discord.com/api/v10/guilds/${DISCORD_SERVER_ID}`, {
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
      },
    });
    
    const data = await response.json();
    
    return {
      membersCount: data.approximate_member_count || 0,
    };
  } catch (error) {
    console.error('Błąd pobierania statystyk Discorda:', error);
    return {
      membersCount: 0,
    };
  }
}

export async function GET() {
  const stats = await getDiscordStats();
  
  return NextResponse.json(stats);
} 