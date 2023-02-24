import React from "react";
import { connect } from "react-redux";

const MobileNav = ({ activeSection, goNav, mobNav, t, blogs, works, projects }) => {
  return (
    <nav className={`${mobNav ? "mobileNav mobNavAnim" : "mobileNav"}`}>
      <ul className="flex flex-column justify-center align-center gap-2 w-100">
        <li className="navItem">
          <span
            onClick={() => {
              goNav("home");
            }}
            className={`${activeSection === "home" && "activeNav"}`}
          >
            {t("nav.home")}
          </span>
        </li>
        {blogs.length !== 0 && (
          <li className="navItem">
            <span
              onClick={() => {
                goNav("blogs");
              }}
              className={`${activeSection === "blogs" && "activeNav"}`}
            >
              {t("nav.blogs")}
            </span>
          </li>
        )}

        <li className="navItem">
          <span
            onClick={() => {
              goNav("skills");
            }}
            className={`${activeSection === "skills" && "activeNav"}`}
          >
            {t("nav.skills")}
          </span>
        </li>
        {projects.length !== 0 && (
          <li className="navItem">
            <span
              onClick={() => {
                goNav("projects");
              }}
              className={`${activeSection === "projects" && "activeNav"}`}
            >
              {t("nav.projects")}
            </span>
          </li>
        )}

        {works.length !== 0 && (
          <li className="navItem">
            <span
              onClick={() => {
                goNav("works");
              }}
              className={`${activeSection === "works" && "activeNav"}`}
            >
              {t("nav.works")}
            </span>
          </li>
        )}

        <li className="navItem">
          <span
            onClick={() => {
              goNav("contact");
            }}
            className={`${activeSection === "contact" && "activeNav"}`}
          >
            {t("nav.contact")}
          </span>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  blogs: state.blog.blogs,
  projects: state.project.projects,
  works: state.work.works,
});

export default connect(mapStateToProps, {})(MobileNav);
