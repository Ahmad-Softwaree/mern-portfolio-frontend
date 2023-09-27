import React, { useContext, useState } from "react";
import { Element } from "react-scroll";
import { LanguageContext } from "../../context/LanguageContext";

export default function About() {
  const [part, setPart] = useState("main");
  const {
    state: { language, file },
  } = useContext(LanguageContext);

  return (
    <Element data-aos="fade-up" className="w-full z-[100]" name="about">
      <section
        id="about"
        className="w-full flex flex-col justify-left items-center gap-10 bg-niceBlack text-white px-10 pb-[200px] "
      >
        <h1 className="font-bold text-white">About Me</h1>

        <p className="text-niceGray w-full">
          My name is Ahmad, I'm 20 Years Old from Kurdistan Iraq
        </p>
        <div className="w-full flex flex-row justify-left items-center gap-5 flex-wrap">
          <p
            onClick={() => setPart("main")}
            className={`text-white  cursor-pointer about transition-all text-left duration-300 !text-[18px] w-[200px] ${
              part === "main" && "active"
            }`}
          >
            Main Skills
          </p>
          <p
            onClick={() => setPart("exp")}
            className={`text-white cursor-pointer about transition-all text-left duration-300 !text-[18px] w-[200px] ${
              part === "exp" && "active"
            }`}
          >
            Experience
          </p>
          <p
            onClick={() => setPart("edu")}
            className={`text-white cursor-pointer about transition-all text-left duration-300 !text-[18px] w-[200px] ${
              part === "edu" && "active"
            }`}
          >
            Education & Certification
          </p>
        </div>

        {part === "main" && (
          <div
            data-aos="fade-right"
            className="w-full flex flex-col justify-left items-center gap-5 p-5 bg-black shadow-xl rounded-md mt-10"
          >
            <div className="flex flex-col justify-left items-start gap-1 w-full">
              <p className="font-bold  !text-[18px] text-purple">
                Front-end Developer
              </p>
              <p className="font-[400]  !text-[16px] opacity-80 ">
                Developer Good UI/UX Front-end With React.js
              </p>
            </div>
            <div className="flex flex-col justify-left items-start gap-1 w-full">
              <p className="font-bold  !text-[18px] text-purple">
                Back-end Developer
              </p>
              <p className="font-[400]  !text-[16px] opacity-80 ">
                Developer Good Back-end With Node.js & Express.js
              </p>
            </div>
          </div>
        )}

        {part === "exp" && (
          <div
            data-aos="fade-right"
            className="w-full flex flex-col justify-left items-center gap-5 p-5 bg-black shadow-xl rounded-md mt-10"
          >
            <div className="flex flex-col justify-left items-start gap-1 w-full">
              <p className="font-bold  !text-[18px] text-purple">
                CEO & Founder
              </p>
              <p className="font-[400]  !text-[16px] opacity-80 ">
                CEO & Founder Of Bester Group
              </p>
            </div>
            <div className="flex flex-col justify-left items-start gap-1 w-full">
              <p className="font-bold  !text-[18px] text-purple">
                Full-stack Developer
              </p>
              <p className="font-[400]  !text-[16px] opacity-80 ">
                Full-stack Developer in Bester Group
              </p>
            </div>
            <div className="flex flex-col justify-left items-start gap-1 w-full">
              <p className="font-bold  !text-[18px] text-purple">
                Full-stack Developer
              </p>
              <p className="font-[400]  !text-[16px] opacity-80 ">
                Full-stack Developer in Kurdferga Group
              </p>
            </div>
            <div className="flex flex-col justify-left items-start gap-1 w-full">
              <p className="font-bold  !text-[18px] text-purple">
                Front-end Developer
              </p>
              <p className="font-[400]  !text-[16px] opacity-80 ">
                Front-end Developer in Informatics
              </p>
            </div>
          </div>
        )}

        {part === "edu" && (
          <div
            data-aos="fade-right"
            className="w-full flex flex-col justify-left items-center gap-5 p-5 bg-black shadow-xl rounded-md mt-10"
          >
            <div className="flex flex-col justify-left items-start gap-1 w-full">
              <p className="font-bold  !text-[18px] text-purple">
                Bachelor Degree
              </p>
              <p className="font-[400]  !text-[16px] opacity-80 ">
                Bachelor Degree In Computer Science, Sulaymaniah University
              </p>
            </div>
            <div className="flex flex-col justify-left items-start gap-1 w-full">
              <p className="font-bold  !text-[18px] text-purple">
                Bachelor Degree
              </p>
              <p className="font-[400]  !text-[16px] opacity-80 ">
                Student In Software Engineer, Salahadin University
              </p>
            </div>
          </div>
        )}
      </section>
    </Element>
  );
}
