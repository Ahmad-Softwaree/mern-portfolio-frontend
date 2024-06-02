import React from "react";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

export default function CertificateCard({ val, index }) {
  return (
    <div
      id={`certificateCardId-${index}`}
      data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
      className={`relative w-full grid grid-cols-2 gap-10`}
    >
      <div
        className={` relative col-span-full lg:col-span-1 bg-black-500 flex flex-col justify-center items-end gap-5 md:gap-10 flex-wrap shadow-xl p-5 rounded-lg
                 ${index % 2 === 0 ? "order-1" : "order-2"}
                items-start`}
      >
        <div className="flex flex-col justify-left items-start gap-5 w-full">
          <img
            className="hidden md:flex w-[40px] md:w-[50px] h-[40px] md:h-[50px] rounded-full object-cover"
            src={`${val.image}`}
            alt="Project Image"
          />

          <div className="flex flex-col justify-left items-center gap-1 w-full">
            <h2 className="text-white-500 !text-[16px] md:!text-[18px] font-[500] w-full">
              {val.title}
            </h2>
            <h2 className="text-niceGray !text-[16px] md:!text-[18px] font-[500] w-full ">
              {val.desc.substring(0, 120).concat("...")}
            </h2>
          </div>
        </div>

        <div className="w-full flex flex-row justify-between items-center gap-5">
          {val.url && (
            <a
              href={`${val.url}`}
              target="_blank"
              className="link flex flex-row gap-1 justify-center items-center text-white-500  px-2 border-2 border-solid border-primary-500 transition-all duration-300 hover:bg-primary-500 hover:text-white-500 rounded-md cursor-pointer p-1"
            >
              <span className="!text-[14px] text-white-500">Link</span>
              <OpenInNewIcon className="text-white-500" fontSize="14px" />
            </a>
          )}
          <div className="more flex flex-row gap-1 justify-center items-center text-white-500  px-2 border-2 border-solid border-primary-500 transition-all duration-300 hover:bg-primary-500 hover:text-white-500 rounded-md cursor-pointer p-1">
            <span className="!text-[14px] text-white-500">More</span>
            <ReadMoreIcon className="text-white-500" fontSize="14px" />
          </div>
        </div>
      </div>

      <img
        src={val.image}
        alt="certificateImage"
        className={`image cols-span-1 hidden lg:flex  object-contain origin-center   w-full  ${
          index % 2 === 0 ? "order-2" : "order-1"
        }`}
      />
    </div>
  );
}
