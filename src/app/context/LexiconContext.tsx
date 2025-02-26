import React, { createContext, useContext, useState, useCallback } from "react";

type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "pronoun"
  | "preposition"
  | "conjunction"
  | "interjection";

interface WordEntry {
  word: string;
  partOfSpeech: PartOfSpeech;
}

interface LexiconContextType {
  lexicon: Record<string, WordEntry>;
  updateLexicon: (words: string[]) => void;
}

const LexiconContext = createContext<LexiconContextType | undefined>(undefined);

export const LexiconProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lexicon, setLexicon] = useState<Record<string, WordEntry>>({});

  // Memoize the getRandomPartOfSpeech function so it remains stable across renders.
  const getRandomPartOfSpeech = useCallback((): PartOfSpeech => {
    const partsOfSpeech: PartOfSpeech[] = [
      "noun",
      "verb",
      "adjective",
      "adverb",
      "pronoun",
      "preposition",
      "conjunction",
      "interjection",
    ];
    return partsOfSpeech[Math.floor(Math.random() * partsOfSpeech.length)];
  }, []);

  // Memoize updateLexicon to ensure it only changes when its dependencies change.
  const updateLexicon = useCallback(
    (words: string[]) => {
      setLexicon((prevLexicon) => {
        const newEntries = words.reduce<Record<string, WordEntry>>(
          (acc, word) => {
            acc[word] = { word, partOfSpeech: getRandomPartOfSpeech() };
            return acc;
          },
          {}
        );
        return { ...prevLexicon, ...newEntries };
      });
    },
    [getRandomPartOfSpeech]
  );

  return (
    <LexiconContext.Provider value={{ lexicon, updateLexicon }}>
      {children}
    </LexiconContext.Provider>
  );
};

export const useLexicon = () => {
  const context = useContext(LexiconContext);
  if (!context) {
    throw new Error("useLexicon must be used within a LexiconProvider");
  }
  return context;
};
