import React from "react";
import { Element } from "react-scroll";

const Skills = ({ file, language }) => {
  return (
    <Element className="w-100" name="skills">
      <section id="skills" className="skills flex flex-column justify-center align-center w-100">
        <h1 className="heading">{file.nav.skills}</h1>
        <div className="skillsBox flex flex-column justify-left align-start gap-2">
          <div className="skillGroup flex flex-column justify-left align-center w-100 gap-3">
            <h2>{file.skills.languages}</h2>
            <div className="skillIcons flex flex-row justify-center align-center w-100 flex-wrap gap-5">
              <div className="showSkillNameDiv java">
                <img src="/images/icons/java.svg" alt="" />
              </div>
              <div className="showSkillNameDiv python">
                <img src="/images/icons/python.svg" alt="" />
              </div>
              <div className="showSkillNameDiv c">
                <img src="/images/icons/c.svg" alt="" />
              </div>
            </div>
          </div>
          <div className="littleBreak"></div>

          {/* web dev */}
          <h1>{file.skills.webDev}</h1>
          <div className="skillGroup flex flex-column justify-left align-center w-100 gap-2">
            <h2>{file.skills.front}</h2>
            <div className="skillIcons flex flex-row justify-center align-center w-100 flex-wrap gap-5">
              <div className="showSkillNameDiv html">
                <img src="/images/icons/html.svg" alt="" />
              </div>
              <div className="showSkillNameDiv css">
                <img src="/images/icons/css3.svg" alt="" />
              </div>
              <div className="showSkillNameDiv sass">
                <img src="/images/icons/sass.svg" alt="" />
              </div>
              <div className="showSkillNameDiv bootstrap">
                <img src="/images/icons/bootstrap.svg" alt="" />
              </div>
              <div className="showSkillNameDiv tailwind">
                {" "}
                <img src="/images/icons/tailwind.svg" alt="" />
              </div>
              <div className="showSkillNameDiv javascript">
                <img src="/images/icons/javascript.svg" alt="" />
              </div>
              <div className="showSkillNameDiv typescript">
                <img src="/images/icons/typescript.svg" alt="" />
              </div>

              <div className="showSkillNameDiv react">
                <img src="/images/icons/react.svg" alt="" />
              </div>

              <div className="showSkillNameDiv redux">
                <img src="/images/icons/redux.svg" alt="" />
              </div>
              <div className="showSkillNameDiv next">
                <img src="/images/icons/next-js.png" alt="" />
              </div>
            </div>
          </div>

          <div className="littleBreak"></div>

          {/* backend */}

          <div className="skillGroup flex flex-column justify-left align-center w-100 gap-2">
            <h2>{file.skills.back}</h2>
            <div className="skillIcons flex flex-row justify-center align-center w-100 flex-wrap gap-5">
              <div className="showSkillNameDiv node">
                <img src="/images/icons/nodejs.svg" alt="" />
              </div>
              <div className="showSkillNameDiv express">
                <img src="/images/icons/express.svg" alt="" />
              </div>
              <div className="showSkillNameDiv npm">
                <img src="/images/icons/npm.svg" alt="" />
              </div>
              <div className="showSkillNameDiv mysql">
                {" "}
                <img src="/images/icons/mysql.svg" alt="" />
              </div>
              <div className="showSkillNameDiv mongodb">
                {" "}
                <img src="/images/icons/mongodb.svg" alt="" />
              </div>
              <div className="showSkillNameDiv firebase">
                <img src="/images/icons/firebase.svg" alt="" />
              </div>
              <div className="showSkillNameDiv socket">
                <img src="/images/icons/socketio.svg" alt="" />
              </div>
              <div className="showSkillNameDiv postman">
                <img src="/images/icons/postman.svg" alt="" />
              </div>
            </div>
          </div>

          <div className="littleBreak"></div>

          {/* languages */}

          <h1>{file.skills.gameDev}</h1>

          {/* game dev */}

          <div className="skillGroup flex flex-column justify-left align-center w-100 gap-2">
            <h2>{file.skills.twoDGame}</h2>
            <div className="skillIcons flex flex-row justify-center align-center w-100 flex-wrap gap-5">
              <div className="showSkillNameDiv unity">
                <img src="/images/icons/unity.svg" alt="" />
              </div>
              <div className="showSkillNameDiv c">
                <img src="/images/icons/c.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Skills;
