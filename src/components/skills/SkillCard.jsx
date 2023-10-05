import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

export default function SkillCard({ val }) {
  const {
    state: { language },
  } = useContext(LanguageContext);
  return (
    <div className="w-[150px] h-[250px] md:w-[200px] md:h-[300px] rounded-md cursor-pointer  p-5 transition-all flex flex-col justify-center items-center gap-3 border-niceBlack  duration-300 bg-black shadow-xl hover:border-purple  border-2 border-solid hover:scale-[1.1] hover:text-red">
      <img
        className="w-full h-[50px] md:h-[100px] object-contain"
        src={val.imageURL}
        alt="skillImage"
      />
      <span className="w-full text-center text-white font-bold !text-[14px] md:!text-[18px] font-Poppins">
        {val.name}
      </span>
      <div className="w-full flex flex-col justify-center items-center gap-2">
        {val.types.map((val, index) => {
          return (
            <span
              key={index}
              className="w-full text-center text-white opacity-60 font-[500] !text-[12px]"
            >
              {language === "en"
                ? val?.type?.enName
                : language === "ar"
                ? val?.type?.arName
                : val?.type?.krName}
            </span>
          );
        })}
      </div>
    </div>
  );
}
