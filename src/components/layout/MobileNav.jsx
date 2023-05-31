import React from "react";
import { connect } from "react-redux";

const MobileNav = ({
  activeSection,
  goNav,
  mobNav,
  blog: { blogs, blogLoading },
  work: { works, workLoading },
  project: { projects, projectLoading },
  language: { file, language },
}) => {
  return (
    <nav className={`mobileNav ${mobNav ? "show" : "hide"}`}>
      <ul className="flex flex-column justify-center align-center w-100">
        <li className="navItem">
          <span onClick={() => goNav("home")} className={`${activeSection === "home" && "activeNav"}`}>
            {file.nav.home}
          </span>
        </li>
        {blogs.length > 0 && !blogLoading ? (
          <li className="navItem">
            <span onClick={() => goNav("blogs")} className={`${activeSection === "blogs" && "activeNav"}`}>
              {file.nav.blogs}
            </span>
          </li>
        ) : blogs.length === 0 && blogLoading ? (
          <li className="navItem animatedNavItem">{file.nav.blogs}</li>
        ) : null}

        <li className="navItem">
          <span onClick={() => goNav("skills")} className={`${activeSection === "skills" && "activeNav"}`}>
            {file.nav.skills}
          </span>
        </li>
        {projects.length > 0 && !projectLoading ? (
          <li className="navItem">
            <span onClick={() => goNav("projects")} className={`${activeSection === "projects" && "activeNav"}`}>
              {file.nav.projects}
            </span>
          </li>
        ) : projects.length === 0 && projectLoading ? (
          <li className="navItem animatedNavItem">{file.nav.projects}</li>
        ) : null}

        {works.length > 0 && !workLoading ? (
          <li className="navItem">
            <span onClick={() => goNav("works")} className={`${activeSection === "works" && "activeNav"}`}>
              {file.nav.works}
            </span>
          </li>
        ) : works.length === 0 && workLoading ? (
          <li className="navItem animatedNavItem">{file.nav.works}</li>
        ) : null}

        <li className="navItem">
          <span onClick={() => goNav("contact")} className={`${activeSection === "contact" && "activeNav"}`}>
            {file.nav.contact}
          </span>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  blog: state.blog,
  project: state.project,
  work: state.work,
  language: state.language,
});

export default connect(mapStateToProps, {})(MobileNav);
