import { Loader, NoData } from "@/components/shared";
import { LanguageContext } from "@/context/LanguageContext";
import { useGetProjects } from "@/lib/react-query/query/project.query";
import { Fragment, useContext } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProjectCard } from "@/components/card";
import { Link } from "react-router-dom";
export default function Projects() {
  const {
    state: { file, lang },
  } = useContext(LanguageContext);
  const { data, isLoading, hasNextPage } = useGetProjects();
  return (
    <>
      <h1 className="text-white-500 font-bold">{file.nav.projects}</h1>
      {isLoading ? (
        <Loader size="xl" />
      ) : data?.pages?.some((arr) => arr.length > 0) ? (
        <>
          <Carousel
            opts={{
              align: lang === "en" ? "start" : "end",
            }}
            className="w-full carousel">
            <CarouselContent className="w-full">
              {data.pages.map((row, index) => {
                return (
                  <Fragment key={index}>
                    {row.map((project, index) => {
                      return (
                        <CarouselItem
                          className="basis-full lg:basis-1/2 grow"
                          key={index}>
                          <ProjectCard val={project} index={index} />
                        </CarouselItem>
                      );
                    })}
                  </Fragment>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <Link
            className="blogsLink p-2 px-6 rounded-lg cursor-pointer text-white-500 bg-transparent border-2 border-primary-500 border-solid transition-all duration-300 hover:bg-primary-500 hover:text-white-500"
            to={`/projects`}>
            {file.blog.seeMore}
          </Link>
        </>
      ) : (
        <NoData />
      )}
    </>
  );
}
