import { Loader } from "@/components/shared";
import { LanguageContext } from "@/context/LanguageContext";
import {
  useGetBlog,
  useGetRelatedBlogs,
} from "@/lib/react-query/query/blog.query";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { convertTimeStampToMomentMonth } from "@/lib/functions";
import { BlogCard, RelatedBlogCard } from "@/components/card";
export default function Blog() {
  const { id } = useParams();
  const {
    state: { file, lang },
  } = useContext(LanguageContext);
  const { data, isLoading } = useGetBlog(id);
  const { data: related, isLoading: relatedLoading } = useGetRelatedBlogs(
    data?.categories[0]?._id,
    data?._id
  );
  return (
    <section className="!p-0 !pt-10 relative w-full min-h-screen text-white-500 grid grid-cols-1">
      {isLoading ? (
        <Loader size="xl" screen={true} />
      ) : (
        <div className="!py-20 md:mx-20 lg:mx-50 px-10 bg-black-600 col-span-full h-full">
          <div className="flex flex-col justify-start items-start gap-10 z-50">
            <h1 className="w-full text-heading3-bold md:text-heading2-bold lg:text-heading2-bold text-white-500 text-left !font-[700]">
              {lang === "en"
                ? data.enTitle
                : lang === "ar"
                ? data.arTitle
                : data.krTitle}
            </h1>
            <div className="w-full flex flex-row justify-left items-center gap-3">
              <img
                className="w-[40px] h-[40px] object-cover rounded-full"
                src={`${data.user.imageURL}`}
                alt="Blog Image"
              />
              <div className="flex flex-col justify-center items-start">
                <div className="flex flex-row justify-between items-center gap-2">
                  <p className="text-text1-semibold ">{data.user.name}</p>
                  <span className="pb-1">.</span>
                  <p className="text-text2-semibold ">{data.user.bio}</p>
                </div>
                <span className="opacity-70 cursor-pointer transition-all duration-200 hover:opacity-100 text-white-500">
                  {convertTimeStampToMomentMonth(data.date)}
                </span>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col justify-end items-center gap-5 w-full my-10">
            <div className={`w-full`}>
              {lang === "en"
                ? parse(data.enBody)
                : lang === "ar"
                ? parse(data.arBody)
                : parse(data.krBody)}
            </div>

            <div
              className={`w-full flex flex-row items-center gap-5 mt-20 ${
                lang === "en" ? "justify-left" : "justify-right"
              }`}>
              {data.categories?.map((category, index) => {
                return (
                  <Link
                    to={`/blogs?category=${category._id}`}
                    key={index}
                    className={`text-white-500 opacity-70 border-black-300 border-solid border-2 p-2 rounded-[20px] hover:bg-black-300 hover:opacity-100 transition-all duration-200   px-4 cursor-pointer`}>
                    {lang === "en"
                      ? category.enName
                      : lang === "ar"
                      ? category.arName
                      : category.krName}
                  </Link>
                );
              })}
            </div>
            {relatedLoading ? (
              <Loader />
            ) : related.length > 0 ? (
              <div className="w-full flex flex-col justify-left items-center gap-5 mt-[100px]">
                <h2 className="text-center !text-[22px] font-bold mt-[50px] text-primary-500 border-b-2 border-solid border-primary-500 pb-2">
                  {file.singleBlog.related}
                </h2>
                <div className="flex flex-row justify-center align-center w-full flex-wrap gap-5">
                  <>
                    {related.map((val, index) => {
                      return <BlogCard index={index} key={index} val={val} />;
                    })}
                  </>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}
