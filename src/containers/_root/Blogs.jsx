import { Loader, NoData } from "@/components/shared";
import { LanguageContext } from "@/context/LanguageContext";
import { useGetBlogs } from "@/lib/react-query/query/blog.query";
import { Fragment, useContext } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BlogCard } from "@/components/card";
import { Link } from "react-router-dom";
export default function Blogs() {
  const {
    state: { file, lang },
  } = useContext(LanguageContext);
  const { data, isLoading } = useGetBlogs();

  return (
    <>
      <h1 className="text-white-500 font-bold">{file.nav.blogs}</h1>

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
                    {row.map((blog, index) => {
                      return (
                        <CarouselItem
                          className="basis-full md:basis-1/2 lg:basis-1/3 grow"
                          key={index}>
                          <BlogCard val={blog} index={index} />
                        </CarouselItem>
                      );
                    })}
                  </Fragment>
                );
              })}
            </CarouselContent>
            {data.pages[0]?.length >= 2 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>

          {data.pages[0]?.length > 10 && (
            <Link
              className="blogsLink p-2 px-6 rounded-lg cursor-pointer text-white-500 bg-transparent border-2 border-primary-500 border-solid transition-all duration-300 hover:bg-primary-500 hover:text-white-500"
              to={`/blogs`}>
              {file.blog.seeMore}
            </Link>
          )}
        </>
      ) : (
        <NoData />
      )}
    </>
  );
}
