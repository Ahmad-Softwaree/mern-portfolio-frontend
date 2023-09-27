import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

export default function NoData() {
  const {
    state: { file },
  } = useContext(LanguageContext);
  return (
    <div
      data-aos="fade-up"
      className="w-full h-[200px] flex flex-row justify-center items-center text-center"
    >
      <h2 className="w-full text-center text-white">{file.noData}</h2>
    </div>
  );
}
