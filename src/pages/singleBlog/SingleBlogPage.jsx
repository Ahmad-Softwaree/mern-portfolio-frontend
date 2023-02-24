import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import LoadingSingleBlogSkeleton from "../../components/loading/LoadingSingleBlogSkeleton";
import SingleBlogError from "../../error/SingleBlogError";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOneBlog } from "../../actions/blog";
const SingleBlogPage = ({ blog, getOneBlog }) => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getOneBlog(id);
  }, [id]);

  return (
    <section className="singleBlog flex flex-column justify-left align-start gap-2 w-100">
      {blog.singleBlog !== null && !blog.loading ? (
        <>
          <h1 className="blogHeader">
            {i18n.language === "en" ? blog.singleBlog.enTitle : i18n.language === "ar" ? blog.singleBlog.arTitle : blog.singleBlog.krTitle}
          </h1>
          <img src={`${blog.singleBlog.image}`} alt="" className="blogImage" />
          {i18n.language === "en" ? (
            <p dangerouslySetInnerHTML={{ __html: blog.singleBlog.enBody }}></p>
          ) : i18n.language === "ar" ? (
            <p dangerouslySetInnerHTML={{ __html: blog.singleBlog.arBody }}></p>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: blog.singleBlog.krBody }}></p>
          )}
          <span className="blogTime">
            {moment(blog.singleBlog.createdAt).format("MMMM Do YYYY")} {moment(blog.singleBlog.createdAt).format("dddd")}
          </span>
        </>
      ) : blog.loading ? (
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
};

const mapStateToProps = (state) => ({
  blog: state.blog,
});

export default connect(mapStateToProps, {
  getOneBlog,
})(SingleBlogPage);
