import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), 'app/data');
    const fileContents = await fs.readFile(jsonDirectory + '/changelog.json', 'utf8');
    const data = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading changelog:', error);
    return NextResponse.json(
      { error: 'Nie udało się pobrać changelogu' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, version, mode, changes, author } = body;

    if (!date || !mode || !changes || !Array.isArray(changes) || changes.length === 0) {
      return NextResponse.json(
        { error: "Brakuje wymaganych pól" },
        { status: 400 }
      );
    }

    const jsonDirectory = path.join(process.cwd(), 'app/data');
    const fileContents = await fs.readFile(jsonDirectory + '/changelog.json', 'utf8');
    const data = JSON.parse(fileContents);

    // Generuj unikalny ID na podstawie trybu i wersji
    const id = `${mode.toLowerCase()}-${version || '1.0.0'}`;

    // Sprawdź, czy wpis o takim ID już istnieje
    if (data.changelog[id]) {
      return NextResponse.json(
        { error: "Wpis o tej wersji już istnieje" },
        { status: 400 }
      );
    }

    // Dodaj nowy wpis
    const newEntry = {
      id,
      mode,
      version: version || undefined,
      date,
      changes,
      author: author || "Admin"
    };

    data.changelog[id] = newEntry;

    // Zapisz zmiany do pliku
    await fs.writeFile(
      jsonDirectory + '/changelog.json',
      JSON.stringify(data, null, 2),
      'utf8'
    );

    return NextResponse.json({ success: true, entry: newEntry });
  } catch (error) {
    console.error("Błąd podczas dodawania wpisu:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas dodawania wpisu" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, date, version, mode, changes, author } = body;

    if (!id || !date || !mode || !changes || !Array.isArray(changes) || changes.length === 0) {
      return NextResponse.json(
        { error: "Brakuje wymaganych pól" },
        { status: 400 }
      );
    }

    const jsonDirectory = path.join(process.cwd(), 'app/data');
    const fileContents = await fs.readFile(jsonDirectory + '/changelog.json', 'utf8');
    const data = JSON.parse(fileContents);

    // Sprawdź, czy wpis istnieje
    if (!data.changelog[id]) {
      return NextResponse.json(
        { error: "Nie znaleziono wpisu o podanym ID" },
        { status: 404 }
      );
    }

    // Aktualizuj wpis
    const updatedEntry = {
      ...data.changelog[id],
      date,
      version: version || undefined,
      mode,
      changes,
      author: author || "Admin"
    };

    data.changelog[id] = updatedEntry;

    // Zapisz zmiany do pliku
    await fs.writeFile(
      jsonDirectory + '/changelog.json',
      JSON.stringify(data, null, 2),
      'utf8'
    );

    return NextResponse.json({ success: true, entry: updatedEntry });
  } catch (error) {
    console.error("Błąd podczas aktualizacji wpisu:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas aktualizacji wpisu" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const jsonDirectory = path.join(process.cwd(), 'app/data');
    const fileContents = await fs.readFile(jsonDirectory + '/changelog.json', 'utf8');
    const data = JSON.parse(fileContents);

    if (!data.changelog[id]) {
      return NextResponse.json(
        { error: 'Nie znaleziono wpisu o podanym ID' },
        { status: 404 }
      );
    }

    // Usuń wpis
    delete data.changelog[id];

    // Zapisz zaktualizowane dane
    await fs.writeFile(
      jsonDirectory + '/changelog.json',
      JSON.stringify(data, null, 2),
      'utf8'
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting changelog entry:', error);
    return NextResponse.json(
      { error: 'Nie udało się usunąć wpisu z changelogu' },
      { status: 500 }
    );
  }
} 