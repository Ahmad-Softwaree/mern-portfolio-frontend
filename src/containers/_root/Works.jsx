import { WorkCard } from "@/components/card";
import { Loader, NoData } from "@/components/shared";
import { LanguageContext } from "@/context/LanguageContext";
import { useGetWorks } from "@/lib/react-query/query/work.query";
import { useContext } from "react";

export default function Works() {
  const {
    state: { file, lang },
  } = useContext(LanguageContext);
  const { data, isLoading } = useGetWorks();

  return (
    <>
      <h1 className="workHeader text-white-500 font-bold">{file.nav.works}</h1>

      <div
        className={`grid grid-cols-2 md:grid-cols-12 w-full gap-2 md:gap-10  ${
          lang !== "en" && "flex-row-reverse"
        }`}>
        {isLoading ? (
          <Loader size="xl" />
        ) : data.length > 0 ? (
          <>
            {data.map((val, index) => {
              return <WorkCard index={index} key={index} val={val} />;
            })}
          </>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
