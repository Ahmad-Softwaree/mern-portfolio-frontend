import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

export default function SkillCard({ val }) {
  const {
    state: { language },
  } = useContext(LanguageContext);
  return (
    <div className="w-[150px] h-[250px] md:w-[200px] md:h-[300px] rounded-md cursor-pointer  p-5 px-0 transition-all flex flex-col justify-center items-center gap-3 border-niceBlack  duration-300 bg-black shadow-xl hover:border-purple  border-2 border-solid hover:scale-[1.1] hover:text-red">
      <img
        className="w-full h-[50px] md:h-[100px] object-contain px-5"
        src={val.imageURL}
        alt="skillImage"
      />
      <span className="w-full text-center text-white font-bold !text-[14px] md:!text-[18px] font-Poppins px-5">
        {val.name}
      </span>
      <div className="w-full flex flex-row flex-wrap justify-center items-center gap-2">
        {val.types.map((one, index) => {
          return (
            <span
              key={index}
              className="w-fit text-left text-white opacity-60 font-[500] !text-[12px]"
            >
              {language === "en"
                ? one?.type?.enName
                : language === "ar"
                ? one?.type?.arName
                : one?.type?.krName}{" "}
              {index !== val?.types?.length - 1 && (
                <small className="ml-2 text-purple !text-[20px] font-bold">
                  +
                </small>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
