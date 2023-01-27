import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import BlogPageCard from "../../components/blogs/BlogPageCard";

import LoadingBlogSkeleton from "../../components/loading/LoadingBlogSkeleton";

const Blogs = ({ BACKEND_HOST }) => {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState("");
  const [x, setX] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedBlogs, setSavedBlogs] = useState([]);

  const handleSearch = (e) => {
    setInput(e.target.value);
    setBlogs([]);

    let input = e.target.value;
    if (input === "") {
      setBlogs(savedBlogs);
      setX(false);
    } else {
      setX(true);
    }
    if (i18n.language === "en") {
      for (let i = 0; i < savedBlogs.length; i++) {
        for (let j = 0; j < input.length; j++) {
          if (savedBlogs[i].enBody.toLowerCase().charAt(j) === input.toLowerCase().charAt(j)) {
            if (j === input.length - 1) {
              setBlogs((prev) => [...prev, savedBlogs[i]]);
            }
          } else {
            break;
          }
        }
      }
    } else if (i18n.language === "ar") {
      for (let i = 0; i < savedBlogs.length; i++) {
        for (let j = 0; j < input.length; j++) {
          if (savedBlogs[i].arBody.toLowerCase().charAt(j) === input.toLowerCase().charAt(j)) {
            if (j === input.length - 1) {
              setBlogs((prev) => [...prev, savedBlogs[i]]);
            }
          } else {
            break;
          }
        }
      }
    } else {
      for (let i = 0; i < savedBlogs.length; i++) {
        for (let j = 0; j < input.length; j++) {
          if (savedBlogs[i].krBody.toLowerCase().charAt(j) === input.toLowerCase().charAt(j)) {
            if (j === input.length - 1) {
              setBlogs((prev) => [...prev, savedBlogs[i]]);
            }
          } else {
            break;
          }
        }
      }
    }
  };

  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  //fetch blogs

  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/blog/`);
        const data = res.data;
        setLoading(false);
        setBlogs(data);
        setSavedBlogs(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  return (
    <section className="blogsPage flex flex-column justify-left align-center w-100 gap-2">
      <div className="flex flex-row justify-between align-center w-100">
        <h1>{t("nav.blogs")}</h1>
        <div className="searchInputDiv flex flex-row justify-between align-center">
          <input value={input} onChange={handleSearch} className="searchInput" type="text" name="searchBar" id="searchBar" />
          {!x ? (
            <img className="searchGlass" src="/images/Search.svg" alt="" />
          ) : (
            <span
              onClick={() => {
                setInput("");
                setBlogs(savedBlogs);
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
                <BlogPageCard
                  t={t}
                  i18n={i18n}
                  key={index}
                  id={blog._id}
                  img={blog.image}
                  enBody={blog.enBody}
                  arBody={blog.arBody}
                  krBody={blog.krBody}
                  BACKEND_HOST={BACKEND_HOST}
                />
              );
            })}
          </>
        )}
      </div>
    </section>
  );
};

export default Blogs;
