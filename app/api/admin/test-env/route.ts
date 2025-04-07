import { NextResponse } from 'next/server';

export async function GET() {
  // Sprawdź, czy zmienne środowiskowe są dostępne
  const adminLogin = process.env.ADMINPANEL_LOGIN;
  const adminPassword = process.env.ADMINPANEL_PASSWORD ? '***' : 'brak';
  const jwtSecret = process.env.JWT_SECRET ? '***' : 'brak';

  return NextResponse.json({
    adminLogin,
    adminPassword,
    jwtSecret,
    nodeEnv: process.env.NODE_ENV,
    allEnvVars: Object.keys(process.env).filter(key => 
      key.includes('ADMIN') || key.includes('JWT')
    )
  });
} 