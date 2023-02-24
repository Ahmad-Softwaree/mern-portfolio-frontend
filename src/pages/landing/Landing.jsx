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
import { getBlogs } from "../../actions/blog";
import { getProjects } from "../../actions/project";
import { getWorks } from "../../actions/work";
const Landing = ({ BACKEND_HOST, work, blog, project, getBlogs, getWorks, getProjects }) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getBlogs();
    getWorks();
    getProjects();
  }, []);

  //scroll nice animation

  useEffect(() => {
    const pageString = ["home", "blogs", "skills", "projects", "works", "contact"];
    if (blog.blogs.length === 0) {
      const index = pageString.indexOf("blogs");
      if (index > -1) pageString.splice(index, 1);
    }

    if (project.projects.length === 0) {
      const index = pageString.indexOf("projects");
      if (index > -1) pageString.splice(index, 1);
    }

    if (work.works.length === 0) {
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
  }, [work, blog, project]);

  return (
    <div className="landing w-100 p-0 m-0 flex flex-column justify-center align-center gap-2">
      <Home t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />
      {blog.blogs.length !== 0 || blog.loading ? <Blogs t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} /> : null}
      <Skills t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />
      {project.projects.length !== 0 || project.loading ? <Projects t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} /> : null}
      {work.works.length !== 0 || work.loading ? <Works t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} /> : null}
      <Contact t={t} i18n={i18n} BACKEND_HOST={BACKEND_HOST} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  blog: state.blog,
  work: state.work,
  project: state.project,
});

export default connect(mapStateToProps, {
  getBlogs,
  getWorks,
  getProjects,
})(Landing);
