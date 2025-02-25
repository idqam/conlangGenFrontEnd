import { useWords } from "@/app/context/WordContext";
import React from "react";

interface VowelHarmonySpec {
  isEnabled: boolean;
  inputs?: Record<string, string[]>;
}

interface PhonologySpec {
  activeVowels?: string[];
  activeConsonants?: string[];
  allowedSyllables?: string[];
  consonantClusters?: string[];
  vowelClusters?: string[];
  transformationRules?: string;
  mapping?: Record<string, string>;
  vowelHarmony?: VowelHarmonySpec;
}

const PhonologyDisplay: React.FC = () => {
  const { originalPayload } = useWords();
  const phonology: PhonologySpec | null = originalPayload?.phonology || null;

  if (!phonology) {
    return <p className="text-gray-400">No phonology data available.</p>;
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-red-400 via-purple-300 bg-clip-text text-transparent">
        Phonology Specification
      </h2>

      <div className="space-y-4">
        <InfoBlock title="Active Vowels" data={phonology.activeVowels} />
        <InfoBlock
          title="Active Consonants"
          data={phonology.activeConsonants}
        />
        <InfoBlock
          title="Allowed Syllables"
          data={phonology.allowedSyllables}
        />
        <InfoBlock
          title="Consonant Clusters"
          data={phonology.consonantClusters}
        />
        <InfoBlock title="Vowel Clusters" data={phonology.vowelClusters} />
        <InfoBlock
          title="Transformation Rules"
          data={phonology.transformationRules}
        />

        {phonology.mapping && (
          <InfoBlock
            title="Phoneme Mapping"
            data={Object.entries(phonology.mapping).map(
              ([key, value]) => `${key} → ${value}`
            )}
          />
        )}

        {phonology.vowelHarmony && (
          <div className="group">
            <h3 className="font-semibold text-lg">Vowel Harmony:</h3>
            <div className="text-gray-300 group-hover:text-white transition-all group-hover:shadow-md group-hover:bg-gradient-to-r from-amber-300 via-blue-400 to-red-400 p-2 rounded-lg">
              <p>Enabled: {phonology.vowelHarmony.isEnabled ? "Yes" : "No"}</p>
              {phonology.vowelHarmony.inputs && (
                <div className="mt-2">
                  {Object.entries(phonology.vowelHarmony.inputs).map(
                    ([key, value]) => (
                      <p key={key}>
                        <strong>{key}:</strong> {value.join(", ")}
                      </p>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Info Block Component (Handles Display and Hover Effect)
const InfoBlock: React.FC<{
  title: string;
  data?: string[] | string | null;
}> = ({ title, data }) => {
  if (!data || (Array.isArray(data) && data.length === 0)) return null;

  return (
    <div className="group">
      <h3 className="font-semibold text-lg">{title}:</h3>
      <div
        className="text-gray-300 group-hover:text-white transition-all group-hover:shadow-md 
        group-hover:bg-gradient-to-r from-amber-300 via-blue-400 to-red-400 p-2 rounded-lg"
      >
        {Array.isArray(data) ? data.join(", ") : data}
      </div>
    </div>
  );
};

export default PhonologyDisplay;
