import Pagination from "@/components/providers/_user/Pagination";
import { Loader, NoData, Return } from "@/components/shared";
import CertificateGrid from "@/components/shared/CertificateGrid";
import ProjectGrid from "@/components/shared/ProjectGrid";
import Search from "@/components/shared/Search";
import { LanguageContext } from "@/context/LanguageContext";
import { useContext } from "react";

export default function Certificates() {
  const {
    state: { file },
  } = useContext(LanguageContext);
  return (
    <section className="element min-h-screen !justify-start">
      <div className="flex flex-row justify-between items-center w-full flex-wrap gap-5">
        <h1 className="text-white-500 font-bold">{file.nav.certificates}</h1>
        <Search />
      </div>

      <Pagination page={`certificate`}>
        {({
          isFetchingNextPage,
          data,
          hasNextPage,
          isLoading,
          ref,

          isSearched,
          searchData,
          searchLoading,
        }) => {
          if (
            isSearched &&
            !searchLoading &&
            searchData?.pages?.every((arr) => arr.length === 0)
          ) {
            return <NoData />;
          }
          return (
            <>
              {isLoading || searchLoading ? (
                <Loader size="xl" screen={true} />
              ) : data?.pages?.some((arr) => arr.length > 0) ? (
                <div className="w-full flex flex-col justify-center items-start gap-10">
                  {!isSearched ? (
                    <>
                      {data.pages.map((row, index) => {
                        return (
                          <CertificateGrid key={index} page={index} row={row} />
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {searchData.pages.map((row, index) => {
                        return (
                          <CertificateGrid key={index} page={index} row={row} />
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
