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
          <h1 className="blogHeader">{language === "en" ? blog.enTitle : language === "ar" ? blog.arTitle : blog.krTitle}</h1>
          <img src={`${blog.image}`} alt="" className="blogImage" />
          {language === "en" ? (
            <p dangerouslySetInnerHTML={{ __html: blog.enBody }}></p>
          ) : language === "ar" ? (
            <p dangerouslySetInnerHTML={{ __html: blog.arBody }}></p>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: blog.krBody }}></p>
          )}
          <span className="blogTime">
            {moment(blog.createdAt).format("MMMM Do YYYY")} {moment(blog.createdAt).format("dddd")}
          </span>
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
