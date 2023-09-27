import React, { Fragment } from "react";
import { Box, Skeleton } from "@chakra-ui/react";
const LoadingWorkSkeleton = ({ card }) => {
  return Array(card)
    .fill(0)
    .map((val, index) => {
      return (
        <div
          key={index}
          className={`relative bg-niceBlack flex flex-col justify-center items-center my-5 gap-5  w-[300px]  h-[300px] shadow-xl p-5 mx-5 rounded-lg`}
        >
          <div
            className="w-[100px] h-[100px] rounded-full bg-white object-cover"
            alt="Project Image"
          />

          <Skeleton height={`15px`} width={`100%`} />
          <Skeleton height={`15px`} width={`100%`} />
          <Skeleton height={`15px`} width={`100%`} />
          <Skeleton height={`15px`} width={`100%`} />
        </div>
      );
    });
};

export default LoadingWorkSkeleton;
