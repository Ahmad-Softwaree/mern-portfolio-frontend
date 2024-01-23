import { LanguageContext } from "@/context/LanguageContext";
import React, { useContext, useLayoutEffect } from "react";

const useChangeLanguage = () => {
  const {
    dispatch,
    state: { lang },
  } = useContext(LanguageContext);
  useLayoutEffect(() => {
    if (lang === "en") {
      document.body.style.direction = "ltr";
      document.body.classList.remove("font-rabar");
      document.body.classList.add("font-poppins");
    } else {
      document.body.style.direction = "rtl";
      document.body.classList.remove("font-poppins");
      document.body.classList.add("font-rabar");
    }
  }, [lang]);
};

export default useChangeLanguage;
