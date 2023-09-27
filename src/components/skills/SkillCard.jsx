import React, { useEffect } from "react";

export default function SkillCard({ val }) {
  useEffect(() => {
    console.log(val);
  }, [val]);
  return (
    <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-md cursor-pointer  p-5 transition-all flex flex-col justify-center items-center gap-3 border-niceBlack  duration-300 bg-black shadow-xl hover:border-purple  border-2 border-solid hover:scale-[1.1] hover:text-red">
      <img
        className="w-full h-[50px] md:h-[100px] object-contain"
        src={val.imageURL}
        alt="skillImage"
      />
      <span className="w-full text-center text-white font-bold !text-[14px] md:!text-[18px]">
        {val.name}
      </span>
      <span className="w-full text-center text-white opacity-60 font-[500] !text-[14px]">
        {val.type.enName}
      </span>
    </div>
  );
}
