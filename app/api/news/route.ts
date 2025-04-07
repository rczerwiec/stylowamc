import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), 'app/data');
    const fileContents = await fs.readFile(jsonDirectory + '/news.json', 'utf8');
    const data = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading news:', error);
    return NextResponse.json(
      { error: 'Nie udało się pobrać newsów' },
      { status: 500 }
    );
  }
} 