import React, { useContext, useState } from "react";
import { Element } from "react-scroll";
import { LanguageContext } from "../../context/LanguageContext";

export default function About() {
  const [part, setPart] = useState("main");
  const {
    state: { lang, file },
  } = useContext(LanguageContext);

  return (
    <>
      <h1 className="aboutHeader font-bold text-white-500">
        {file.about.header}
      </h1>

      <p className="text-niceGray w-full">{file.about.about}</p>
      <div className="w-full flex flex-row justify-left items-center gap-5 flex-wrap">
        <p
          onClick={() => setPart("main")}
          className={`text-white-500 ${
            lang === "en"
              ? "after:left-0 text-left"
              : "after:right-0 text-right"
          }  cursor-pointer about transition-all  duration-300 text-text2-light md:text-body2-semibold w-[250] ${
            part === "main" && "active"
          }`}>
          {file.about.main.header}
        </p>
        <p
          onClick={() => setPart("exp")}
          className={`text-white-500 ${
            lang === "en"
              ? "after:left-0 text-left"
              : "after:right-0 text-right"
          } cursor-pointer about transition-all  duration-300 text-text2-light md:text-body2-semibold w-[250] ${
            part === "exp" && "active"
          }`}>
          {file.about.exp.header}
        </p>
        <p
          onClick={() => setPart("edu")}
          className={`text-white-500 ${
            lang === "en"
              ? "after:left-0 text-left"
              : "after:right-0 text-right"
          } cursor-pointer about transition-all  duration-300 text-text2-light md:text-body2-semibold w-[250] ${
            part === "edu" && "active"
          }`}>
          {file.about.edu.header}
        </p>
      </div>

      {part === "main" && (
        <div
          data-aos="fade-right"
          className="w-full flex flex-col justify-left items-center gap-5 p-5 bg-black-600 shadow-xl rounded-md mt-5 md:mt-5">
          <div className="flex flex-col justify-left items-start gap-1 w-full">
            <p className="font-bold  text-text2-light md:text-body2-semibold text-primary-500">
              {file.about.main.one.title}
            </p>
            <p className="font-[400]  text-text2-light md:text-text1-bold opacity-80 ">
              {file.about.main.one.body}
            </p>
          </div>
          <div className="flex flex-col justify-left items-start gap-1 w-full">
            <p className="font-bold  text-text2-light md:text-body2-semibold text-primary-500">
              {file.about.main.two.title}
            </p>
            <p className="font-[400]  text-text2-light md:text-text1-bold opacity-80 ">
              {file.about.main.two.body}
            </p>
          </div>
        </div>
      )}

      {part === "exp" && (
        <div
          data-aos="fade-right"
          className="w-full flex flex-col justify-left items-center gap-5 p-5 bg-black-600 shadow-xl rounded-md mt-5 md:mt-5">
          <div className="flex flex-col justify-left items-start gap-1 w-full">
            <p className="font-bold  text-text2-light md:text-body2-semibold text-primary-500">
              {file.about.exp.one.title}
            </p>
            <p className="font-[400]  text-text2-light md:text-text1-bold opacity-80 ">
              {file.about.exp.one.body}
            </p>
          </div>
          <div className="flex flex-col justify-left items-start gap-1 w-full">
            <p className="font-bold  text-text2-light md:text-body2-semibold text-primary-500">
              {file.about.exp.two.title}
            </p>
            <p className="font-[400]  text-text2-light md:text-text1-bold opacity-80 ">
              {file.about.exp.two.body}
            </p>
          </div>
          <div className="flex flex-col justify-left items-start gap-1 w-full">
            <p className="font-bold  text-text2-light md:text-body2-semibold text-primary-500">
              {file.about.exp.three.title}
            </p>
            <p className="font-[400]  text-text2-light md:text-text1-bold opacity-80 ">
              {file.about.exp.three.body}
            </p>
          </div>
          <div className="flex flex-col justify-left items-start gap-1 w-full">
            <p className="font-bold  text-text2-light md:text-body2-semibold text-primary-500">
              {file.about.exp.four.title}
            </p>
            <p className="font-[400]  text-text2-light md:text-text1-bold opacity-80 ">
              {file.about.exp.four.body}
            </p>
          </div>
        </div>
      )}

      {part === "edu" && (
        <div
          data-aos="fade-right"
          className="w-full flex flex-col justify-left items-center gap-5 p-5 bg-black-600 shadow-xl rounded-md mt-5 md:mt-5">
          <div className="flex flex-col justify-left items-start gap-1 w-full">
            <p className="font-bold  text-text2-light md:text-body2-semibold text-primary-500">
              {file.about.edu.one.title}
            </p>
            <p className="font-[400]  text-text2-light md:text-text1-bold opacity-80 ">
              {file.about.edu.one.body}
            </p>
          </div>
          <div className="flex flex-col justify-left items-start gap-1 w-full">
            <p className="font-bold  text-text2-light md:text-body2-semibold text-primary-500">
              {file.about.edu.two.title}
            </p>
            <p className="font-[400]  text-text2-light md:text-text1-bold opacity-80 ">
              {file.about.edu.two.body}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
