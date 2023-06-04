import React, { useEffect, useRef, useState } from "react";
import BlogCard from "../../../components/blogs/BlogCard";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import LoadingBlogSkeleton from "../../../components/loading/LoadingBlogSkeleton";
import { getHomeBlogs } from "../../../actions/blog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import useSize from "../../../hooks/useSize";
const Blogs = ({ getHomeBlogs, blog, language, file }) => {
  const [number, setNumber] = useState(1);
  const [fill, setFill] = useState(new Array(blog.blogs?.length).fill(null).map((v, i) => i));
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (useSize({ sm: 850, md: 1200, lg: 1500 }) === "xl") setNumber(4);
    if (useSize({ sm: 850, md: 1200, lg: 1500 }) === "lg") setNumber(3);
    if (useSize({ sm: 850, md: 1200, lg: 1500 }) === "md") setNumber(2);
    if (useSize({ sm: 850, md: 1200, lg: 1500 }) === "sm") setNumber(1);
    getHomeBlogs({});
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      let blogs = document.querySelector(".blogs")?.clientWidth;
      let blogWidths = document.querySelector(".blogCard")?.clientWidth * document.querySelectorAll(".blogCard")?.length;
      if (blogWidths > blogs - 130) setNumber((prev) => (prev === 1 ? 1 : prev - 1));
      else if (blogWidths === blogs - 500) setNumber((prev) => prev + 1);
    });

    if (page > fill.length - 1) setPage(0);

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [window.innerWidth, page, fill]);

  useEffect(() => {
    if (blog.blogs?.length > number) {
      setFill(new Array(Math.ceil(blog.blogs?.length / number)).fill(null).map((v, i) => i));
    }
  }, [number, blog.blogs, page]);

  return (
    <>
      {blog.blogs.length > 0 && !blog.blogLoading ? (
        <Element className="w-100" name="blogs">
          <section id="blogs" className="blogs flex flex-column justify-left align-center w-100 gap-3">
            {/* <img className="blogBack" src="/images/blog.webp" alt="" /> */}
            <h1 className="heading">{file.nav.blogs} 📚</h1>
            <div className={"blogCards flex flex-row justify-center align-center  flex-nowrap w-100  gap-2"}>
              {blog.blogs.map((blog, index) => {
                return (
                  index < (page + 1) * number &&
                  index >= page * number && (
                    <BlogCard
                      file={file}
                      language={language}
                      key={index}
                      img={blog.image}
                      id={blog._id}
                      enTitle={blog.enTitle}
                      arTitle={blog.arTitle}
                      krTitle={blog.krTitle}
                      categories={blog.categories}
                    />
                  )
                );
              })}
            </div>

            <div className="w-100 flex flex-row justify-center align-center gap-1 z-20">
              {fill.map((one, index) => {
                return index !== page ? (
                  <div key={index} onClick={() => setPage(index)} className="moreDots"></div>
                ) : (
                  <div key={index} className="activeMoreDot"></div>
                );
              })}
            </div>

            <Link className="seeMore" to={`/blogs`}>
              {file.blog.seeMore}
            </Link>
          </section>
        </Element>
      ) : blog.blogLoading && blog.blogs.length === 0 ? (
        <div style={{ overflowX: "hidden" }} className="flex flex-row justify-center align-center w-100 gap-5">
          <LoadingBlogSkeleton />
          <LoadingBlogSkeleton />
          <LoadingBlogSkeleton />
        </div>
      ) : null}
    </>
  );
};

Blogs.propTypes = {
  blog: PropTypes.object.isRequired,
  getHomeBlogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blog: state.blog,
});

export default connect(mapStateToProps, {
  getHomeBlogs,
})(Blogs);
