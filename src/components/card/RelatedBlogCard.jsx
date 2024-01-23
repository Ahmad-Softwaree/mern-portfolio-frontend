import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
const RelatedBlogCard = ({ val }) => {
  const {
    state: { file, lang },
  } = useContext(LanguageContext);

  return (
    <Link
      to={`/blogs/${val._id}`}
      className="blogCard smallBlogCard relative flex flex-col justify-between items-center gap-10  overflow-hidden cursor-pointer w-[250px]  rounded-md h-[170px] text-center z-20 text-white-500">
      <div className="wrapper z-30 flex flex-col justify-left items-start gap-5 w-full h-[170px]">
        <img
          className="hover:scale-150 w-full h-[170px] object-cover rounded-md cursor-pointer transition-all duration-300"
          src={`${val.imageURL}`}
          alt="blogImage"
        />
        <div className="overBlog absolute inset-0 rounded-md bg-black-600 z-30 opacity-80 transition-all duration-300 w-full h-full"></div>
        <div
          className={`inner z-40 text-left top-[65%] left-0 px-[30px] w-full transition-all duration-300 min-h-[100px] flex flex-col justify-left items-start gap-3 ${
            lang === "en" ? "text-left" : "text-right"
          }`}>
          <span className="opacity-70 text-primary-500 w-full font-bold">
            {val.categories.length > 0 ? (
              <>
                {lang === "en"
                  ? val.categories[0].enName
                  : lang === "ar"
                  ? val.categories[0].arName
                  : val.categories[0].krName}
              </>
            ) : (
              "Category"
            )}
          </span>
          <h2 className="font-[500] !text-[18px]">
            {lang === "en"
              ? val.enTitle
              : lang === "ar"
              ? val.arTitle
              : val.krTitle}{" "}
          </h2>{" "}
          <Link
            to={`/blogs/${val._id}`}
            className="absolute bottom-[-10px] p-2 px-4 bg-primary-500 rounded-sm !text-[12px] text-white-500 w-fit cursor-pointer hover:bg-black-500 hover:text-primary-500 transition-all duration-300 font-bold">
            {file.blog.read}
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default RelatedBlogCard;
