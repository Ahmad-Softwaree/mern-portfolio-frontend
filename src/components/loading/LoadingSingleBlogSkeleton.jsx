import React from "react";
import { Stack, Skeleton, SkeletonCircle } from "@chakra-ui/react";
const LoadingSingleBlogSkeleton = () => {
  return (
    <Stack width="100%" className="w-100 flex flex-column justify-center align-center gap-1">
      <SkeletonCircle size="300" width="100%" maxWidth="300px" />
      <Skeleton width="100%" height="50px" />
      <Skeleton width="100%" height="20px" />
      <Skeleton width="100%" height="20px" />
      <Skeleton width="100%" height="20px" />
      <Skeleton width="100%" height="20px" />
      <Skeleton width="100%" height="20px" />
      <Skeleton width="100%" height="20px" />
      <Skeleton width="100%" height="20px" />
      <Skeleton width="100%" height="20px" />
      <Skeleton width="100%" height="20px" />
    </Stack>
  );
};

export default LoadingSingleBlogSkeleton;
