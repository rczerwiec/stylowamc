# 🏆 System Osiągnięć

## 📝 Opis
System osiągnięć pozwala śledzić postępy graczy w różnych aspektach gry. Każde osiągnięcie ma swój unikalny identyfikator, warunki odblokowania oraz nagrody.

## 💾 Struktura Danych
```typescript
interface Achievement {
  id: string;
  player_name: string;
  achievement_id: string;
  achievement_name: string;
  achievement_description: string;
  material: string;
  unlock_date: string | null;
  isUnlocked: boolean;
  progress?: number;
  maxProgress?: number;
}
```

## 🔄 Endpointy API
- `GET /api/players/[username]/achievements` - Pobieranie osiągnięć gracza
- `POST /api/achievements` - Dodawanie nowego osiągnięcia (Admin)
- `PUT /api/achievements/[id]` - Aktualizacja osiągnięcia (Admin)
- `DELETE /api/achievements/[id]` - Usuwanie osiągnięcia (Admin)

## 🎯 Typy Osiągnięć
1. **Jednorazowe**
   - Odblokowane po spełnieniu warunku
   - Nie mają postępu
   - Przykład: "Pierwsze drewno"

2. **Progresywne**
   - Wymagają osiągnięcia określonego postępu
   - Mają licznik postępu
   - Przykład: "Wykop 100 bloków kamienia"

## 🖼️ Materiały
Każde osiągnięcie ma przypisany materiał z Minecraft, który jest używany jako ikona:
- `oak_log` - Drewno dębowe
- `cobblestone` - Bruk
- `iron_ore` - Ruda żelaza
- itd.

## 🔗 Powiązane
- [[API Endpoints]]
- [[Panel Administratora]]
- [[Komponenty#AchievementCard]] 