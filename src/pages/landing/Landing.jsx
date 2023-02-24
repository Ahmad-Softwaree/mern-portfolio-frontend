import React, { useEffect } from "react";
import Blogs from "./blogs/Blogs";
import Contact from "./contact/Contact";
import Home from "./home/Home";
import Projects from "./projects/Projects";
import Skills from "./skills/Skills";
import { useTranslation } from "react-i18next";
import Works from "./work/Works";
import ScrollReveal from "scrollreveal";
import { connect } from "react-redux";

const Landing = ({ BACKEND_HOST, works, blogs, projects }) => {
  const { t, i18n } = useTranslation();

  //scroll nice animation

  useEffect(() => {
    const pageString = ["home", "blogs", "skills", "projects", "works", "contact"];
    if (blogs.length === 0) {
      const index = pageString.indexOf("blogs");
      if (index > -1) pageString.splice(index, 1);
    }

    if (projects.length === 0) {
      const index = pageString.indexOf("projects");
      if (index > -1) pageString.splice(index, 1);
    }

    if (works.length === 0) {
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
  }, [works, blogs, projects]);

  return (
    <div className="landing w-100 p-0 m-0 flex flex-column justify-center align-center gap-2">
      <Home t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />
      {blogs.length !== 0 && <Blogs t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />}
      <Skills t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />
      {projects.length !== 0 && <Projects t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />}
      {works.length !== 0 && <Works t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />}
      <Contact t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  blogs: state.blog.blogs,
  works: state.work.works,
  projects: state.project.projects,
});

export default connect(mapStateToProps, {})(Landing);
