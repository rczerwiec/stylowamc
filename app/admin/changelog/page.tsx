"use client";

import { useState, useEffect } from "react";
import { ChangelogEntry, ChangeType } from "@/app/news/changelog";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Funkcja do parsowania daty z formatu DD.MM.YYYY
const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
};

// Funkcja do grupowania wpisów według trybu
const groupByMode = (entries: ChangelogEntry[]) => {
  const groups: { [key: string]: ChangelogEntry[] } = {};
  
  entries.forEach(entry => {
    const mode = entry.mode || "Strona";
    if (!groups[mode]) {
      groups[mode] = [];
    }
    groups[mode].push(entry);
  });
  
  return groups;
};

export default function ChangelogManagement() {
  const [changelog, setChangelog] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedMode, setSelectedMode] = useState<string>("wszystkie");
  const router = useRouter();

  useEffect(() => {
    fetchChangelog();
  }, []);

  const fetchChangelog = async () => {
    try {
      const response = await fetch('/api/changelog');
      const data = await response.json();
      if (data.changelog) {
        const changelogArray = Object.values(data.changelog) as ChangelogEntry[];
        // Sortowanie według daty (od najnowszych)
        setChangelog(
          changelogArray.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
        );
      }
    } catch (error) {
      console.error('Błąd podczas pobierania changelogu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć ten wpis?')) {
      return;
    }

    try {
      const response = await fetch('/api/changelog', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        await fetchChangelog();
      } else {
        const data = await response.json();
        alert(data.error || 'Wystąpił błąd podczas usuwania wpisu');
      }
    } catch (error) {
      console.error('Błąd podczas usuwania wpisu:', error);
      alert('Wystąpił błąd podczas usuwania wpisu');
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/changelog/edit/${id}`);
  };

  const handleCreate = () => {
    router.push('/admin/changelog/create');
  };

  const getChangeTypeLabel = (type: ChangeType) => {
    switch (type) {
      case "add":
        return "Dodano";
      case "remove":
        return "Usunięto";
      case "fix":
        return "Naprawiono";
      case "change":
        return "Zmieniono";
    }
  };

  // Filtrowanie wpisów według wybranego trybu
  const filteredChangelog = selectedMode === "wszystkie" 
    ? changelog 
    : changelog.filter(entry => entry.mode === selectedMode);

  // Obliczanie liczby stron
  const totalPages = Math.ceil(filteredChangelog.length / itemsPerPage);
  
  // Pobieranie wpisów dla aktualnej strony
  const currentEntries = filteredChangelog.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pobieranie unikalnych trybów
  const modes = ["wszystkie", ...new Set(changelog.map(entry => entry.mode || "Strona"))];

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-[200px]">
          <div className="text-gray-400">Ładowanie changelogu...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Zarządzanie Changelogiem</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/dashboard"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FaArrowLeft /> Powrót
          </Link>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaPlus />
            Dodaj nowy wpis
          </button>
        </div>
      </div>

      {/* Filtr trybów */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Filtruj według trybu:
        </label>
        <div className="flex flex-wrap gap-2">
          {modes.map(mode => (
            <button
              key={mode}
              onClick={() => {
                setSelectedMode(mode);
                setCurrentPage(1); // Reset do pierwszej strony przy zmianie filtra
              }}
              className={`px-3 py-1 rounded-lg transition-colors ${
                selectedMode === mode
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {mode === "wszystkie" ? "Wszystkie tryby" : mode}
            </button>
          ))}
        </div>
      </div>

      {/* Lista wpisów */}
      <div className="space-y-4 mb-6">
        {currentEntries.map((entry) => (
          <div
            key={entry.id}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-400">
                  {format(parseDate(entry.date), "d MMMM yyyy", { locale: pl })}
                </span>
                {entry.version && (
                  <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm">
                    v{entry.version}
                  </span>
                )}
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
                  {entry.mode || "Strona"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(entry.id)}
                  className="p-2 text-yellow-500 hover:bg-yellow-500/20 rounded transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="p-2 text-red-500 hover:bg-red-500/20 rounded transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {entry.changes.map((change, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <span className="font-semibold">
                    {getChangeTypeLabel(change.type)}:
                  </span>
                  <span>{change.description}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {currentEntries.length === 0 && (
          <div className="text-center py-8 bg-gray-800 rounded-lg border border-gray-700">
            <p className="text-gray-400">Brak wpisów do wyświetlenia</p>
          </div>
        )}
      </div>

      {/* Paginacja */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <FaChevronLeft />
          </button>
          
          <span className="text-gray-300">
            Strona {currentPage} z {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
} 