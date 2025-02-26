import { ReactNode, useState, createContext, useContext } from "react";
import { GrammarFormData } from "../types/SpecPayload";

export interface AdditionalFeatureSpec {
  grammaticalGender: string;
  negation: string;
  pronounSystem: string;
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

interface GrammarContextType {
  submittedData: GrammarFormData;
  updateSubmittedData: (data: GrammarFormData) => void;
}

const GrammarContext = createContext<GrammarContextType>({
  submittedData: initialGrammarFormData,
  updateSubmittedData: () => {},
});

interface GrammarProviderProps {
  children: ReactNode;
}

export const GrammarProvider: React.FC<GrammarProviderProps> = ({
  children,
}) => {
  const [submittedData, setSubmittedData] = useState<GrammarFormData>(
    initialGrammarFormData
  );

  const updateSubmittedData = (data: GrammarFormData) => {
    setSubmittedData(data);
  };

  return (
    <GrammarContext.Provider value={{ submittedData, updateSubmittedData }}>
      {children}
    </GrammarContext.Provider>
  );
};

export const useGrammarContext = (): GrammarContextType => {
  const context = useContext(GrammarContext);
  if (!context) {
    throw new Error("useGrammarContext must be used within a GrammarProvider");
  }
  return context;
};
