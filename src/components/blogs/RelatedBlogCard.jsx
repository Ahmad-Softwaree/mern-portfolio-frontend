import React, { useState } from "react";
import { Link } from "react-router-dom";
const RelatedBlogCard = ({ file, language, id, img, enTitle, arTitle, krTitle, categories }) => {
  const [hover, setHover] = useState(false);

  return (
    <Link
      to={`/blogs/${id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="blogCard relatedBlogCard flex flex-column justify-between align-center  gap-1"
    >
      <div className="wrapper flex flex-column justify-left align-start gap-1 w-100">
        <img style={hover ? { transform: "scale(1.4)" } : null} src={`${img}`} alt="blogImage" />
        <div className="overBlog"></div>
        <div
          style={language === "en" ? { textAlign: "left" } : { textAlign: "right" }}
          className={`inner flex flex-column justify-left align-start`}
        >
          <span className="category">
            {categories.length > 0 ? (
              <>{language === "en" ? categories[0].enName : language === "ar" ? categories[0].arName : categories[0].krName}</>
            ) : (
              "Category"
            )}
          </span>
          <h2>{language === "en" ? enTitle : language === "ar" ? arTitle : krTitle} </h2>{" "}
          <Link to={`/blogs/${id}`} className="readBlog">
            {file.blog.read}
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default RelatedBlogCard;
