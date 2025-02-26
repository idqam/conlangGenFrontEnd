import { useGrammarContext } from "@/app/context/GrammarContext";
import { useWords } from "@/app/context/WordContext";
import { InfoBlock } from "./PhonologyDisplay";
import { useLexicon } from "@/app/context/LexiconContext";
import { useEffect } from "react";

export const GrammarDisplay = () => {
  const { submittedData } = useGrammarContext();
  const { updateLexicon, lexicon } = useLexicon();
  const { words } = useWords();

  useEffect(() => {
    updateLexicon(words);
  }, [words]);

  // Set defaults for grammar if not submitted.
  const grammarData = {
    morphology: submittedData.morphology ?? "Isolating",
    wordOrder: submittedData.wordOrder ?? "SOV",
    nounCases: submittedData.nounCases ?? "None",
    definedNounCases: submittedData.definedNounCases ?? "No specific cases",
    verbConjugation: submittedData.verbConjugation ?? "Regular",
    verbTenses: submittedData.verbTenses ?? "Past, Present, Future",
    verbAspects: submittedData.verbAspects ?? "Perfective, Imperfective",
    verbMoods: submittedData.verbMoods ?? "Indicative, Subjunctive",
    additionalFeatures: {
      grammaticalGender:
        submittedData.additionalFeatures?.grammaticalGender ?? "None",
      negation: submittedData.additionalFeatures?.negation ?? "Standard",
      pronounSystem:
        submittedData.additionalFeatures?.pronounSystem ?? "Personal",
    },
  };

  const lexiconGroups = Object.values(lexicon).reduce(
    (acc: { [key: string]: string[] }, entry) => {
      const pos = entry.partOfSpeech;
      if (!acc[pos]) acc[pos] = [];
      acc[pos].push(entry.word);
      return acc;
    },
    {}
  );

  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg mx-auto space-y-6">
      {/* Grammar Section */}
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-red-400 via-purple-300 bg-clip-text text-transparent">
        {submittedData ? "Grammar Specification" : "No grammar data available"}
      </h2>

      {submittedData && (
        <div className="space-y-4">
          <InfoBlock
            title="Overall Morphology"
            data={`${
              grammarData.morphology ? `${grammarData.morphology}` : ""
            }`}
          />
          <InfoBlock title="Noun Cases" data={grammarData.nounCases} />
          <InfoBlock
            title="Defined Noun Cases"
            data={grammarData.definedNounCases}
          />
          <InfoBlock
            title="Verb Conjugation"
            data={grammarData.verbConjugation}
          />
          <InfoBlock title="Verb Tenses" data={grammarData.verbTenses} />
          <InfoBlock title="Verb Aspects" data={grammarData.verbAspects} />
          <InfoBlock title="Verb Moods" data={grammarData.verbMoods} />
          <InfoBlock
            title="Grammatical Gender"
            data={grammarData.additionalFeatures.grammaticalGender}
          />
          <InfoBlock
            title="Negation"
            data={grammarData.additionalFeatures.negation}
          />
          <InfoBlock
            title="Pronoun System"
            data={grammarData.additionalFeatures.pronounSystem}
          />
        </div>
      )}

      {/* Lexicon Section */}
      <h2 className="text-2xl font-bold text-center mt-6 mb-2">Lexicon</h2>
      <div className="flex gap-4 flex-grow justify-center p-2">
        {Object.entries(lexiconGroups).map(([pos, words]) => (
          <div
            key={pos}
            className="p-4 bg-gray-800 rounded-lg shadow-2xl transform transition hover:scale-105"
          >
            <h3 className="text-lg font-semibold capitalize mb-2">{pos}</h3>
            <div className="flex flex-wrap gap-2">
              {words.map((word, idx) => (
                <div
                  key={idx}
                  className="bg-gray-700 text-sm text-white px-3 py-1 rounded-full hover:bg-gray-600 transition"
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
