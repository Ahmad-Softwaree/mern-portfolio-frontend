import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSingleBlogSkeleton from "../../components/loading/LoadingSingleBlogSkeleton";
import SingleBlogError from "../../error/SingleBlogError";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOneBlog } from "../../actions/blog";
const SingleBlogPage = ({ blog: { blog, blogLoading }, getOneBlog, language: { file, language } }) => {
  const { id } = useParams();

  useEffect(() => {
    getOneBlog({ blogId: id });
  }, [id]);

  return (
    <section className="singleBlog flex flex-column justify-left align-start gap-2 w-100">
      {Object.keys(blog)?.length !== 0 && !blogLoading ? (
        <>
          <img src={`${blog.image}`} alt="" className="blogImage" />
          <div className="overImage"></div>
          <div className="content flex w-100 flex-column justify-left align-center gap-2">
            <div className="blogHeader flex flex-column w-100 justify-center align-center gap-2">
              <h1>{language === "en" ? blog.enTitle : language === "ar" ? blog.arTitle : blog.krTitle}</h1>
              <div className=" blogOwner flex flex-column justify-left align-center ">
                <img src={`${blog.user.image}`} alt="" />
                <span>{file.singleBlog.name}</span>
                <p>{file.singleBlog.ceo}</p>
              </div>
            </div>

            <p dangerouslySetInnerHTML={{ __html: language === "en" ? blog.enBody : language === "ar" ? blog.arBody : blog.krBody }}></p>
            <span className={`blogTime flex flex-row justify-left align-center gap-1 ${language !== "en" && "justify-right"}`}>
              <i className="fa-regular fa-clock"></i>
              {moment(blog.createdAt).format("MMMM Do YYYY")} {moment(blog.createdAt).format("dddd")}
            </span>
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
