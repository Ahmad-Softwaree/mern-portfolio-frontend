import { UiContext } from "@/context/UiContext";
import { CONTEXT_TYPEs } from "@/context";
import { useContext } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { Button } from "@chakra-ui/react";
import { useGetWorks } from "@/lib/react-query/query/work.query";
import { Loader, NoData } from "@/components/shared";
import { WorkCard } from "@/components/card";
export const Works = () => {
  const { dispatch } = useContext(UiContext);
  const { data, isLoading } = useGetWorks();
  return (
    <div className="w-full flex flex-col justify-left items-center gap-10">
      <h1 className="text-heading3-bold md:text-heading2-bold">Works</h1>

      <Button
        onClick={() =>
          dispatch({
            type: CONTEXT_TYPEs.WORK_FORM,
            payload: {
              type: "add",
            },
          })
        }
        className="!flex !items-center !gap-3 !bg-primary-500 !text-white-500">
        Add Work <IoMdAddCircle />
      </Button>

      {isLoading ? (
        <Loader color="black" screen={true} size="xl" />
      ) : data?.length > 0 ? (
        <div className="w-full min-w-[200px] overflow-y-hidden  grid grid-cols-1 lg:grid-cols-12 gap-10">
          {data?.map((val, index) => {
            return <WorkCard key={index} val={val} />;
          })}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default Works;
