import { SkillCard } from "@/components/card";
import { Loader, NoData } from "@/components/shared";
import { LanguageContext } from "@/context/LanguageContext";
import { useGetSkills } from "@/lib/react-query/query/skill.query";
import { useContext } from "react";

export default function Skills() {
  const { data, isLoading } = useGetSkills();
  const {
    state: { lang, file },
  } = useContext(LanguageContext);

  return (
    <>
      <h1 className="skillsHeader font-bold text-white-500">
        {file.skills.header}
      </h1>

      <div
        className={`flex flex-row justify-center items-stretch py-[30px] flex-wrap gap-2 ${
          lang !== "en" && "flex-row-reverse"
        }`}>
        {isLoading ? (
          <Loader size="xl" />
        ) : data.length > 0 ? (
          <>
            {data.map((val, index) => {
              return <SkillCard index={index} key={index} val={val} />;
            })}
          </>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
