"use client";

import { useState, useEffect } from "react";
import { ChangelogEntry, ChangeType } from "@/app/news/changelog";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaWrench, FaMinus, FaExchangeAlt } from "react-icons/fa";

const getChangeTypeIcon = (type: ChangeType) => {
  switch (type) {
    case "add":
      return <FaPlus className="text-green-500" />;
    case "remove":
      return <FaMinus className="text-red-500" />;
    case "fix":
      return <FaWrench className="text-yellow-500" />;
    case "change":
      return <FaExchangeAlt className="text-blue-500" />;
  }
};

const getChangeTypeStyle = (type: ChangeType) => {
  switch (type) {
    case "add":
      return {
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        text: "text-green-500"
      };
    case "remove":
      return {
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        text: "text-red-500"
      };
    case "fix":
      return {
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
        text: "text-yellow-500"
      };
    case "change":
      return {
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        text: "text-blue-500"
      };
  }
};

const ChangelogList = () => {
  const [changelog, setChangelog] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        const response = await fetch('/api/changelog');
        const data = await response.json();
        if (data.changelog) {
          const changelogArray = Object.values(data.changelog) as ChangelogEntry[];
          setChangelog(
            changelogArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          );
        }
      } catch (error) {
        console.error('Błąd podczas pobierania changelogu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChangelog();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="flex justify-center items-center h-[200px]">
          <div className="text-gray-400">Ładowanie changelogu...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent mb-6">
        Changelog
      </h2>

      <div className="space-y-6">
        <AnimatePresence>
          {changelog.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border border-gray-700/50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">
                    {format(new Date(entry.date), "d MMMM yyyy", { locale: pl })}
                  </span>
                  {entry.version && (
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm">
                      v{entry.version}
                    </span>
                  )}
                </div>
                <span className="text-gray-400 text-sm">
                  Autor: {entry.author}
                </span>
              </div>

              <div className="space-y-2">
                {entry.changes.map((change, index) => {
                  const style = getChangeTypeStyle(change.type);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-3 p-2 rounded ${style.bg} border ${style.border}`}
                    >
                      {getChangeTypeIcon(change.type)}
                      <span className="text-gray-200">{change.description}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChangelogList; 