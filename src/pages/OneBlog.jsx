import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSingleBlogSkeleton from "../components/loading/LoadingSingleBlogSkeleton";
import SingleBlogError from "../error/SingleBlogError";
import moment from "moment";
import { getBlogsByCategory, getOneBlog } from "../context/actions/blogAction";
import { ENGLISH, KURDISH, ARABIC } from "../context/types/language_types";
import { Spinner } from "@chakra-ui/react";
import RelatedBlogCard from "../components/blogs/RelatedBlogCard";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { BlogContext } from "../context/BlogContext";
import { AlertContext } from "../context/AlertContext";
import DateMoment from "../components/global/DateMoment";
import ReturnBack from "../components/global/ReturnBack";
import ReturnHome from "../components/global/ReturnHome";

export default function OneBlog() {
  const {
    dispatch: languageDispatch,
    state: { file, language },
  } = useContext(LanguageContext);
  const {
    dispatch: blogDispatch,
    state: { blog, getOneBlogLoading, blogs, getBlogsLoading },
  } = useContext(BlogContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const { blog_id } = useParams();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (blog_id) getOneBlog(blogDispatch, alertDispatch, blog_id);
  }, [blog_id, blogDispatch]);

  useEffect(() => {
    if (blog && !getOneBlogLoading)
      getBlogsByCategory(blogDispatch, alertDispatch, blog?.categories[0]?._id);
  }, [blog, blogDispatch]);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      setScrollY(window.scrollY);
    });
    return () => window.removeEventListener("scroll", () => {});
  }, [scrollY, window]);

  return (
    <section className="!py-0 relative w-full flex flex-col justify-center items-center gap-5 min-h-screen text-white">
      {getOneBlogLoading ? (
        <LoadingSingleBlogSkeleton />
      ) : blog ? (
        <Fragment>
          <div className="absolute w-full top-0 right-0 left-0 h-[500px] md:h-[700px]">
            <img
              src={`${blog.imageURL}`}
              alt="Blog Image"
              className="absolute object-cover z-30 top-0 right-0 left-0 w-full h-[500px] md:h-[700px]"
            />
            <div className="bg-black opacity-90 z-50 absolute top-0 right-0 left-0 w-full h-[500px] md:h-[700px]"></div>{" "}
            <div className="absolute top-[100px] md:top-[200px] left-0 right-0 mx-auto flex flex-col justify-center items-center gap-[20px] md:gap-[100px] z-50">
              <h1 className="blogHeader w-full !text-[40px] md:!text-[50px] lg:!text-[60px] text-purple text-center font-bold">
                {language === "en"
                  ? blog.enTitle
                  : language === "ar"
                  ? blog.arTitle
                  : blog.krTitle}
              </h1>
              <div className="w-full flex flex-col justify-center items-center gap-3">
                <img
                  className="w-[40px] h-[40px] object-cover rounded-full"
                  src={`${blog.admin.imageURL}`}
                  alt="Blog Image"
                />
                <p className="blog_owner font-bold !text-[20px] md:!text-[36px]">
                  {file.singleBlog.name}
                </p>
                <p className="font-bold !text-[20px] md:!text-[30px]">
                  {file.singleBlog.ceo}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-[550px] md:pt-[750px] px-10 relative flex flex-col justify-end items-center gap-5 w-full pb-[100px]">
            <div
              className={`w-full flex flex-row items-center gap-5 ${
                language === "en" ? "justify-left" : "justify-right"
              }`}
            >
              <Link
                className="!text-[14px] flex flex-row justify-left items-center gap-3 border-2 border-purple border-solid transition-all duration-300 hover:bg-purple hover:text-white text-purple p-1 rounded-sm px-2"
                to={`/`}
              >
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                <span className="!text-[14px]">{file.nav.home}</span>
              </Link>
              <Link
                className="!text-[14px] flex flex-row justify-left items-center gap-3 border-2 border-purple border-solid transition-all duration-300 hover:bg-purple hover:text-white text-purple p-1 rounded-sm px-2"
                to={`/blogs `}
              >
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                <span className="!text-[14px]">{file.nav.blogs}</span>
              </Link>
            </div>

            {/* <div
              className={`w-full flex flex-row items-center gap-5 ${
                language === "en" ? "justify-left" : "justify-right"
              }`}
            >
              <span
                onClick={() => {
                  languageDispatch({
                    type: ENGLISH,
                  });
                }}
                className={`p-1 rounded-sm border-2 border-purple border-solid text-purple !text-[14px] px-2 transition-all duration-300 hover:bg-purple hover:text-white cursor-pointer ${
                  language === "en" && "bg-purple text-white"
                }`}
              >
                EN
              </span>
              <span
                onClick={() => {
                  languageDispatch({
                    type: KURDISH,
                  });
                }}
                className={`p-1 rounded-sm border-2 border-purple border-solid text-purple !text-[14px] px-2 transition-all duration-300 hover:bg-purple hover:text-white cursor-pointer ${
                  language === "kr" && "bg-purple text-white"
                }`}
              >
                KR
              </span>
              <span
                onClick={() => {
                  languageDispatch({
                    type: ARABIC,
                  });
                }}
                className={`p-1 rounded-sm border-2 border-purple border-solid text-purple !text-[14px] px-2 transition-all duration-300 hover:bg-purple hover:text-white cursor-pointer ${
                  language === "ar" && "bg-purple text-white"
                }`}
              >
                AR
              </span>
            </div> */}
            <div className="w-full flex flex-col justify-left items-start gap-5">
              <h3 className="font-bold p-1 border-b-2 border-purple border-solid">
                {file.singleBlog.categories}
              </h3>

              <div
                className={`w-full flex flex-row items-center gap-5 ${
                  language === "en" ? "justify-left" : "justify-right"
                }`}
              >
                {blog.categories?.map((category, index) => {
                  return (
                    <span key={index} className={`text-purple font-bold`}>
                      {language === "en"
                        ? category.enName
                        : language === "ar"
                        ? category.arName
                        : category.krName}
                    </span>
                  );
                })}
              </div>
            </div>

            <div
              className={`blogBody w-full ${
                language === "en" ? "karla englishDots" : "arabicDots"
              }`}
            >
              {language === "en"
                ? parse(blog.enBody)
                : language === "ar"
                ? parse(blog.arBody)
                : parse(blog.krBody)}
            </div>
            <span
              className={`flex w-full flex-row justify-left items-center gap-3 !text-[14px] ${
                language !== "en" && "justify-right"
              }`}
            >
              <i className="fa-regular fa-clock text-purple"></i>
              <DateMoment date={blog.createdAt} />
            </span>

            {scrollY > 1000 && (
              <span
                onClick={() => {
                  window.scrollTo(0, 0);
                  setScrollY(0);
                }}
                style={language === "en" ? { right: "2rem" } : { left: "2rem" }}
                className="returnUp"
              >
                <i className="fa-solid fa-angle-up"></i>
              </span>
            )}
            {getBlogsLoading ? (
              <Spinner width={`30px`} height={`30px`} />
            ) : blogs.length > 0 ? (
              <div className="w-full flex flex-col justify-left items-center gap-5 mt-[100px]">
                <h2 className="text-center !text-[22px] font-bold mt-[50px] text-purple border-b-2 border-solid border-purple pb-2">
                  {file.singleBlog.related}
                </h2>
                <div className="flex flex-row justify-center align-center w-full flex-wrap gap-5">
                  <Fragment>
                    {blogs.map((val, index) => {
                      return <RelatedBlogCard key={index} val={val} />;
                    })}
                  </Fragment>
                </div>
              </div>
            ) : null}
          </div>
        </Fragment>
      ) : (
        <SingleBlogError />
      )}
    </section>
  );
}
