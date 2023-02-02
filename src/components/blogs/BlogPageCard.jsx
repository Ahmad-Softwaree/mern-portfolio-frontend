import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import DOMPurify from "dompurify";

const BlogPageCard = ({ time, img, enBody, arBody, krBody, id, BACKEND_HOST, t, i18n }) => {
  return (
    <div className="blogCard flex flex-column justify-left align-center  gap-1">
      <img src={`${img}`} alt="blogImage" />
      {i18n.language === "en" ? (
        <p>{DOMPurify.sanitize(enBody.replace(/<br\s*[\/]?>/gi, ""), { ADD_TAGS: ["br"] }).substring(0, 120) + "..."}</p>
      ) : i18n.language === "ar" ? (
        <p>{DOMPurify.sanitize(arBody.replace(/<br\s*[\/]?>/gi, ""), { ADD_TAGS: ["br"] }).substring(0, 120) + "..."}</p>
      ) : (
        <p>{DOMPurify.sanitize(krBody.replace(/<br\s*[\/]?>/gi, ""), { ADD_TAGS: ["br"] }).substring(0, 120) + "..."}</p>
      )}
      <span className="blogTime">
        {moment(time).format("MMMM Do YYYY")} {moment(time).format("dddd")}
      </span>
      <Link to={`${id}`} className="readBlog">
        {t("blog.read")}
      </Link>
    </div>
  );
};

export default BlogPageCard;
