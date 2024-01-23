import Logo from "@/components/shared/Logo";
import React from "react";

export default function Fallback() {
  return (
    <div className="w-full min-h-screen flex flex-row justify-center items-center bg-black-500">
      <Logo className={`animate-pulse text-primary-500`} size="xl" />
    </div>
  );
}
