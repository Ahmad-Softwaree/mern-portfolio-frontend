import { UiContext } from "@/context/UiContext";
import { CONTEXT_TYPEs } from "@/context";
import { useContext } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { Button } from "@chakra-ui/react";
import { Filter, Loader, NoData } from "@/components/shared";

import { useGetConfig } from "@/lib/react-query/query/config.query";
import { QUERY_KEYs } from "@/lib/react-query/types";
import { ENUMs } from "@/lib/enum";
import Pagination from "@/components/providers/_user/Pagination";
import Search from "@/components/shared/Search";
import ProjectGrid from "@/components/shared/ProjectGrid";

export const Projects = () => {
  const { dispatch } = useContext(UiContext);
  const { data: stacks } = useGetConfig(QUERY_KEYs.STACKS, ENUMs.STACK);
  const { data: types } = useGetConfig(QUERY_KEYs.TYPES, ENUMs.TYPE);

  return (
    <Pagination page={`project`}>
      {({
        isFetchingNextPage,
        data,
        hasNextPage,
        isLoading,
        ref,
        filterRef,
        refetch,
        isSearched,
        searchData,
        searchRefetch,
        filter,
      }) => {
        return (
          <>
            <h1 className="text-heading3-bold md:text-heading2-bold">
              Projects
            </h1>

            <Button
              onClick={() =>
                dispatch({
                  type: CONTEXT_TYPEs.PROJECT_FORM,
                  payload: {
                    type: "add",
                  },
                })
              }
              className="!flex !items-center !gap-3 !bg-primary-500 !text-white-500">
              Add Project <IoMdAddCircle />
            </Button>

            <div className="self-start flex gap-3 flex-col w-full max-w-[400px]">
              <Search />
              {stacks?.length > 0 && types?.length > 0 && (
                <Filter options={[...stacks, ...types]} />
              )}
            </div>

            {isLoading ? (
              <Loader size="xl" screen={true} />
            ) : data?.pages?.length > 0 ? (
              <div className="w-full min-w-[200px] overflow-y-hidden  grid grid-cols-1 lg:grid-cols-12 gap-10">
                {!isSearched ? (
                  <>
                    {data.pages.map((row, index) => {
                      return <ProjectGrid key={index} page={index} row={row} />;
                    })}
                  </>
                ) : (
                  <>
                    {searchData.pages.map((row, index) => {
                      return <ProjectGrid key={index} page={index} row={row} />;
                    })}
                  </>
                )}

                {!isFetchingNextPage && hasNextPage && !isSearched && (
                  <button ref={ref}>
                    <Loader />
                  </button>
                )}
              </div>
            ) : (
              <NoData />
            )}
          </>
        );
      }}
    </Pagination>
  );
};

export default Projects;
