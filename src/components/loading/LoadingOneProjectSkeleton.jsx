import React from "react";
import { Skeleton } from "@chakra-ui/react";
export default function LoadingOneProjectSkeleton() {
  return (
    <div
      className={`relative bg-black flex flex-col justify-left items-end gap-[30px] flex-wrap w-full min-h-screen shadow-xl p-5 rounded-lg`}
    >
      <div className="flex flex-col justify-left items-start gap-10 w-full">
        <div
          className="w-full bg-black h-[340px] md:h-[450px] rounded-md object-cover border-2 border-solid border-niceBlack"
          alt="Project Image"
        />
        <span className="text-white font-bold !text-[14px] md:!text-[16px]"></span>

        <div className="flex flex-col justify-left items-center gap-5 w-full">
          <Skeleton height={`30px`} width={`100%`} />
          <Skeleton height={`30px`} width={`100%`} />
          <Skeleton height={`30px`} width={`100%`} />

          <Skeleton height={`30px`} width={`100%`} />
        </div>

        <div className="w-full flex flex-row justify-left items-center gap-5 flex-wrap">
          <span className="p-1 px-2 border-[3px] hover:bg-lightBlack border-solid border-lightBlack transition-all duration-300 w-[100px] text-white !text-[14px] rounded-md bg-transparent  cursor-pointer h-[40px] bg-white"></span>
          <span className="p-1 px-2 border-[3px] hover:bg-lightBlack border-solid border-lightBlack transition-all duration-300 w-[100px] text-white !text-[14px] rounded-md bg-transparent  cursor-pointer h-[40px] bg-white"></span>
          <span className="p-1 px-2 border-[3px] hover:bg-lightBlack border-solid border-lightBlack transition-all duration-300 w-[100px] text-white !text-[14px] rounded-md bg-transparent  cursor-pointer h-[40px] bg-white"></span>
          <span className="p-1 px-2 border-[3px] hover:bg-lightBlack border-solid border-lightBlack transition-all duration-300 w-[100px] text-white !text-[14px] rounded-md bg-transparent  cursor-pointer h-[40px] bg-white"></span>
        </div>
      </div>

      <div className="w-full flex flex-row justify-between align-center gap-5">
        <div className="flex flex-row gap-1 justify-center items-center text-white  px-2 border-2 border-solid border-purple transition-all duration-300 hover:bg-purple hover:text-white rounded-md cursor-pointer p-1 w-[100px] h-[40px]">
          <span></span>
        </div>

        <div className="flex flex-row gap-1 justify-center items-center text-white  px-2 border-2 border-solid border-purple transition-all duration-300 hover:bg-purple hover:text-white rounded-md cursor-pointer p-1 w-[100px] h-[40px]">
          <span></span>
        </div>
      </div>
    </div>
  );
}
