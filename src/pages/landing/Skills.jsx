import React, { Fragment, useContext, useEffect } from "react";
import { Element } from "react-scroll";
import { LanguageContext } from "../../context/LanguageContext";
import { AlertContext } from "../../context/AlertContext";
import { SkillContext } from "../../context/SkillContext";
import { getAllSkills } from "../../context/actions/skillAction";
import NoData from "../../components/global/NoData";
import SkillCard from "../../components/skills/SkillCard";
import LoadingSkillSkeleton from "../../components/loading/LoadingSkillSkeleton";

export default function Skills() {
  const {
    state: { language, file },
  } = useContext(LanguageContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: skillDispatch,
    state: { skills, getSkillsLoading },
  } = useContext(SkillContext);

  useEffect(() => {
    getAllSkills(skillDispatch, alertDispatch);
  }, [skillDispatch]);
  return (
    <Element data-aos="fade-up" className="w-full bg-niceBlack" name="skills">
      <section
        id="skills"
        className={`flex flex-col justify-left items-center w-full`}
      >
        <h1 className="skillsHeader font-bold text-white">
          {file.skills.header}
        </h1>

        <div
          className={`flex flex-row justify-center items-stretch py-[30px] flex-wrap ${
            language !== "en" && "flex-row-reverse"
          }`}
        >
          {getSkillsLoading ? (
            <LoadingSkillSkeleton card={6} />
          ) : skills.length > 0 ? (
            <Fragment>
              {skills.map((val, index) => {
                return <SkillCard index={index} key={index} val={val} />;
              })}
            </Fragment>
          ) : (
            <NoData />
          )}
        </div>
      </section>
    </Element>
  );
}
