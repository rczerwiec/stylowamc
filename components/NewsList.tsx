"use client";

import { useState } from "react";
import { NewsData, getLatestNews, getNewsByCategory } from "@/app/news/data";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const getCategoryStyle = (category: string) => {
  switch (category) {
    case "konkurs":
      return {
        bg: "bg-yellow-500/10",
        text: "text-yellow-500",
        border: "border-yellow-500/30",
        hover: "hover:bg-yellow-500/20"
      };
    case "aktualizacja":
      return {
        bg: "bg-green-500/10",
        text: "text-green-500",
        border: "border-green-500/30",
        hover: "hover:bg-green-500/20"
      };
    case "event":
      return {
        bg: "bg-blue-500/10",
        text: "text-blue-500",
        border: "border-blue-500/30",
        hover: "hover:bg-blue-500/20"
      };
    case "ogłoszenie":
      return {
        bg: "bg-purple-500/10",
        text: "text-purple-500",
        border: "border-purple-500/30",
        hover: "hover:bg-purple-500/20"
      };
    default:
      return {
        bg: "bg-gray-500/10",
        text: "text-gray-500",
        border: "border-gray-500/30",
        hover: "hover:bg-gray-500/20"
      };
  }
};

const NewsList = () => {
  const [selectedCategory, setSelectedCategory] = useState<NewsData["category"] | "all">("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const newsPerPage = 3;

  const allNews = selectedCategory === "all" 
    ? getLatestNews() 
    : getNewsByCategory(selectedCategory);

  const totalPages = Math.ceil(allNews.length / newsPerPage);
  const currentNews = allNews.slice(currentPage * newsPerPage, (currentPage + 1) * newsPerPage);

  const handlePrevPage = () => {
    setDirection(-1);
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setDirection(1);
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handleCategoryChange = (category: NewsData["category"] | "all") => {
    setSelectedCategory(category);
    setCurrentPage(0);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
          Aktualności
        </h2>
        
        {/* Filtry kategorii */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCategoryChange("all")}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-yellow-500 text-gray-900"
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Wszystkie
          </motion.button>
          {["ogłoszenie", "konkurs", "aktualizacja", "event"].map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategoryChange(category as NewsData["category"])}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedCategory === category
                  ? `${getCategoryStyle(category).bg} ${getCategoryStyle(category).text} border ${getCategoryStyle(category).border}`
                  : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lista newsów */}
      <div className="relative overflow-hidden min-h-[500px]">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="space-y-4"
          >
            {currentNews.map((news) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/news/${news.id}`}
                  className={`block p-6 rounded-lg border ${getCategoryStyle(news.category).border} ${getCategoryStyle(news.category).bg} ${getCategoryStyle(news.category).hover} transition-all duration-300 hover:scale-[1.01]`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`${getCategoryStyle(news.category).text} font-semibold`}
                    >
                      {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
                    </motion.span>
                    <span className="text-gray-400 text-sm flex items-center gap-2">
                      <FaCalendarAlt />
                      {format(new Date(news.date), "d MMMM yyyy", { locale: pl })}
                    </span>
                  </div>
                  <h3 className={`${getCategoryStyle(news.category).text} font-bold text-xl pb-2`}>
                    {news.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{news.shortDescription}</p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className={`${getCategoryStyle(news.category).text} text-sm font-semibold inline-flex items-center gap-1`}
                  >
                    Czytaj więcej
                    <FaChevronRight className="text-xs" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Paginacja */}
      <div className="flex justify-between items-center mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaChevronLeft />
          Poprzednie
        </motion.button>

        <span className="text-gray-400">
          Strona {currentPage + 1} z {totalPages}
        </span>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Następne
          <FaChevronRight />
        </motion.button>
      </div>
    </div>
  );
};

export default NewsList; 