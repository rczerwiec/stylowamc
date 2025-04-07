"use client";

import { useState } from "react";
import { ChangeType } from "@/app/news/changelog";
import { useRouter } from "next/navigation";
import { FaPlus, FaTrash, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

// Funkcja do formatowania daty z YYYY-MM-DD na DD.MM.YYYY
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

interface Change {
  type: ChangeType;
  description: string;
}

export default function CreateChangelog() {
  const router = useRouter();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [version, setVersion] = useState("");
  const [mode, setMode] = useState("Strona");
  const [changes, setChanges] = useState<Change[]>([
    { type: "add", description: "" }
  ]);
  const [submitting, setSubmitting] = useState(false);

  const handleAddChange = () => {
    setChanges([...changes, { type: "add", description: "" }]);
  };

  const handleRemoveChange = (index: number) => {
    setChanges(changes.filter((_, i) => i !== index));
  };

  const handleChangeType = (index: number, type: ChangeType) => {
    const newChanges = [...changes];
    newChanges[index].type = type;
    setChanges(newChanges);
  };

  const handleChangeDescription = (index: number, description: string) => {
    const newChanges = [...changes];
    newChanges[index].description = description;
    setChanges(newChanges);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    // Walidacja
    if (!date) {
      alert('Proszę wybrać datę');
      return;
    }

    if (!mode) {
      alert('Proszę wybrać tryb');
      return;
    }

    if (changes.some(change => !change.description.trim())) {
      alert('Wszystkie zmiany muszą mieć opis');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/changelog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: formatDate(date),
          version: version || undefined,
          mode,
          changes,
          author: 'Admin' // TODO: Dodać prawdziwego autora
        }),
      });

      if (response.ok) {
        router.push('/admin/changelog');
      } else {
        const data = await response.json();
        alert(data.error || 'Wystąpił błąd podczas dodawania wpisu');
      }
    } catch (error) {
      console.error('Błąd podczas dodawania wpisu:', error);
      alert('Wystąpił błąd podczas dodawania wpisu');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dodaj nowy wpis changelogu</h1>
        <Link
          href="/admin/dashboard"
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaArrowLeft /> Powrót
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Data
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Wersja (opcjonalnie)
            </label>
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="np. 1.2.0"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Tryb
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            required
          >
            <option value="Strona">Strona</option>
            <option value="Lobby">Lobby</option>
            <option value="OneBlock">OneBlock</option>
            <option value="SkyGrid">SkyGrid</option>
            <option value="Survival">Survival</option>
            <option value="Muzeum">Muzeum</option>
            <option value="Ogólny">Ogólny</option>
          </select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-400">
              Lista zmian
            </label>
            <button
              type="button"
              onClick={handleAddChange}
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <FaPlus />
              Dodaj zmianę
            </button>
          </div>

          {changes.map((change, index) => (
            <div key={index} className="flex gap-4">
              <select
                value={change.type}
                onChange={(e) => handleChangeType(index, e.target.value as ChangeType)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              >
                <option value="add">Dodano</option>
                <option value="remove">Usunięto</option>
                <option value="fix">Naprawiono</option>
                <option value="change">Zmieniono</option>
              </select>
              <input
                type="text"
                value={change.description}
                onChange={(e) => handleChangeDescription(index, e.target.value)}
                placeholder="Opis zmiany"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                required
              />
              {changes.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveChange(index)}
                  className="p-2 text-red-500 hover:bg-red-500/20 rounded transition-colors"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Dodawanie..." : "Dodaj wpis"}
          </button>
        </div>
      </form>
    </div>
  );
} 