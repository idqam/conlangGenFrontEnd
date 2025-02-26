import { createContext, useContext, useState, ReactNode } from "react";

interface VowelHarmonySpec {
  isEnabled: boolean;
  inputs?: Record<string, string[]>;
}

interface PhonologySpec {
  activeVowels?: string[];
  activeConsonants?: string[];
  vowelFrequencies: Record<string, number>;
  consonantFrequencies: Record<string, number>;
  allowedSyllables?: string[];
  consonantClusters?: string[];
  vowelClusters?: string[];
  transformationRules?: string;
  mapping?: Record<string, string>;
  vowelHarmony?: VowelHarmonySpec;
}

interface GrammarSpec {
  morphology?: string;
  wordOrder?: string;
  nounCases?: string;
  verbConjugation?: string;
  tenseAspectMood?: string;
  additionalFeatures?: Record<string, string>;
}

interface PayloadSpec {
  language?: string;
  phonology?: PhonologySpec;
  grammar?: GrammarSpec;
}

interface WordContextType {
  words: string[];
  originalPayload: PayloadSpec | null;
  setOriginalPayload: (payload: PayloadSpec) => void;
  setWords: (words: string[]) => void;
}

export const WordContext = createContext<WordContextType>({
  words: [],
  originalPayload: null,
  setOriginalPayload: () => {},
  setWords: () => {},
});

export const WordProvider = ({ children }: { children: ReactNode }) => {
  const [words, setWords] = useState<string[]>([]);
  const [originalPayload, setOriginalPayload] = useState<PayloadSpec | null>(
    null
  );

  return (
    <WordContext.Provider
      value={{ words, setWords, originalPayload, setOriginalPayload }}
    >
      {children}
    </WordContext.Provider>
  );
};

export function useWords() {
  return useContext(WordContext);
}
