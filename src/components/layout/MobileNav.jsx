import React from "react";

const MobileNav = ({ isHome, activeSection, goNav, setMobNav, mobNav, t, i18n }) => {
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

export default MobileNav;
