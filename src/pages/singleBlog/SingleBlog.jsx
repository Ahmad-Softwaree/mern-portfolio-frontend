import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import LoadingBlogSkeleton from "../../components/loading/LoadingBlogSkeleton";
import LoadingSingleBlogSkeleton from "../../components/loading/LoadingSingleBlogSkeleton";
import SingleBlogError from "../../error/SingleBlogError";
import DOMPurify from "dompurify";
import moment from "moment";

const SingleBlog = ({ BACKEND_HOST }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setError(false);
    const getBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_HOST}/api/blog/${id}`);
        const data = res.data;
        setBlog(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };
    getBlog();
  }, [id]);
  return (
    <section className="singleBlog flex flex-column justify-left align-start gap-2 w-100">
      {!error ? (
        <>
          {loading ? (
            <LoadingSingleBlogSkeleton />
          ) : (
            <>
              <h1 className="blogHeader">{i18n.language === "en" ? blog.enTitle : i18n.language === "ar" ? blog.arTitle : blog.krTitle}</h1>
              <img src={`${decodeURIComponent(blog.image)}`} alt="" className="blogImage" />
              {i18n.language === "en" ? (
                <p dangerouslySetInnerHTML={{ __html: blog.enBody }}></p>
              ) : i18n.language === "ar" ? (
                <p dangerouslySetInnerHTML={{ __html: blog.arBody }}></p>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: blog.krBody }}></p>
              )}
              <span className="blogTime">
                {moment(blog.createdAt).format("MMMM Do YYYY")} {moment(blog.createdAt).format("dddd")}
              </span>
            </>
          )}
        </>
      ) : (
        <SingleBlogError />
      )}
    </section>
  );
};

export default SingleBlog;
