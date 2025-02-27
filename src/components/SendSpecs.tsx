/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGrammarContext } from "@/app/context/GrammarContext";
import { useIpaSymbols } from "@/app/context/IpaSymbolContext";
import { useMapping } from "@/app/context/MappingContext";
import { usePhonoRules } from "@/app/context/PhoneRulesContext";
import {
  PhonologySpec,
  VowelHarmony,
  PayloadSpec,
  GrammarFormData,
} from "@/app/types/SpecPayload";
import { useEffect, useState } from "react";
import { PhonoTestSpec } from "./testPayloads/PhonoSpecTest";
import { useWords } from "@/app/context/WordContext";

const API_URL_SUBMIT_SPECS =
  "https://conlanggenbackend.onrender.com/api/v1/send-words-phonology";

const TEST_API = "http://localhost:8000/api/v1/send-words-phonology";

export const SendSpecs = () => {
  const { activeVowels, activeConsonants } = useIpaSymbols();
  const { inputMapToPhoneme } = useMapping();
  const { setWords, setOriginalPayload } = useWords();
  const {
    transformationRules,
    vowelHarmony,
    allowedSyllables,
    consonantClusters,
    vowelClusters,
  } = usePhonoRules();

  // Grammar data
  const { submittedData } = useGrammarContext();

  const grammar: GrammarFormData = {
    morphology: ["", "Isolating", "Agglutinative", "Fusional"].includes(
      submittedData.morphology
    )
      ? (submittedData.morphology as
          | ""
          | "Isolating"
          | "Agglutinative"
          | "Fusional")
      : "",
    wordOrder: ["", "SVO", "SOV", "VSO"].includes(submittedData.wordOrder)
      ? (submittedData.wordOrder as "" | "SVO" | "SOV" | "VSO")
      : "",
    nounCases: ["", "None", "Minimal", "Moderate", "Rich", "Define"].includes(
      submittedData.nounCases
    )
      ? (submittedData.nounCases as
          | ""
          | "None"
          | "Minimal"
          | "Moderate"
          | "Rich"
          | "Define")
      : "",
    definedNounCases: submittedData.definedNounCases ?? "",
    verbConjugation: ["", "None", "Regular", "Highly Inflected"].includes(
      submittedData.verbConjugation as
        | ""
        | "None"
        | "Regular"
        | "Highly Inflected"
    )
      ? (submittedData.verbConjugation as
          | ""
          | "None"
          | "Regular"
          | "Highly Inflected")
      : "",
    verbTenses: submittedData.verbTenses ?? [],
    verbAspects: submittedData.verbAspects ?? [],
    verbMoods: submittedData.verbMoods ?? [],
    additionalFeatures: {
      grammaticalGender: ["", "1", "2", "3", "4"].includes(
        submittedData.additionalFeatures?.grammaticalGender
      )
        ? (submittedData.additionalFeatures?.grammaticalGender as
            | ""
            | "1"
            | "2"
            | "3"
            | "4")
        : "",
      negation: ["", "infix", "prefix"].includes(
        submittedData.additionalFeatures?.negation
      )
        ? (submittedData.additionalFeatures?.negation as
            | ""
            | "infix"
            | "prefix")
        : "",
      pronounSystem: [
        "",
        "Inclusive-exclusive",
        "Binary",
        "Neutral",
        "Other",
      ].includes(submittedData.additionalFeatures?.pronounSystem)
        ? (submittedData.additionalFeatures?.pronounSystem as
            | ""
            | "Inclusive-exclusive"
            | "Binary"
            | "Neutral"
            | "Other")
        : "",
    },
  };

  // Phonology data
  const phonology: PhonologySpec = {
    activeVowels: activeVowels ?? [],
    activeConsonants: activeConsonants ?? [],
    vowelFrequencies: {},
    consonantFrequencies: {},
    mapping: inputMapToPhoneme ?? {},
    allowedSyllables: allowedSyllables ?? [],
    transformationRules: transformationRules ?? "",
    consonantClusters: consonantClusters ?? "",
    vowelClusters: vowelClusters ?? "",
    vowelHarmony:
      vowelHarmony ??
      ({
        isEnabled: false,
        inputs: {
          front: [],
          back: [],
          neutral: [],
        },
      } as VowelHarmony),
  };

  const payload: PayloadSpec = {
    language: "Language",
    phonology,
    grammar,
  };

  const testpayload2: PayloadSpec = {
    language: "Language",
    phonology: PhonoTestSpec(),
    grammar,
  };
  const [responseData, setResponseData] = useState<any>(null);

  useEffect(() => {
    if (responseData?.words) {
      setWords(responseData.words);
    }
    if (responseData?.originalPayload) {
      setOriginalPayload(responseData.originalPayload);
    }
  }, [responseData, setWords, setOriginalPayload]);

  async function submitSpecs(payload: PayloadSpec) {
    //change api url to prod after testing
    try {
      const response = await fetch(API_URL_SUBMIT_SPECS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Response Data:", data);
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status} - ${data.message}`);
      }

      console.log(data);

      setResponseData(data);
    } catch (error: any) {
      alert(`Failed: ${error.message}`);
    }
  }

  return (
    <div className="flex space-x-2 justify-end items-center">
      <button
        className=" font-bold text-sm md:text-lg border-2 rounded-xl p-2 text-white hover:-translate-y-2 hover:shadow-lg  flex justify-center bg-zinc-800 w-fit items-center"
        onClick={() => submitSpecs(payload)}
      >
        Get Words
      </button>
      <button
        className=" font-bold text-sm md:text-lg border-2 rounded-xl p-2 text-white hover:-translate-y-2 hover:shadow-lg  flex justify-center bg-zinc-800 w-fit items-center"
        onClick={() => submitSpecs(testpayload2)}
      >
        Get Words Example
      </button>
    </div>
  );
};
