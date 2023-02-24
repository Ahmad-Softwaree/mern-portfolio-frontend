import React, { useEffect, useRef, useState } from "react";
import BlogCard from "../../../components/blogs/BlogCard";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import LoadingBlogSkeleton from "../../../components/loading/LoadingBlogSkeleton";
import { getBlogs } from "../../../actions/blog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const Blogs = ({ BACKEND_HOST, t, i18n, getBlogs, blog }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef(null);

  //mouse dragging event

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.clientX - containerRef.current.scrollLeft);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.clientX - startX;
    containerRef.current.scrollLeft = x;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Element className="w-100" name="blogs">
      <section id="blogs" className="blogs flex flex-column justify-left align-center w-100 gap-3">
        <h1 className="heading">{t("nav.blogs")}</h1>
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={
            blog.blogs.length === 1
              ? "blogCards flex flex-row justify-center align-center  flex-nowrap w-100  gap-2"
              : "blogCards flex flex-row  align-center flex-nowrap w-100  gap-2"
          }
        >
          {blog.loading ? (
            <>
              <LoadingBlogSkeleton />
              <LoadingBlogSkeleton />
              <LoadingBlogSkeleton />
            </>
          ) : (
            <>
              {blog.blogs.map((blog, index) => {
                return (
                  <BlogCard
                    t={t}
                    i18n={i18n}
                    BACKEND_HOST={BACKEND_HOST}
                    key={index}
                    img={blog.image}
                    id={blog._id}
                    enBody={blog.enBody}
                    arBody={blog.arBody}
                    krBody={blog.krBody}
                    time={blog.createdAt}
                  />
                );
              })}
            </>
          )}
        </div>
        <div className="seeMoreAdvice flex flex-row justify-center align-center w-100  gap-1">
          <span>
            <i className="fa-solid fa-arrow-pointer"></i>
          </span>
          <small>{t("drag")}</small>
        </div>

        <Link className="seeMore" to={`/blogs`}>
          {t("blog.seeMore")}
        </Link>
      </section>
    </Element>
  );
};

Blogs.propTypes = {
  blog: PropTypes.object.isRequired,
  getBlogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blog: state.blog,
});

export default connect(mapStateToProps, {
  getBlogs,
})(Blogs);
