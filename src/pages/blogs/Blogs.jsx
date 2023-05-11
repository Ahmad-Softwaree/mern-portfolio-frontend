import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import BlogPageCard from "../../components/blogs/BlogPageCard";
import LoadingBlogSkeleton from "../../components/loading/LoadingBlogSkeleton";
import { getAllBlogs } from "../../actions/blog";
import PropTypes from "prop-types";
import { AdminBlogs } from "../../components/admin/AdminBlogs";
const Blogs = ({ getAllBlogs, blog: { blogs, blogLoading }, language: { file, language } }) => {
  const [input, setInput] = useState("");
  const [x, setX] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const handleSearch = useCallback((e) => {
    setInput(e.target.value);
    setBlogs([]);
    let input = e.target.value;
    if (input === "") {
      setBlogs(blog.blogs);
      setX(false);
    } else setX(true);

    //this will make search depend on language
    searchInput(language.toString() + "Body", input);
  }, []);

  const searchInput = useCallback((lang, input) => {
    for (let i = 0; i < blogs.length; i++) {
      for (let j = 0; j < input.length; j++) {
        if (blogs[i][lang].toLowerCase().charAt(j) === input.toLowerCase().charAt(j))
          if (j === input.length - 1) setBlogs((prev) => [...prev, blogs[i]]);
          else break;
      }
    }
  }, []);

  //fetch blogs

  useEffect(() => {
    getAllBlogs();
  }, []);

  useEffect(() => {
    setBlogs(blogs);
  }, [blogs]);

  return (
    <section className="blogsPage flex flex-column justify-left align-center w-100 gap-2">
      <div className="flex flex-row justify-between align-center w-100">
        <h1 className="heading">{file.nav.blogs}</h1>
        <div className="searchInputDiv flex flex-row justify-between align-center">
          <input value={input} onChange={handleSearch} className="searchInput" type="text" name="searchBar" id="searchBar" />
          {!x ? (
            <img className="searchGlass" src="/images/Search.svg" alt="" />
          ) : (
            <span
              onClick={() => {
                setInput("");
                setBlogs(blogs);
                setX(false);
              }}
              className="x"
            >
              <i className="fa-solid fa-xmark pointer"></i>
            </span>
          )}
        </div>
      </div>

      <div className="allBlogs flex flex-row justify-center align-center gap-3 w-100 flex-wrap">
        {blogLoading ? (
          <>
            <LoadingBlogSkeleton />
            <LoadingBlogSkeleton />
            <LoadingBlogSkeleton />
          </>
        ) : (
          <>
            {blogs?.map((blog, index) => {
              return (
                <BlogPageCard
                  file={file}
                  language={language}
                  key={index}
                  id={blog._id}
                  img={blog.image}
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
    </section>
  );
};

Blogs.propTypes = {
  blog: PropTypes.object.isRequired,
  getAllBlogs: PropTypes.func.isRequired,
  language: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  blog: state.blog,
  language: state.language,
});

export default connect(mapStateToProps, {
  getAllBlogs,
})(Blogs);
