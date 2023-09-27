import React, { Fragment } from "react";
import { Box, Skeleton } from "@chakra-ui/react";
const LoadingBlogSkeleton = ({ card }) => {
  return Array(card)
    .fill(0)
    .map((val, index) => {
      return (
        <div key={index} className="w-[325px] h-[470px] rounded-md">
          <Box className="w-[325px] h-[470px] rounded-md bg-lightBlack relative">
            <Skeleton className="w-[90%] right-0 left-0 h-[240px] bg-black absolute mx-auto top-[50px] " />
            <Skeleton className="w-[180px] h-[40px] bg-black absolute left-5 bottom-[100px]" />
            <Skeleton className="w-[200px] h-[30px] bg-black absolute left-5 bottom-[50px]" />
          </Box>
        </div>
      );
    });
};

export default LoadingBlogSkeleton;
