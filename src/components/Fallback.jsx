import { Spinner } from "@chakra-ui/react";
import React from "react";

export default function Fallback() {
  return (
    <div className="fallback w-100 flex flex-row justify-center align-center h-screen bg-black">
      <Spinner width={`150px`} height={`150px`} color="white" />
    </div>
  );
}
