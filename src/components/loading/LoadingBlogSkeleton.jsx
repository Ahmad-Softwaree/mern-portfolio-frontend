import React from "react";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
const LoadingBlogSkeleton = () => {
  return (
    <>
      <Box width="350px" padding="6" boxShadow="lg" bg="dark">
        <SkeletonCircle size="300" />
        <SkeletonText maxWidth="300" mt="5" noOfLines={5} spacing="5" skeletonHeight="3" />
      </Box>
    </>
  );
};

export default LoadingBlogSkeleton;
