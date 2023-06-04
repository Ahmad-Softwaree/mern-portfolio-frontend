import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import LoadingSingleBlogSkeleton from "../../components/loading/LoadingSingleBlogSkeleton";
import SingleBlogError from "../../error/SingleBlogError";
import moment from "moment";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getBlogsByCategory, getOneBlog } from "../../actions/blog";
import { ENGLISH, KURDISH, ARABIC } from "../../actions/types";
import { Spinner } from "@chakra-ui/react";
import RelatedBlogCard from "../../components/blogs/RelatedBlogCard";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const SingleBlogPage = ({
  getBlogsByCategory,
  blog: { blog, blogLoading, filterLoading, filterBlogs },
  getOneBlog,
  language: { file, language },
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    getOneBlog({ blogId: id });
  }, [id]);

  useEffect(() => {
    if (blog && Object.keys(blog)?.length !== 0 && !blogLoading) {
      getBlogsByCategory({ categoryId: blog?.categories[0]?._id });
    }
  }, [blog]);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      setScrollY(window.scrollY);
    });
    return () => window.removeEventListener("scroll", () => {});
  }, [scrollY, window]);

  const location = useLocation();

  return (
    <section className="singleBlog flex flex-column justify-left align-start gap-2 w-100 position-relative">
      {blog && Object.keys(blog)?.length !== 0 && !blogLoading ? (
        <>
          <img src={`${blog.image}`} alt="Blog Image" className="blogImage" />
          <div className="overImage"></div>
          <div className="content flex w-100 flex-column justify-left align-center gap-2">
            <div className="blogHeader flex flex-column w-100 justify-center align-center gap-2">
              <h1>{language === "en" ? blog.enTitle : language === "ar" ? blog.arTitle : blog.krTitle}</h1>
              <div className=" blogOwner flex flex-column justify-left align-center ">
                <img src={`${blog.user.image}`} alt="Blog Image" />
                <span>{file.singleBlog.name}</span>
                <p>{file.singleBlog.ceo}</p>
              </div>
            </div>

            <div className={`links flex flex-row align-center gap-1 w-100 ${language === "en" ? "justify-left" : "justify-right"}`}>
              <Link className="flex flex-row justify-left align-center gap-1" to={`/`}>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                <span>{file.nav.home}</span>
              </Link>
              <Link className="flex flex-row justify-left align-center gap-1" to={`/blogs `}>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                <span>{file.nav.blogs}</span>
              </Link>
            </div>

            <div className={`languagesList flex flex-row  align-center gap-1 ${language === "en" ? "justify-left" : "justify-right"}`}>
              <span
                onClick={() => {
                  dispatch({
                    type: ENGLISH,
                  });
                }}
                className={language === "en" ? "active" : ""}
              >
                EN
              </span>
              <span
                onClick={() => {
                  dispatch({
                    type: KURDISH,
                  });
                }}
                className={language === "kr" ? "active" : ""}
              >
                KR
              </span>
              <span
                onClick={() => {
                  dispatch({
                    type: ARABIC,
                  });
                }}
                className={language === "ar" ? "active" : ""}
              >
                AR
              </span>
            </div>
            <div className="categoriesDiv flex flex-column justify-left align-start w-100 gap-1">
              <h3 className="w-100 text-left">{file.singleBlog.categories}</h3>

              <div className={`categories flex flex-row w-100 align-center gap-1 ${language === "en" ? "justify-left" : "justify-right"}`}>
                {blog.categories?.map((category, index) => {
                  return (
                    <span key={index} className={`category`}>
                      {language === "en" ? category.enName : language === "ar" ? category.arName : category.krName}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className={`blogBody ${language === "en" ? "karla englishDots" : "arabicDots"}`}>
              {language === "en" ? parse(blog.enBody) : language === "ar" ? parse(blog.arBody) : parse(blog.krBody)}
            </div>
            <span className={`blogTime flex flex-row justify-left align-center gap-1 ${language !== "en" && "justify-right"}`}>
              <i className="fa-regular fa-clock"></i>
              {moment(blog.createdAt).format("MMMM Do YYYY")} {moment(blog.createdAt).format("dddd")}
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
            <div className="relatedBlogs flex flex-column justify-left align-start gap-1 w-100">
              <h2 className="related">{file.singleBlog.related}</h2>
              <div className="flex flex-row justify-center align-center w-100 flex-wrap gap-1">
                {filterLoading && <Spinner width={`30px`} height={`30px`} />}
                {!filterLoading && filterBlogs.length > 0 && (
                  <>
                    {filterBlogs.map((val, index) => {
                      return (
                        <RelatedBlogCard
                          key={index}
                          file={file}
                          language={language}
                          id={val._id}
                          img={val.image}
                          enTitle={val.enTitle}
                          arTitle={val.arTitle}
                          krTitle={val.krTitle}
                          categories={val.categories}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : blogLoading ? (
        <LoadingSingleBlogSkeleton />
      ) : (
        <SingleBlogError />
      )}
    </section>
  );
};

SingleBlogPage.propTypes = {
  blog: PropTypes.object.isRequired,
  getOneBlog: PropTypes.func.isRequired,
  language: PropTypes.object.isRequired,
  getBlogsByCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blog: state.blog,
  language: state.language,
});

export default connect(mapStateToProps, {
  getOneBlog,
  getBlogsByCategory,
})(SingleBlogPage);
