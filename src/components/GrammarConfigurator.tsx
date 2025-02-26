/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GrammarFormData,
  initialGrammarFormData,
  useGrammarContext,
} from "@/app/context/GrammarContext";
import React, { useState } from "react";

const GrammarConfigurator = () => {
  const [localFormData, setLocalFormData] = useState<GrammarFormData>(
    initialGrammarFormData
  );
  const { updateSubmittedData } = useGrammarContext();

  const handleSubmit = () => {
    updateSubmittedData(localFormData);
    console.log("Submitted Data:", localFormData);
  };

  const updateField = (field: keyof GrammarFormData, value: any) => {
    setLocalFormData({
      ...localFormData,
      [field]: value,
    });
  };

  const updateAdditionalFeature = (
    field: keyof GrammarFormData["additionalFeatures"],
    value: string
  ) => {
    setLocalFormData({
      ...localFormData,
      additionalFeatures: {
        ...localFormData.additionalFeatures,
        [field]: value,
      },
    });
  };

  const handleMultiSelectChange = (
    field: "verbTenses" | "verbAspects" | "verbMoods",
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    updateField(field, selectedOptions);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 font-sans text-black">
      <h1 className="text-2xl font-semibold mb-4">Grammar Configurator</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Aspect</th>
              <th className="border px-4 py-2">Options</th>
              <th className="border px-4 py-2">Selection</th>
            </tr>
          </thead>
          <tbody>
            {/* Morphology */}
            <tr>
              <td className="border px-4 py-2">Morphology</td>
              <td className="border px-4 py-2">
                Isolating, Agglutinative, Fusional
              </td>
              <td className="border px-4 py-2">
                <select
                  value={localFormData.morphology}
                  onChange={(e) => updateField("morphology", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Morphology</option>
                  <option value="Isolating">Isolating</option>
                  <option value="Agglutinative">Agglutinative</option>
                  <option value="Fusional">Fusional</option>
                </select>
              </td>
            </tr>
            {/* Word Order */}
            <tr>
              <td className="border px-4 py-2">Word Order</td>
              <td className="border px-4 py-2">SVO, SOV, VSO</td>
              <td className="border px-4 py-2">
                <select
                  value={localFormData.wordOrder}
                  onChange={(e) => updateField("wordOrder", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Word Order</option>
                  <option value="SVO">SVO</option>
                  <option value="SOV">SOV</option>
                  <option value="VSO">VSO</option>
                </select>
              </td>
            </tr>
            {/* Noun Cases */}
            <tr>
              <td className="border px-4 py-2">Noun Cases</td>
              <td className="border px-4 py-2">
                None (if Isolating), Minimal, Moderate, Rich, Define
              </td>
              <td className="border px-4 py-2">
                <select
                  value={localFormData.nounCases}
                  onChange={(e) => updateField("nounCases", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Noun Case System</option>
                  <option value="None">None</option>
                  <option value="Minimal">Minimal</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Rich">Rich</option>
                  <option value="Define">Define</option>
                </select>
              </td>
            </tr>
            {localFormData.nounCases === "Define" && (
              <tr>
                <td className="border px-4 py-2">Defined Noun Cases</td>
                <td className="border px-4 py-2">Comma-separated list</td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    placeholder="e.g., Nominative, Accusative, Dative"
                    value={localFormData.definedNounCases}
                    onChange={(e) =>
                      updateField("definedNounCases", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </td>
              </tr>
            )}
            {/* Verb Conjugation */}
            <tr>
              <td className="border px-4 py-2">Verb Conjugation</td>
              <td className="border px-4 py-2">
                None, Regular, Highly Inflected
              </td>
              <td className="border px-4 py-2">
                <select
                  value={localFormData.verbConjugation}
                  onChange={(e) =>
                    updateField("verbConjugation", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Verb Conjugation</option>
                  <option value="None">None</option>
                  <option value="Regular">Regular</option>
                  <option value="Highly Inflected">Highly Inflected</option>
                </select>
              </td>
            </tr>
            {/* Verb Tenses */}
            <tr>
              <td className="border px-4 py-2">Verb Tenses</td>
              <td className="border px-4 py-2">
                Multiple selection (e.g., Past, Present, Future)
              </td>
              <td className="border px-4 py-2">
                <select
                  multiple
                  value={localFormData.verbTenses}
                  onChange={(e) => handleMultiSelectChange("verbTenses", e)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="Past">Past</option>
                  <option value="Present">Present</option>
                  <option value="Future">Future</option>
                </select>
              </td>
            </tr>
            {/* Verb Aspects */}
            <tr>
              <td className="border px-4 py-2">Verb Aspects</td>
              <td className="border px-4 py-2">
                Multiple selection (e.g., Perfective, Imperfective, Progressive,
                Habitual)
              </td>
              <td className="border px-4 py-2">
                <select
                  multiple
                  value={localFormData.verbAspects}
                  onChange={(e) => handleMultiSelectChange("verbAspects", e)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="Perfective">Perfective</option>
                  <option value="Imperfective">Imperfective</option>
                  <option value="Progressive">Progressive</option>
                  <option value="Habitual">Habitual</option>
                </select>
              </td>
            </tr>
            {/* Verb Moods */}
            <tr>
              <td className="border px-4 py-2">Verb Moods</td>
              <td className="border px-4 py-2">
                Multiple selection (e.g., Indicative, Subjunctive, Imperative,
                Conditional, Optative)
              </td>
              <td className="border px-4 py-2">
                <select
                  multiple
                  value={localFormData.verbMoods}
                  onChange={(e) => handleMultiSelectChange("verbMoods", e)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="Indicative">Indicative</option>
                  <option value="Subjunctive">Subjunctive</option>
                  <option value="Imperative">Imperative</option>
                  <option value="Conditional">Conditional</option>
                  <option value="Optative">Optative</option>
                </select>
              </td>
            </tr>
            {/* Grammatical Gender */}
            <tr>
              <td className="border px-4 py-2">Grammatical Gender</td>
              <td className="border px-4 py-2">Select a number (1 to 4)</td>
              <td className="border px-4 py-2">
                <select
                  value={localFormData.additionalFeatures.grammaticalGender}
                  onChange={(e) =>
                    updateAdditionalFeature("grammaticalGender", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Gender Count</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </td>
            </tr>
            {/* Negation Marking */}
            <tr>
              <td className="border px-4 py-2">Negation Marking</td>
              <td className="border px-4 py-2">infix, prefix</td>
              <td className="border px-4 py-2">
                <select
                  value={localFormData.additionalFeatures.negation}
                  onChange={(e) =>
                    updateAdditionalFeature("negation", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Negation Marking</option>
                  <option value="infix">infix</option>
                  <option value="prefix">prefix</option>
                </select>
              </td>
            </tr>
            {/* Pronoun System */}
            <tr>
              <td className="border px-4 py-2">Pronoun System</td>
              <td className="border px-4 py-2">
                Options: Inclusive-exclusive, Binary, Neutral, Other
              </td>
              <td className="border px-4 py-2">
                <select
                  value={localFormData.additionalFeatures.pronounSystem}
                  onChange={(e) =>
                    updateAdditionalFeature("pronounSystem", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Pronoun System</option>
                  <option value="Inclusive-exclusive">
                    Inclusive-exclusive
                  </option>
                  <option value="Binary">Binary</option>
                  <option value="Neutral">Neutral</option>
                  <option value="Other">Other</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default GrammarConfigurator;
