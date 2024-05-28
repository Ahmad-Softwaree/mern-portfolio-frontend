import { Loader, NoData } from "@/components/shared";
import { LanguageContext } from "@/context/LanguageContext";
import { useGetProjects } from "@/lib/react-query/query/project.query";
import { useContext } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
export default function Projects() {
  const {
    state: { file, lang },
  } = useContext(LanguageContext);
  const { data, isLoading } = useGetProjects();
  return (
    <>
      <h1 className="text-white-500 font-bold">{file.nav.projects}</h1>
      {isLoading ? (
        <Loader size="xl" />
      ) : data?.length > 0 ? (
        <div className="max-w-20xl mx-auto">
          <HoverEffect items={data} />
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}
