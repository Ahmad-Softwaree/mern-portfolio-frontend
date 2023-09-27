import React, { Fragment, useContext, useEffect, useState } from "react";
import BlogCard from "../../components/blogs/BlogCard";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import LoadingBlogSkeleton from "../../components/loading/LoadingBlogSkeleton";
import { getHomeBlogs } from "../../context/actions/blogAction";
import useSize from "../../hooks/useSize";
import { LanguageContext } from "../../context/LanguageContext";
import { BlogContext } from "../../context/BlogContext";
import { AlertContext } from "../../context/AlertContext";
import NoData from "../../components/global/NoData";
export default function Blogs() {
  const {
    state: { file },
  } = useContext(LanguageContext);
  const {
    dispatch: blogDispatch,
    state: { blogs, getBlogsLoading },
  } = useContext(BlogContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);

  const [number, setNumber] = useState(1);
  const [fill, setFill] = useState(
    new Array(blogs?.length).fill(null).map((v, i) => i)
  );
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (useSize({ sm: 850, md: 1200, lg: 1500 }) === "xl") setNumber(4);
    if (useSize({ sm: 850, md: 1200, lg: 1500 }) === "lg") setNumber(3);
    if (useSize({ sm: 850, md: 1200, lg: 1500 }) === "md") setNumber(2);
    if (useSize({ sm: 850, md: 1200, lg: 1500 }) === "sm") setNumber(1);
  }, []);

  useEffect(() => {
    getHomeBlogs(blogDispatch, alertDispatch);
  }, [blogDispatch]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      let blogs = document.querySelector(".blogs")?.clientWidth;
      let blogWidths =
        document.querySelector(".blogCard")?.clientWidth *
        document.querySelectorAll(".blogCard")?.length;
      if (blogWidths > blogs - 130)
        setNumber((prev) => (prev === 1 ? 1 : prev - 1));
      else if (blogWidths === blogs - 500) setNumber((prev) => prev + 1);
    });

    if (page > fill.length - 1) setPage(0);

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [window.innerWidth, page, fill]);

  useEffect(() => {
    if (blogs?.length > number) {
      setFill(
        new Array(Math.ceil(blogs?.length / number)).fill(null).map((v, i) => i)
      );
    }
  }, [number, blogs, page]);

  return (
    <Element data-aos="fade-up" className="w-full" name="blogs">
      <section
        id="blogs"
        className="w-full flex flex-col justify-center items-center gap-10 bg-black"
      >
        <h1 className="text-white font-bold">{file.nav.blogs}</h1>
        {getBlogsLoading ? (
          <div
            data-aos="fade-right"
            className={
              "w-full flex flex-row justify-center items-center gap-[40px] overflow-hidden flex-nowrap"
            }
          >
            <LoadingBlogSkeleton card={3} />
          </div>
        ) : blogs.length > 0 ? (
          <Fragment>
            <div
              data-aos="fade-right"
              className={
                "blogs w-full flex flex-row justify-center items-center gap-[40px] overflow-hidden flex-nowrap"
              }
            >
              {blogs.map((val, index) => {
                return (
                  index < (page + 1) * number &&
                  index >= page * number && <BlogCard key={index} val={val} />
                );
              })}
            </div>

            <div className="w-full z-20 flex flex-row justify-center items-center gap-4">
              {fill.map((one, index) => {
                return index !== page ? (
                  <div
                    key={index}
                    onClick={() => setPage(index)}
                    className="w-[20px] bg-purple h-[5px] rounded-lg cursor-pointer"
                  ></div>
                ) : (
                  <div
                    key={index}
                    className="w-[20px] bg-purple h-[5px] rounded-lg cursor-pointer"
                  ></div>
                );
              })}
            </div>

            <Link
              className="p-2 px-6 rounded-lg cursor-pointer text-white bg-transparent border-2 border-purple border-solid transition-all duration-300 hover:bg-purple hover:text-white"
              to={`/blogs`}
            >
              {file.blog.seeMore}
            </Link>
          </Fragment>
        ) : (
          <NoData />
        )}
      </section>
    </Element>
  );
}
