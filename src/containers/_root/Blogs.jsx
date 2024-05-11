import { Loader, NoData } from "@/components/shared";
import { LanguageContext } from "@/context/LanguageContext";
import { useGetBlogs } from "@/lib/react-query/query/blog.query";
import { useContext } from "react";
import { BlogCard } from "@/components/card";
export default function Blogs() {
  const {
    state: { file },
  } = useContext(LanguageContext);
  const { data, isLoading } = useGetBlogs();
  return (
    <>
      <h1 className="text-white-500 font-bold">{file.nav.blogs}</h1>
      {isLoading ? (
        <Loader size="xl" />
      ) : data?.length > 0 ? (
        <div className="w-full flex flex-row justify-center items-center gap-10 flex-wrap">
          {data.map((val, index) => {
            return <BlogCard val={val} index={index} />;
          })}
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}
