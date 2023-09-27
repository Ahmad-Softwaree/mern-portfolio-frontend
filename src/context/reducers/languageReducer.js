import en from "../../language/en.json";
import ar from "../../language/ar.json";
import kr from "../../language/kr.json";
import { ARABIC, ENGLISH, KURDISH } from "../../context/types/language_types";

export const languageInitialState = {
  language:
    localStorage.getItem("lang") === "en"
      ? "en"
      : localStorage.getItem("lang") === "ar"
      ? "ar"
      : localStorage.getItem("lang") === "kr"
      ? "kr"
      : "en",
  file:
    localStorage.getItem("lang") === "en"
      ? en
      : localStorage.getItem("lang") === "ar"
      ? ar
      : localStorage.getItem("lang") === "kr"
      ? kr
      : en,
};

export const languageReducer = (state = languageInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ENGLISH:
      localStorage.setItem("lang", "en");
      return {
        ...state,
        language: "en",
        file: en,
      };
    case ARABIC:
      localStorage.setItem("lang", "ar");

      return {
        ...state,
        language: "ar",
        file: ar,
      };
    case KURDISH:
      localStorage.setItem("lang", "kr");

      return {
        ...state,
        language: "kr",
        file: kr,
      };
    default:
      return state;
  }
};
