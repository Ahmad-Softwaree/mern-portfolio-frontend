import { UiContext } from "@/context/UiContext";
import { CONTEXT_TYPEs } from "@/context";
import { useContext } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { Button } from "@chakra-ui/react";
import { useGetSkills } from "@/lib/react-query/query/skill.query";
import { Loader, NoData } from "@/components/shared";
import { SkillCard } from "@/components/card";
export const Skills = () => {
  const { dispatch } = useContext(UiContext);
  const { data, isLoading } = useGetSkills();
  return (
    <div className="w-full flex flex-col justify-left items-center gap-10">
      <h1 className="text-heading3-bold md:text-heading2-bold">Skills</h1>

      <Button
        onClick={() =>
          dispatch({
            type: CONTEXT_TYPEs.SKILL_FORM,
            payload: {
              type: "add",
            },
          })
        }
        className="!flex !items-center !gap-3 !bg-primary-500 !text-white-500">
        Add Skill <IoMdAddCircle />
      </Button>

      {isLoading ? (
        <Loader color="black" screen={true} size="xl" />
      ) : data?.length > 0 ? (
        <div className="w-full flex flex-row justify-center items-stretch py-[30px] flex-wrap gap-2">
          {data?.map((val, index) => {
            return <SkillCard key={index} val={val} />;
          })}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default Skills;
