# 🔌 API Endpoints

## 🔒 Autoryzacja
Wszystkie endpointy administracyjne wymagają autoryzacji poprzez cookie sesji.

```typescript
interface AuthResponse {
  success: boolean;
  message?: string;
}
```

## 📋 Endpointy

### 🎮 Gracze i Osiągnięcia

#### `GET /api/players/[username]/achievements`
Pobiera osiągnięcia konkretnego gracza.

**Parametry URL:**
- `username`: nazwa gracza

**Odpowiedź:**
```typescript
{
  achievements: Achievement[];
}
```

#### `POST /api/achievements`
Dodaje nowe osiągnięcie (wymaga autoryzacji).

**Body:**
```typescript
{
  player_name: string;
  achievement_id: string;
  achievement_name: string;
  achievement_description: string;
  material: string;
  progress?: number;
  maxProgress?: number;
}
```

### 📝 Changelog

#### `GET /api/changelog`
Pobiera listę wszystkich wpisów changelog.

**Odpowiedź:**
```typescript
{
  changelog: {
    [key: string]: {
      id: string;
      mode: string;
      version: string;
      date: string;
      changes: string[];
      author: string;
    }
  }
}
```

#### `POST /api/changelog`
Dodaje nowy wpis do changelogu (wymaga autoryzacji).

**Body:**
```typescript
{
  mode: string;
  version: string;
  changes: string[];
}
```

### 👤 Panel Administratora

#### `POST /api/admin/login`
Logowanie do panelu administratora.

**Body:**
```typescript
{
  password: string;
}
```

#### `GET /api/admin/session`
Sprawdza status sesji administratora.

**Odpowiedź:**
```typescript
{
  isAuthenticated: boolean;
}
```

#### `POST /api/admin/logout`
Wylogowanie z panelu administratora.

## 🔍 Kody Odpowiedzi
- `200` - Sukces
- `201` - Utworzono
- `400` - Błędne żądanie
- `401` - Brak autoryzacji
- `403` - Brak dostępu
- `404` - Nie znaleziono
- `500` - Błąd serwera

## 🧪 Przykłady Użycia

### Pobieranie osiągnięć gracza
```typescript
const response = await fetch('/api/players/MiszaTheOne/achievements');
const data = await response.json();
```

### Dodawanie wpisu do changelogu
```typescript
const response = await fetch('/api/changelog', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    mode: 'survival',
    version: '1.0.0',
    changes: ['Dodano nowy system osiągnięć']
  })
});
```

## 🔗 Powiązane
- [[System Osiągnięć]]
- [[Panel Administratora]]
- [[Changelog]]
- [[Technologie#Backend]] 