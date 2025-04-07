import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { promises as fs } from 'fs';
import path from 'path';
import { NewsData } from "../data";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const getCategoryStyle = (category: string) => {
  switch (category) {
    case "ogłoszenie":
      return "bg-purple-500";
    case "konkurs":
      return "bg-yellow-500";
    case "aktualizacja":
      return "bg-green-500";
    case "event":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

async function getNewsById(id: string): Promise<NewsData | null> {
  try {
    const jsonDirectory = path.join(process.cwd(), 'app/data');
    const fileContents = await fs.readFile(jsonDirectory + '/news.json', 'utf8');
    const data = JSON.parse(fileContents);
    return data.news[id] || null;
  } catch (error) {
    console.error('Error reading news:', error);
    return null;
  }
}

export default async function NewsPage({ params }: PageProps) {
  const { slug } = await params;
  const news = await getNewsById(slug);

  if (!news) {
    notFound();
  }

  const formattedDate = format(new Date(news.date), "d MMMM yyyy", { locale: pl });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-[#1A1A1A] rounded-xl shadow-lg overflow-hidden border border-gray-700">
        {news.image && (
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Nagłówek */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span
              className={`${getCategoryStyle(
                news.category
              )} text-gray-900 px-3 py-1 rounded-full text-sm font-semibold`}
            >
              {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
            </span>
            <span className="text-gray-400">{formattedDate}</span>
            {news.important && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Ważne
              </span>
            )}
          </div>

          {/* Tytuł */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {news.title}
          </h1>

          {/* Treść */}
          <div className="prose prose-invert max-w-none">
            {news.fullDescription.split("\n").map((paragraph, index) => (
              <p key={index} className="text-gray-300 mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Galeria */}
          {news.gallery && news.gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-white mb-4">Galeria</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {news.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-video">
                    <Image
                      src={image}
                      alt={`Zdjęcie ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Linki */}
          {news.links && news.links.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-white mb-4">
                Przydatne linki
              </h2>
              <div className="flex flex-wrap gap-4">
                {news.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Autor i data */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="flex items-center justify-between text-gray-400">
              <span>Autor: {news.author}</span>
              <Link
                href="/"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                ← Wróć do strony głównej
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 