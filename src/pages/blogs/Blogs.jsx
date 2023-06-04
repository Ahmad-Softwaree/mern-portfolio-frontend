import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import LoadingBlogSkeleton from "../../components/loading/LoadingBlogSkeleton";
import { getAllBlogs } from "../../actions/blog";
import BlogCard from "../../components/blogs/BlogCard";
import PropTypes from "prop-types";
const Blogs = ({ getAllBlogs, blog, language: { file, language } }) => {
  const [input, setInput] = useState("");
  const [x, setX] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const handleSearch = (e) => {
    setInput(e.target.value);
    setBlogs([]);
    let input = e.target.value;
    if (input === "") {
      //we have saved the blogs in another state so whenever you done search it will come back again.
      setBlogs(blog.blogs);
      setX(false);
    } else {
      setX(true);
    }
    //this will make search depend on language
    searchInput(language + "Body", input);
  };

  const searchInput = (lang, input) => {
    for (let i = 0; i < blog.blogs.length; i++) {
      for (let j = 0; j < input.length; j++) {
        if (blog.blogs[i][lang].toLowerCase().charAt(j) === input.toLowerCase().charAt(j)) {
          if (j === input.length - 1) {
            setBlogs((prev) => [...prev, blog.blogs[i]]);
          }
        } else {
          break;
        }
      }
    }
  };

  //fetch blogs

  useEffect(() => {
    setBlogs(blog.blogs);
  }, [blog]);

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <section className="blogsPage flex flex-column justify-left align-center w-100 gap-2">
      <div className="flex flex-row justify-between align-center w-100">
        <h1 className="heading">{file.nav.blogs}</h1>
        <div className="searchInputDiv flex flex-row justify-between align-center">
          <input
            placeholder="Search for blog..."
            value={input}
            onChange={handleSearch}
            className="searchInput"
            type="text"
            name="searchBar"
            id="searchBar"
          />
          {!x ? (
            <img className="searchGlass" src="/images/Search.svg" alt="Glass Image Icon" />
          ) : (
            <span
              onClick={() => {
                setInput("");
                setBlogs(blog.blogs);
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
        {blog.blogLoading ? (
          <>
            <LoadingBlogSkeleton />
            <LoadingBlogSkeleton />
            <LoadingBlogSkeleton />
          </>
        ) : (
          <>
            {blogs?.map((blog, index) => {
              return (
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
