import React, { useEffect, useRef, useState } from "react";
import BlogCard from "../../../components/blogs/BlogCard";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import LoadingBlogSkeleton from "../../../components/loading/LoadingBlogSkeleton";
import axios from "axios";

const Blogs = ({ BACKEND_HOST, t, i18n }) => {
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
    setScrollLeft(x);
    containerRef.current.scrollLeft = x;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  //fetch blog data
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/blog/`);
        const data = res.data;
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getBlogs();
  }, []);

  return (
    <Element className="w-100" name="blogs">
      <section id="blogs" className="blogs flex flex-column justify-left align-center w-100 gap-3">
        <h1>{t("nav.blogs")}</h1>
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="blogCards flex flex-column justify-left align-center  flex-wrap gap-3"
        >
          {loading ? (
            <>
              <LoadingBlogSkeleton />
              <LoadingBlogSkeleton />
              <LoadingBlogSkeleton />
            </>
          ) : (
            <>
              {blogs.map((blog, index) => {
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
                  />
                );
              })}
            </>
          )}
        </div>

        <Link className="seeMore" to={`/blogs`}>
          {t("blog.seeMore")}
        </Link>
      </section>
    </Element>
  );
};

export default Blogs;
