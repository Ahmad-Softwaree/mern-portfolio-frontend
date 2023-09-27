import React from "react";
import { Stack, Skeleton, SkeletonCircle } from "@chakra-ui/react";
export default function LoadingSingleBlogSkeleton() {
  return (
    <div className="relative w-full min-h-screen rounded-md flex flex-col justify-left items-center gap-5 px-10">
      <div className="absolute w-full h-[500px]">
        <Skeleton className="w-full h-[500px]" />
        <div className="w-full flex flex-row justify-center items-center gap-5 absolute bottom-[150px] right-0 left-0 mx-auto">
          <SkeletonCircle size={`50`} />
          <Skeleton className="w-[250px] h-[40px]" />
        </div>
        <Skeleton className="w-[350px] h-[40px] absolute bottom-[100px] right-0 left-0 mx-auto mt-5" />
      </div>
      <Skeleton className="w-full h-[50px] mt-[550px]" />
      <Skeleton className="w-full h-[50px]" />
      <Skeleton className="w-full h-[50px]" />
      <Skeleton className="w-full h-[50px]" />
    </div>
  );
}
