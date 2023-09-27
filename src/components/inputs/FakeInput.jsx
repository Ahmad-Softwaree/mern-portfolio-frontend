import React from "react";

export default function FakeInput({
  icon,
  title,
  className,
  textInputClass,
  text,
}) {
  return (
    <div
      className={`relative flex flex-col justify-start items-start gap-2 p-1  ${className}`}
    >
      {title && title !== "" && (
        <span
          className={`input_title text-right z-[50] text-purple absolute  p-2 !text-[14px] w-fit transition-all duration-200
              right-[20px] top-[-30%] bg-black
          `}
        >
          {title}
        </span>
      )}
      <div
        className={`w-full flex flex-row justify-between items-center border-2 border-solid border-purple rounded-md px-1 min-h-[40px]  opacity-100
        `}
      >
        {icon && (
          <span className="w-[20px] h-[20px] object-cover">
            <img
              className="w-full h-full"
              src={`/images/${icon}.svg`}
              alt={icon}
            />
          </span>
        )}
        <p
          className={`p-2 w-full text-right  !text-[16px] z-[60]  ${textInputClass}`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
