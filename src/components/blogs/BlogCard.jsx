import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const BlogCard = ({ id, img, enBody, arBody, krBody, BACKEND_HOST, t, i18n }) => {
  return (
    <div className="blogCard flex flex-column justify-left align-center  gap-1">
      <img src={`${BACKEND_HOST}/public/images/blogs/${img}`} alt="blogImage" />
      {i18n.language === "en" ? (
        <p dangerouslySetInnerHTML={{ __html: enBody.substring(0, 120) + "..." }}></p>
      ) : i18n.language === "ar" ? (
        <p dangerouslySetInnerHTML={{ __html: arBody.substring(0, 120) + "..." }}></p>
      ) : (
        <p dangerouslySetInnerHTML={{ __html: krBody.substring(0, 120) + "..." }}></p>
      )}

      <Link to={`/blogs/${id}`} className="readBlog">
        {t("blog.read")}
      </Link>
    </div>
  );
};

export default BlogCard;
