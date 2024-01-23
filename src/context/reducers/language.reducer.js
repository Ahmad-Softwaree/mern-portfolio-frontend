import en from "@/language/en.json";
import ar from "@/language/ar.json";
import kr from "@/language/kr.json";
import { CONTEXT_TYPEs } from "..";
let lang = localStorage.getItem("lang");
export const languageState = {
  lang: lang || "en",
  file: lang === "en" ? en : lang === "ar" ? ar : lang === "kr" ? kr : en,
};

export const languageReducer = (state = languageState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CONTEXT_TYPEs.ENGLISH:
      localStorage.setItem("lang", "en");
      return {
        ...state,
        lang: "en",
        file: en,
      };
    case CONTEXT_TYPEs.ARABIC:
      localStorage.setItem("lang", "ar");
      return {
        ...state,
        lang: "ar",
        file: ar,
      };
    case CONTEXT_TYPEs.KURDISH:
      localStorage.setItem("lang", "kr");
      return {
        ...state,
        lang: "kr",
        file: kr,
      };
    default:
      return state;
  }
};
