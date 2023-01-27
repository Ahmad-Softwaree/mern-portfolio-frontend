import React, { useEffect } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import Blogs from "./blogs/Blogs";
import Contact from "./contact/Contact";
import Home from "./home/Home";
import Projects from "./projects/Projects";
import Skills from "./skills/Skills";
import { useTranslation } from "react-i18next";

const Landing = ({ BACKEND_HOST }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="landing w-100 p-0 m-0 flex flex-column justify-center align-center gap-2">
      <Home t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />
      <Blogs t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />
      <Skills t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />
      <Projects t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />
      <Contact t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />
    </div>
  );
};

export default Landing;
