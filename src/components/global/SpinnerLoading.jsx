import React from "react";
import { Spinner } from "@chakra-ui/react";
export default function SpinnerLoading({ size }) {
  return (
    <div className="w-full flex flex-row justify-center items-center">
      <Spinner width={size} height={size} />
    </div>
  );
}
