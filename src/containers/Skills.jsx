import { SkillCard } from "@/components/card";
import { skills } from "@/data/data";

export default function Skills() {
  return (
    <>
      <h1 className="skillsHeader font-bold text-white-500">Skills</h1>

      <div className="w-full flex flex-col justify-start items-start gap-2">
        <h2 className="font-bold text-white-500 text-text2-semibold md:text-body2-semibold w-full text-left">
          #General
        </h2>

        <div
          className={`flex flex-row justify-start items-stretch py-[10px] flex-wrap gap-2 w-full`}
        >
          {skills
            .filter((val) => val.types.includes("general"))
            .map((val, index) => {
              return <SkillCard index={index} key={index} val={val} />;
            })}
        </div>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-2">
        <h2 className="font-bold text-white-500 text-text2-semibold md:text-body2-semibold w-full text-left">
          #Frontend
        </h2>
        <div
          className={`flex flex-row justify-start items-stretch py-[10px] flex-wrap gap-2 w-full`}
        >
          {skills
            .filter((val) => val.types.includes("frontend"))
            .map((val, index) => {
              return <SkillCard index={index} key={index} val={val} />;
            })}
        </div>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-2">
        <h2 className="font-bold text-white-500 text-text2-semibold md:text-body2-semibold w-full text-left">
          #Backend And Storage
        </h2>
        <div
          className={`flex flex-row justify-start items-stretch py-[10px] flex-wrap gap-2 w-full`}
        >
          {skills
            .filter(
              (val) =>
                val.types.includes("backend") || val.types.includes("storage")
            )
            .map((val, index) => {
              return <SkillCard index={index} key={index} val={val} />;
            })}
        </div>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-2">
        <h2 className="font-bold text-white-500 text-text2-semibold md:text-body2-semibold w-full text-left">
          #Server And Host
        </h2>
        <div
          className={`flex flex-row justify-start items-stretch py-[10px] flex-wrap gap-2 w-full`}
        >
          {skills
            .filter(
              (val) =>
                val.types.includes("server") || val.types.includes("host")
            )
            .map((val, index) => {
              return <SkillCard index={index} key={index} val={val} />;
            })}
        </div>
      </div>
    </>
  );
}
