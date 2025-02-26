"use client";
import { useWords } from "@/app/context/WordContext";
import { motion } from "framer-motion";
import { useState } from "react";

export default function WordGrid() {
  const { words } = useWords();

  return words.length > 0 ? (
    <div className="max-w-4xl m-0 p-4">
      <div className="overflow-y-auto max-h-96 bg-gray-900 shadow-2xl rounded-2xl p-4 border border-gray-700">
        {Array.from({ length: Math.ceil(words.length / 20) }, (_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-wrap justify-start gap-2 mb-2"
          >
            {words
              .slice(rowIndex * 20, (rowIndex + 1) * 20)
              .map((word, index) => (
                <WordButton key={index} word={word} />
              ))}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="max-w-4xl mx-auto p-4">
      <div className="overflow-y-auto bg-gray-900 shadow-2xl rounded-2xl p-4 border border-gray-700">
        <h1 className="text-2xl text-center text-gray-300">
          No words found. Generate some words first.
        </h1>
      </div>
    </div>
  );
}

function WordButton({ word }: { word: string }) {
  const [hovered, setHovered] = useState(false);
  const { originalPayload } = useWords();
  const keys = Object.keys(originalPayload?.phonology?.mapping ?? {});
  const values = Object.values(originalPayload?.phonology?.mapping ?? {});
  //turn the values into keys and keys into values
  const inputMapToPhoneme = keys.reduce<Record<string, string>>(
    (acc, key, index) => {
      acc[values[index]] = key;
      return acc;
    },
    {}
  );

  return (
    <motion.button
      className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg shadow-lg border border-gray-700 transition-all 
                   active:shadow-none active:translate-y-1 focus:outline-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.1 }}
    >
      <span
        className={`transition-all duration-300 ${
          hovered ? "text-orange-500 drop-shadow-[0_0_10px_#ff4500]" : ""
        }`}
      >
        {word} /
        {word
          .split("")
          .map((w) => inputMapToPhoneme[w])
          .join("")}
        /
      </span>
    </motion.button>
  );
}
