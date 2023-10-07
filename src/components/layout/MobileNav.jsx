import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
export default function MobileNav({ mobNav, activeSection, setMobNav, goNav }) {
  const {
    state: { file, language },
  } = useContext(LanguageContext);

  return (
    <nav
      className={`flex-col justify-left  items-start  flex xl:hidden fixed  h-full w-fit transition-all duration-300 bg-black text-white z-[999] pt-[50px] py-[100px] ${
        mobNav
          ? `${language === "en" ? "left-0" : "right-0"}`
          : `${language === "en" ? "left-[-300px]" : "right-[-300px]"}`
      }`}
    >
      <span
        className="text-[22px] p-3 cursor-pointer transition-all duration-200 hover:text-purple w-full text-center"
        onClick={() => setMobNav(false)}
      >
        <i className="fa-solid fa-angles-left"></i>{" "}
      </span>
      <li
        onClick={() => goNav("home")}
        className={`${activeSection === "home" && "border-purple text-purple"}`}
      >
        <span>{file.nav.home}</span>
      </li>

      <li
        onClick={() => goNav("blogs")}
        className={`${
          activeSection === "blogs" && "border-purple text-purple"
        }`}
      >
        <span>{file.nav.blogs}</span>
      </li>
      <li
        onClick={() => goNav("about")}
        className={`${
          activeSection === "about" && "border-purple text-purple"
        }`}
      >
        <span>{file.nav.about}</span>
      </li>
      <li
        onClick={() => goNav("services")}
        className={`${
          activeSection === "services" && "border-purple text-purple"
        }`}
      >
        <span>{file.nav.services}</span>
      </li>

      <li
        onClick={() => goNav("skills")}
        className={`${
          activeSection === "skills" && "border-purple text-purple"
        }`}
      >
        <span>{file.nav.skills}</span>
      </li>

      <li
        onClick={() => goNav("projects")}
        className={`${
          activeSection === "projects" && "border-purple text-purple"
        }`}
      >
        <span>{file.nav.projects}</span>
      </li>
      <li
        onClick={() => goNav("certificate")}
        className={`${
          activeSection === "certificate" && "border-purple text-purple"
        }`}
      >
        <span>{file.nav.certificate}</span>
      </li>
      <li
        onClick={() => goNav("works")}
        className={`${
          activeSection === "works" && "border-purple text-purple"
        }`}
      >
        <span>{file.nav.works}</span>
      </li>

      <li
        onClick={() => goNav("contact")}
        className={`${
          activeSection === "contact" && "border-purple text-purple"
        }`}
      >
        <span>{file.nav.contact}</span>
      </li>
    </nav>
  );
}
