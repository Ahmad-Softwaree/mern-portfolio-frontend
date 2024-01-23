import React, { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";

export default function Hero({ style }) {
  const {
    state: { file },
  } = useContext(LanguageContext);
  //make the background goes with the mouse

  const jobs = useRef();
  const jobsArray = file.home.job;

  useEffect(() => {
    const animateJobs = async () => {
      for (let i = 1; i <= jobsArray.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const currentTop = parseInt(jobs.current?.style.top || "0", 10);

        if (i === jobsArray.length) {
          i = 0;
          jobs.current.style.top = 0 + "px";
        } else {
          jobs.current.style.top = currentTop - 60 + "px";
        }
      }
    };

    animateJobs();
  }, [jobs]);

  return (
    <>
      <img
        data-aos="fade-right"
        src="/images/hero.jpg"
        alt="Ahmad Image"
        className="absolute z-[1000] min-h-screen w-full object-cover xl:object-contain aspect-square   filter brightness-105 contrast-100 saturate-150 opacity-20   blur-[2px]"
      />
      <div className="absolute z-[1100] min-h-screen w-full  opacity-70  aspect-square bg-black-500 inset-0"></div>
      <div
        data-aos="fade-left"
        className="relative flex flex-col justify-center items-center  gap-5  w-[95%] min-w-[300px] z-[1200]">
        <h1 className="font-[500] !text-[30px] md:!text-[35px] text-center w-full lg:!text-[50px]">
          {file.home.welcome}
        </h1>
        <div className="flex flex-row gap-2">
          <h1 className="font-[500] !text-[25px] md:!text-[30px] lg:!text-[40px]">
            {file.home.who}
          </h1>
          <div className="relative text-white-500">
            <img
              alt="Rect Image"
              src="/images/rect.svg"
              className="absolute inset-0 z-1"
            />
            <h1 className="z-20 relative font-[500]    !text-[25px] md:!text-[30px] lg:!text-[40px]">
              {file.home.name}
            </h1>
          </div>
        </div>
        <div className={`relative w-full text-center overflow-hidden h-[60px]`}>
          <div
            ref={jobs}
            className={`absolute top-0 w-full text-center transition-all duration-700 flex flex-col justify-center items-center left-0 `}>
            {jobsArray.map((val, index) => {
              return (
                <h1
                  className="font-bold    !text-[25px] md:!text-[30px] lg:!text-[40px] h-[60px] text-primary-500"
                  key={index}>
                  {val}
                </h1>
              );
            })}
          </div>
        </div>
        <a
          href="/pdf/Resume.pdf"
          download
          className="downloadCV p-2 px-8 bg-transparent border-2 border-solid border-primary-500 transition-all duration-200 hover:bg-primary-500 text-white-500 rounded-md  !text-[15px] md:!text-[20px]">
          {file.home.cv}
        </a>
      </div>

      <div
        className="w-fit absolute z-[100] flex flex-row justify-center items-center gap-2"
        style={style}>
        <div className="w-[227.11px] h-[222.5px] blur-[115px] bg-green opacity-70 transition-all duration-200 rounded-full"></div>
        <div className="w-[227.11px] h-[222.5px] blur-[115px] bg-primary-500 rotate-180 opacity-70 transition-all duration-200 rounded-full"></div>
      </div>
    </>
  );
}
