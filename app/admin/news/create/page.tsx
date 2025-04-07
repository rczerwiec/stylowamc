'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { NewsData } from '@/app/news/data';

export default function CreateNews() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<NewsData>({
    id: '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'ogłoszenie',
    shortDescription: '',
    fullDescription: '',
    image: '/images/news/default.jpg',
    gallery: [],
    important: false,
    author: '',
    links: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create news');
      }

      router.push('/admin/news');
    } catch (error) {
      console.error('Error creating news:', error);
      setError('Wystąpił błąd podczas tworzenia newsa');
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push('/admin/news')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
                >
                  <FaArrowLeft />
                  Powrót
                </button>
                <h1 className="text-3xl font-bold text-gray-100">Nowy News</h1>
              </div>
            </div>

            {error && (
              <div className="mb-4 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded relative">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                    Tytuł
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300">
                    Data
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                    Kategoria
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="ogłoszenie">Ogłoszenie</option>
                    <option value="konkurs">Konkurs</option>
                    <option value="event">Event</option>
                    <option value="aktualizacja">Aktualizacja</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-300">
                    Krótki opis
                  </label>
                  <textarea
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-300">
                    Pełny opis
                  </label>
                  <textarea
                    id="fullDescription"
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-300">
                    Autor
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="important"
                    name="important"
                    checked={formData.important}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="important" className="ml-2 block text-sm text-gray-300">
                    Ważny news
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSave />
                  {saving ? 'Zapisywanie...' : 'Zapisz'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 