import { privacyPolicy } from "@/constants";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="element min-h-screen ">
      <h1 className="text-white-500 font-bold w-full text-left">
        Privacy Policy
      </h1>
      <div className="w-full flex flex-col justify-left items-start gap-5">
        {privacyPolicy.map((val, index) => {
          return (
            <div
              key={index}
              className="w-full flex flex-col justify-left items-start gap-2">
              <div className="flex flex-row justify-left items-center gap-2">
                <div className="rounded-full bg-white-500 w-[5px] h-[5px]"></div>
                <h2 className="text-body1-semibold">{val.header}</h2>
              </div>
              <p className="text-body2-light">{val.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PrivacyPolicy;
