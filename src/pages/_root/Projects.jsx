import Pagination from "@/components/providers/_user/Pagination";
import { Loader, NoData, Return } from "@/components/shared";
import ProjectGrid from "@/components/shared/ProjectGrid";
import Search from "@/components/shared/Search";
import { LanguageContext } from "@/context/LanguageContext";
import { useContext } from "react";

export default function Projects() {
  const {
    state: { file },
  } = useContext(LanguageContext);
  return (
    <section className="element min-h-screen">
      <div className="flex flex-row justify-between items-center w-full flex-wrap gap-5">
        <h1 className="text-white-500 font-bold">{file.nav.projects}</h1>
        <Search />
      </div>

      <Pagination page={`project`}>
        {({
          isFetchingNextPage,
          data,
          hasNextPage,
          isLoading,
          ref,

          isSearched,
          searchData,
        }) => {
          return (
            <>
              {isLoading ? (
                <Loader size="xl" screen={true} />
              ) : data?.pages?.length > 0 ? (
                <div className="w-full flex flex-row justify-center items-start gap-10 md:gap-20 flex-wrap">
                  {!isSearched ? (
                    <>
                      {data.pages.map((row, index) => {
                        return (
                          <ProjectGrid key={index} page={index} row={row} />
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {searchData.pages.map((row, index) => {
                        return (
                          <ProjectGrid key={index} page={index} row={row} />
                        );
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
    </section>
  );
}
