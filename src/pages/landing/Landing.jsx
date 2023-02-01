import React, { useEffect, useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import Blogs from "./blogs/Blogs";
import Contact from "./contact/Contact";
import Home from "./home/Home";
import Projects from "./projects/Projects";
import Skills from "./skills/Skills";
import { useTranslation } from "react-i18next";
import Works from "./work/Works";
import ScrollReveal from "scrollreveal";

const Landing = ({ BACKEND_HOST }) => {
  const { t, i18n } = useTranslation();
  const [canSeeBlogs, setCanSeeBlogs] = useState(true);
  const [canSeeProjects, setCanSeeProjects] = useState(true);
  const [canSeeWorks, setCanSeeWorks] = useState(true);

  //scroll nice animation

  useEffect(() => {
    const pageString = ["home", "blogs", "skills", "projects", "works", "contact"];

    if (!canSeeBlogs) {
      const index = pageString.indexOf("blogs");
      if (index > -1) pageString.splice(index, 1);
    }

    if (!canSeeProjects) {
      const index = pageString.indexOf("projects");
      if (index > -1) pageString.splice(index, 1);
    }

    if (!canSeeWorks) {
      const index = pageString.indexOf("works");
      if (index > -1) pageString.splice(index, 1);
    }
    pageString.forEach((page, index) => {
      ScrollReveal().reveal(`.${page}`, {
        duration: 1000,
        origin: "bottom",
        distance: "20px",
        reverse: true,
        opacity: 1,
      });
    });
  }, []);

  return (
    <div className="landing w-100 p-0 m-0 flex flex-column justify-center align-center gap-2">
      <Home t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />
      {canSeeBlogs && <Blogs canSeeBlogs={canSeeBlogs} setCanSeeBlogs={setCanSeeBlogs} t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />}
      <Skills t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />
      {canSeeProjects && (
        <Projects canSeeBlogs={canSeeProjects} setCanSeeProjects={setCanSeeProjects} t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />
      )}

      {canSeeWorks && <Works setCanSeeWorks={setCanSeeWorks} canSeeWorks={canSeeWorks} t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />}

      <Contact t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />
    </div>
  );
};

export default Landing;
