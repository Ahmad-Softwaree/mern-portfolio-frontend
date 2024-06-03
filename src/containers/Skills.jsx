import { SkillCard } from "@/components/card";
import { skills } from "@/data/data";

export default function Skills() {
  return (
    <>
      <h1 className="skillsHeader font-bold text-white-500">My Expertise</h1>

      <div className="w-full flex flex-col justify-start items-start gap-2">
        <h2 className="font-bold text-white-500 text-text2-semibold md:text-body2-semibold w-full text-left">
          #Languages
        </h2>

        <div
          className={`flex flex-row justify-start items-stretch py-[10px] flex-wrap gap-2 w-full`}
        >
          {skills
            .filter((val) => val.types.includes("language"))
            .map((val, index) => {
              return <SkillCard index={index} key={index} val={val} />;
            })}
        </div>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-2">
        <h2 className="font-bold text-white-500 text-text2-semibold md:text-body2-semibold w-full text-left">
          #Development
        </h2>
        <div
          className={`flex flex-row justify-start items-stretch py-[10px] flex-wrap gap-2 w-full`}
        >
          {skills
            .filter((val) => val.types.includes("development"))
            .map((val, index) => {
              return <SkillCard index={index} key={index} val={val} />;
            })}
        </div>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-2">
        <h2 className="font-bold text-white-500 text-text2-semibold md:text-body2-semibold w-full text-left">
          #Tools
        </h2>
        <div
          className={`flex flex-row justify-start items-stretch py-[10px] flex-wrap gap-2 w-full`}
        >
          {skills
            .filter((val) => val.types.includes("tool"))
            .map((val, index) => {
              return <SkillCard index={index} key={index} val={val} />;
            })}
        </div>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-2">
        <h2 className="font-bold text-white-500 text-text2-semibold md:text-body2-semibold w-full text-left">
          #Host, Server And Domain
        </h2>
        <div
          className={`flex flex-row justify-start items-stretch py-[10px] flex-wrap gap-2 w-full`}
        >
          {skills
            .filter(
              (val) =>
                val.types.includes("server") ||
                val.types.includes("host") ||
                val.types.includes("domain")
            )
            .map((val, index) => {
              return <SkillCard index={index} key={index} val={val} />;
            })}
        </div>
      </div>
    </>
  );
}
