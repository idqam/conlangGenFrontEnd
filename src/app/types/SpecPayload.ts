export interface PhonologySpec {
  activeVowels: string[];
  activeConsonants: string[];
  vowelFrequencies: Record<string, number>;
  consonantFrequencies: Record<string, number>;
  mapping: Record<string, string>;
  allowedSyllables: string[];
  transformationRules: string;
  consonantClusters: string;
  vowelClusters: string;
  vowelHarmony: VowelHarmony;
}

export interface AdditionalFeatureSpec {
  grammaticalGender: "1" | "2" | "3" | "4" | "";
  negation: "infix" | "prefix" | "";
  pronounSystem: "Inclusive-exclusive" | "Binary" | "Neutral" | "Other" | "";
}

export interface GrammarFormData {
  morphology: "Isolating" | "Agglutinative" | "Fusional" | "";
  wordOrder: "SVO" | "SOV" | "VSO" | "";
  nounCases: "None" | "Minimal" | "Moderate" | "Rich" | "Define" | "";
  definedNounCases?: string;
  verbConjugation: "None" | "Regular" | "Highly Inflected" | "";
  verbTenses: string[];
  verbAspects: string[];
  verbMoods: string[];
  additionalFeatures: AdditionalFeatureSpec;
}

export const initialGrammarFormData: GrammarFormData = {
  morphology: "",
  wordOrder: "",
  nounCases: "",
  definedNounCases: "",
  verbConjugation: "",
  verbTenses: [],
  verbAspects: [],
  verbMoods: [],
  additionalFeatures: {
    grammaticalGender: "",
    negation: "",
    pronounSystem: "",
  },
};

export interface VowelHarmony {
  isEnabled: boolean;
  inputs: {
    front: string[];
    back: string[];
    neutral: string[];
  };
}

export interface PayloadSpec {
  language?: string;
  phonology: PhonologySpec;
  grammar: GrammarFormData;
}
