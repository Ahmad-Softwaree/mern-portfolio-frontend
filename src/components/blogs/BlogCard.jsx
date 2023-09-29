import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";

export default function BlogCard({ val }) {
  const {
    state: { file, language },
  } = useContext(LanguageContext);

  return (
    <div className="blogCard relative flex flex-col justify-between items-center gap-10  overflow-hidden cursor-pointer w-[350px]  rounded-md h-[470px] text-center z-20 text-white">
      <div className="wrapper z-30 flex flex-col justify-left items-start gap-5 w-full h-[470px]">
        <img
          className="hover:scale-150 w-full h-[470px] object-cover rounded-md cursor-pointer transition-all duration-300"
          src={`${val.imageURL}`}
          alt="blogImage"
        />
        <div className="overBlog absolute inset-0 rounded-md bg-lightBlack z-30 opacity-80 transition-all duration-300 w-full h-full"></div>
        <div
          className={`inner z-40 text-left top-[75%] left-0 px-[30px] w-full transition-all duration-300 min-h-[100px] flex flex-col justify-left items-start gap-3 ${
            language === "en" ? "text-left" : "text-right"
          }`}
        >
          <span className="opacity-70 text-purple w-full font-bold">
            {val.categories.length > 0 ? (
              <>
                {language === "en"
                  ? val.categories[0].enName
                  : language === "ar"
                  ? val.categories[0].arName
                  : val.categories[0].krName}
              </>
            ) : (
              "Category"
            )}
          </span>
          <h2 className="font-[500] !text-[26px]">
            {language === "en"
              ? val.enTitle.substring(0, 20).concat("...")
              : language === "ar"
              ? val.arTitle.substring(0, 20).concat("...")
              : val.krTitle.substring(0, 20).concat("...")}
          </h2>
          <div className="w-full flex flex-row justify-start items-center gap-5">
            <img
              className="w-[40px] h-[40px] object-cover rounded-full"
              src={val.admin.imageURL}
              alt="adminImage"
            />
            <span className="font-bold text-purple !text-[14px]">
              author: {val.admin.name}
            </span>
          </div>
          <Link
            to={`/blogs/${val._id}`}
            className="absolute bottom-[-60px] py-[10px] px-[20px] bg-purple rounded-sm !text-[12px] text-white w-fit cursor-pointer hover:bg-black hover:text-purple transition-all duration-300 font-bold"
          >
            {file.blog.read}
          </Link>
        </div>
      </div>
    </div>
  );
}
