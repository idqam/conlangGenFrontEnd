import { PhonologySpec } from "@/app/types/SpecPayload";

export function PhonoTestSpec(): PhonologySpec {
  return {
    activeVowels: [
      "ɑ",
      "ɛ",
      "i",
      "o",
      "u",
      "e",
      "æ",
      "ʊ",
      "ɪ",
      "ʌ",
      "ɒ",
      "ɔ",
      "ø",
      "y",
      "ɯ",
    ],
    activeConsonants: [
      "p",
      "t",
      "k",
      "s",
      "m",
      "n",
      "b",
      "d",
      "g",
      "f",
      "v",
      "θ",
      "ð",
      "ʃ",
      "ʒ",
      "ʧ",
      "ʤ",
      "l",
      "r",
      "j",
      "w",
      "h",
      "ɡ",
      "ŋ",
      "ɾ",
      "z",
      "ʔ",
      "ɣ",
      "ʂ",
      "ʐ",
    ],
    vowelFrequencies: {},
    consonantFrequencies: {},
    mapping: {
      ɑ: "a",
      ɛ: "é",
      i: "i",
      o: "o",
      u: "u",
      e: "é",
      æ: "ä",
      ʊ: "û",
      ɪ: "ï",
      ʌ: "ô",
      ɒ: "a",
      ɔ: "o",
      ø: "ö",
      y: "ü",
      ɯ: "ɯ",
      p: "p",
      t: "t",
      k: "k",
      s: "s",
      m: "m",
      n: "n",
      b: "b",
      d: "d",
      g: "g",
      f: "f",
      v: "v",
      θ: "th",
      ð: "dh",
      ʃ: "sh",
      ʒ: "zh",
      ʧ: "ch",
      ʤ: "j",
      l: "l",
      r: "r",
      j: "y",
      w: "w",
      h: "h",
      ɡ: "g",
      ŋ: "ng",
      ɾ: "r",
      z: "z",
      ʔ: "'",
      ɣ: "gh",
      ʂ: "sh",
      ʐ: "zh",
    },
    allowedSyllables: [
      "CVC",
      "CV",
      "VC",
      "V",
      "CCV",
      "CCVC",
      "VCC",
      "CVCV",
      "CVCC",
      "CVVC",
      "CCCCCCVVVCCCC",
      "CVCVCVCVVVVCCCVC",
      "VVV",
      "VV",
    ],
    transformationRules:
      "[θ > t / _C] [ð > d / V_V] [ʃ > s / #_] [ʒ > zh / _V] [ʧ > ch / _#] [ʤ > j / V_]",
    consonantClusters:
      "st, pr, kt, fl, gr, skr, sp, tr,bl,dr,str, spl,scr,thr,shr,strp,splr,scrpt,strch",

    vowelClusters: "ai, oi, ea, ou, ui, ie, ei, oa, aou, eai, iou, uai,oei",

    vowelHarmony: {
      isEnabled: true,
      inputs: {
        front: ["i", "e", "ɛ", "æ", "ɪ", "ø", "y"],
        back: ["o", "u", "ʊ", "ʌ", "ɔ"],
        neutral: ["ɑ", "ɒ", "ɯ"],
      },
    },
  };
}
