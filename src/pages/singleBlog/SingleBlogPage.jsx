import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSingleBlogSkeleton from "../../components/loading/LoadingSingleBlogSkeleton";
import SingleBlogError from "../../error/SingleBlogError";
import moment from "moment";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getOneBlog } from "../../actions/blog";
import { ENGLISH, KURDISH, ARABIC } from "../../actions/types";
const SingleBlogPage = ({ blog: { blog, blogLoading }, getOneBlog, language: { file, language } }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    getOneBlog({ blogId: id });
  }, [id]);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      setScrollY(window.scrollY);
    });

    return () => window.removeEventListener("scroll", () => {});
  }, [scrollY, window]);

  return (
    <section className="singleBlog flex flex-column justify-left align-start gap-2 w-100 position-relative">
      {Object.keys(blog)?.length !== 0 && !blogLoading ? (
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

            <div
              className={`blogBody ${language === "en" ? "karla englishDots" : "arabicDots"}`}
              dangerouslySetInnerHTML={{ __html: language === "en" ? blog.enBody : language === "ar" ? blog.arBody : blog.krBody }}
            ></div>
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
};

const mapStateToProps = (state) => ({
  blog: state.blog,
  language: state.language,
});

export default connect(mapStateToProps, {
  getOneBlog,
})(SingleBlogPage);
