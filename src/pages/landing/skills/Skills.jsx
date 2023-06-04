import React, { useState, useEffect, useRef } from "react";
import { Element } from "react-scroll";

const Skills = ({ file, language }) => {
  const categories = ["lang", "front", "back", "game"];
  const [active, setActive] = useState("lang");
  const [right, setRight] = useState(1);
  const [left, setLeft] = useState(1);

  useEffect(() => {
    const skillBox = document.querySelector(".skillsBox");
    const activeBox = document.querySelector(".activeSkillGroup");
    setTimeout(() => {
      skillBox.style.height = activeBox.offsetHeight + 100 + "px";
    }, 200);
  }, [active]);

  const forward = () => {
    const skillBox = document.querySelector(".skillsBox");

    if (categories.findIndex((one) => one === active) < categories.length - 1) {
      setActive(categories[categories.findIndex((one) => one === active) + 1]);
      setTimeout(() => {
        skillBox.scrollTo((skillBox.offsetWidth - 60) * right, 0);
      }, 100);
      setLeft((prev) => prev - 1);
      setRight((prev) => prev + 1);
    }
  };
  const backward = () => {
    const skillBox = document.querySelector(".skillsBox");

    if (categories.findIndex((one) => one === active) > 0) {
      setActive(categories[categories.findIndex((one) => one === active) - 1]);
      setTimeout(() => {
        skillBox.scrollTo(-((skillBox.offsetWidth - 60) * left), 0);
      }, 100);
      setRight((prev) => prev - 1);
      setLeft((prev) => prev + 1);
    }
  };

  return (
    <Element className="w-100" name="skills">
      <section id="skills" className={`skills flex flex-column justify-left align-center w-100`}>
        <div className={`flex flex-row justify-center algin-center gap-2 w-100 ${language !== "en" && "flex-row-reverse"}`}>
          <span onClick={() => backward()} className={`angle flex flex-row justify-center align-center ${left !== 1 && "activeAngle"}`}>
            <i className={`fa-solid fa-angle-left`}></i>{" "}
          </span>
          <h1 className="heading">{file.nav.skills}</h1>
          <span
            onClick={() => forward()}
            className={`angle flex flex-row justify-center align-center ${right !== categories.length && "activeAngle"}`}
          >
            <i className={`fa-solid fa-angle-right`}></i>
          </span>
        </div>

        <div className={`skillsBox flex flex-row justify-left align-start  ${language !== "en" && "flex-row-reverse"}`}>
          <div className={`skillGroup flex flex-column justify-left align-center w-100 gap-2 ${active === "lang" && "activeSkillGroup"}`}>
            <h2>{file.skills.languages}</h2>
            <div className="skillIcons flex flex-row justify-center align-center w-100 flex-wrap gap-5">
              <div className="showSkillNameDiv java">
                <img src="/images/icons/java.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv python">
                <img src="/images/icons/python.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv c">
                <img src="/images/icons/c.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv javascript">
                <img src="/images/icons/javascript.svg" alt="Icon Image" />
              </div>
            </div>
          </div>

          <div className={`skillGroup flex flex-column justify-left align-center w-100 gap-2 ${active === "front" && "activeSkillGroup"}`}>
            <h2>{file.skills.front}</h2>
            <div className="skillIcons flex flex-row justify-center align-center w-100 flex-wrap gap-5">
              <div className="showSkillNameDiv html">
                <img src="/images/icons/html.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv css">
                <img src="/images/icons/css3.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv sass">
                <img src="/images/icons/sass.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv bootstrap">
                <img src="/images/icons/bootstrap.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv tailwind">
                {" "}
                <img src="/images/icons/tailwind.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv javascript">
                <img src="/images/icons/javascript.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv typescript">
                <img src="/images/icons/typescript.svg" alt="Icon Image" />
              </div>

              <div className="showSkillNameDiv react">
                <img src="/images/icons/react.svg" alt="Icon Image" />
              </div>

              <div className="showSkillNameDiv redux">
                <img src="/images/icons/redux.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv next">
                <img src="/images/icons/next-js.png" alt="Icon Image" />
              </div>
            </div>
          </div>

          <div className={`skillGroup flex flex-column justify-left align-center w-100 gap-2 ${active === "back" && "activeSkillGroup"}`}>
            <h2>{file.skills.back}</h2>
            <div className="skillIcons flex flex-row justify-center align-center w-100 flex-wrap gap-5">
              <div className="showSkillNameDiv node">
                <img src="/images/icons/nodejs.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv express">
                <img src="/images/icons/express.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv npm">
                <img src="/images/icons/npm.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv mysql">
                <img src="/images/icons/mysql.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv mongodb">
                <img src="/images/icons/mongodb.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv firebase">
                <img src="/images/icons/firebase.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv socket">
                <img src="/images/icons/socketio.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv postman">
                <img src="/images/icons/postman.svg" alt="Icon Image" />
              </div>
            </div>
          </div>

          <div className={`skillGroup flex flex-column justify-left align-center w-100 gap-2 ${active === "game" && "activeSkillGroup"}`}>
            <h2>{file.skills.twoDGame}</h2>
            <div className="skillIcons flex flex-row justify-center align-center w-100 flex-wrap gap-5">
              <div className="showSkillNameDiv unity">
                <img src="/images/icons/unity.svg" alt="Icon Image" />
              </div>
              <div className="showSkillNameDiv c">
                <img src="/images/icons/c.svg" alt="Icon Image" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Skills;
