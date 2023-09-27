import React, { useState, useEffect, useContext, Fragment } from "react";
import LoadingBlogSkeleton from "../components/loading/LoadingBlogSkeleton";
import { getAllBlogs } from "../context/actions/blogAction";
import BlogCard from "../components/blogs/BlogCard";
import { AlertContext } from "../context/AlertContext";
import { BlogContext } from "../context/BlogContext";
import { LanguageContext } from "../context/LanguageContext";
import Opacity from "../components/Opacity";
import SearchBox from "../components/global/SearchBox";
import NoData from "../components/global/NoData";
import RefreshData from "../components/global/RefreshData";
export default function BlogsPage() {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: blogDispatch,
    state: { blogs, getBlogsLoading },
  } = useContext(BlogContext);
  const {
    state: { file, language },
  } = useContext(LanguageContext);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    getAllBlogs(blogDispatch, alertDispatch);
  }, [blogDispatch]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.classList.contains("searchBox")) {
        setSearch(false);
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        setSearch(false);
      }
    });

    return () => {
      window.removeEventListener("click", () => {});
      window.removeEventListener("keydown", () => {});
    };
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col justify-left items-center gap-10">
      {search && <Opacity />}
      {search && <SearchBox method={`blog`} setSearch={setSearch} />}
      <div className="flex flex-row justify-between items-center w-full px-5 md:px-10">
        <h1 className="text-white font-bold">{file.nav.blogs}</h1>
        <div
          onClick={() => setSearch(true)}
          className="searchBox w-[200px] md:w-[300px] p-2 px-4 bg-lightBlack text-white rounded-md flex flex-row justify-left items-center gap-2 border-2 border-solid border-lightBlack transition-all duration-300 hover:border-purple cursor-pointer hover:text-purple"
        >
          <span className="!text-[14px] searchBox">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <span className="!text-[14px] searchBox">click to search</span>
        </div>
      </div>

      <div className="allBlogs flex flex-row justify-center align-center gap-3 w-full flex-wrap">
        {getBlogsLoading ? (
          <LoadingBlogSkeleton card={3} />
        ) : blogs.length > 0 ? (
          <Fragment>
            {blogs?.map((val, index) => {
              return <BlogCard key={index} val={val} />;
            })}
          </Fragment>
        ) : (
          <div className="w-full flex flex-col justify-center items-center gap-5">
            <NoData />
            <RefreshData
              setter={() => getAllBlogs(blogDispatch, alertDispatch)}
            />
          </div>
        )}
      </div>
    </section>
  );
}
