import React, { Fragment } from "react";
import { Box, Skeleton } from "@chakra-ui/react";
const LoadingCertificateSkeleton = ({ card }) => {
  return Array(card)
    .fill(0)
    .map((val, index) => {
      return (
        <div
          key={index}
          data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
          className={`relative ${
            index % 2 === 0 ? "self-end" : "self-start"
          } bg-black flex flex-col justify-left items-end my-5 flex-wrap w-[350px] md:w-[550px] h-[400px] shadow-xl p-5  rounded-lg`}
        >
          <div className="flex flex-col justify-left items-start gap-10 w-full">
            <span className="text-white"></span>
            <div
              className="w-[50px] h-[50px] rounded-full bg-white object-cover"
              alt="Project Image"
            />

            <div className="flex flex-col justify-left items-center gap-5 w-full">
              <Skeleton height={`30px`} width={`100%`} />
              <Skeleton height={`30px`} width={`100%`} />
            </div>
          </div>

          <div className="w-full flex flex-row justify-between align-center gap-5 mt-5">
            <div className="flex flex-row gap-1 justify-center items-center text-white  px-2 border-2 border-solid border-purple transition-all duration-300 hover:bg-purple hover:text-white rounded-md cursor-pointer p-1 w-[100px] h-[40px]">
              <span></span>
            </div>

            <div className="flex flex-row gap-1 justify-center items-center text-white  px-2 border-2 border-solid border-purple transition-all duration-300 hover:bg-purple hover:text-white rounded-md cursor-pointer p-1 w-[100px] h-[40px]">
              <span></span>
            </div>
          </div>
        </div>
      );
    });
};

export default LoadingCertificateSkeleton;
