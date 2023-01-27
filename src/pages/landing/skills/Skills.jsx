import React from "react";
import { Element } from "react-scroll";

const Skills = ({ BACKEND_HOST, t, i18n }) => {
  return (
    <Element className="w-100" name="skills">
      <section id="skills" className="skills flex flex-column justify-center align-center w-100">
        <h1 className="heading">{t("nav.skills")}</h1>
        <div className="skillsBox flex flex-column justify-left align-start gap-2">
          <div className="skillGroup flex flex-column justify-left align-center w-100 gap-3">
            <h2>{t("skills.languages")}</h2>
            <div className="skillIcons flex flex-row justify-center align-center w-100 flex-wrap gap-5">
              <img src="/images/icons/java.svg" alt="" />
              <img src="/images/icons/python.svg" alt="" />
              <img src="/images/icons/c.svg" alt="" />
            </div>
          </div>
          <div className="littleBreak"></div>

          {/* web dev */}
          <h1>{t("skills.webDev")}</h1>
          <div className="skillGroup flex flex-column justify-left align-center w-100 gap-2">
            <h2>{t("skills.front")}</h2>
            <div className="skillIcons flex flex-row justify-center align-center w-100 flex-wrap gap-5">
              <img src="/images/icons/html.svg" alt="" />
              <img src="/images/icons/css3.svg" alt="" />
              <img src="/images/icons/sass.svg" alt="" />
              <img src="/images/icons/bootstrap.svg" alt="" />
              <img src="/images/icons/tailwind.svg" alt="" />
              <img src="/images/icons/javascript.svg" alt="" />
              <img src="/images/icons/typescript.svg" alt="" />

              <img src="/images/icons/react.svg" alt="" />
              <img src="/images/icons/next-js.png" alt="" />
            </div>
          </div>

          <div className="littleBreak"></div>

          {/* backend */}

          <div className="skillGroup flex flex-column justify-left align-center w-100 gap-2">
            <h2>{t("skills.back")}</h2>
            <div className="skillIcons flex flex-row justify-center align-center w-100 flex-wrap gap-5">
              <img src="/images/icons/nodejs.svg" alt="" />
              <img src="/images/icons/express.svg" alt="" />
              <img src="/images/icons/npm.svg" alt="" />
              <img src="/images/icons/mysql.svg" alt="" />
              <img src="/images/icons/mongodb.svg" alt="" />
              <img src="/images/icons/firebase.svg" alt="" />

              <img src="/images/icons/postman.svg" alt="" />
            </div>
          </div>

          <div className="littleBreak"></div>

          {/* languages */}

          <h1>{t("skills.gameDev")}</h1>

          {/* game dev */}

          <div className="skillGroup flex flex-column justify-left align-center w-100 gap-2">
            <h2>{t("skills.twoDGame")}</h2>
            <div className="skillIcons flex flex-row justify-center align-center w-100 flex-wrap gap-5">
              <img src="/images/icons/unity.svg" alt="" />
              <img src="/images/icons/c.svg" alt="" />
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Skills;
