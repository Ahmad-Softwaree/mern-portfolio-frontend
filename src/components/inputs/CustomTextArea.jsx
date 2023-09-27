import { Textarea } from "@chakra-ui/react";
import React, { useState } from "react";

export default function CustomTextArea({
  icon,
  name,
  value,
  onChange,
  placeholder,
  title,
  className,
  textInputClass,
  disabled = false,
}) {
  const [focus, setFocus] = useState(false);
  return (
    <div
      className={`relative flex flex-col justify-start items-start gap-2 p-1  ${className}`}
    >
      {title && title !== "" && (
        <span
          className={`input_title text-right z-[50] text-purple absolute  p-2 !text-[14px] w-fit transition-all duration-200 ${
            focus || value !== ""
              ? "right-0 top-[-28px] bg-none"
              : "right-[20px] top-[-15px] bg-black"
          }`}
        >
          {title}
        </span>
      )}
      <div
        className={`w-full flex flex-row justify-between items-center border-2 border-solid border-purple rounded-md ${
          focus || value !== "" ? "opacity-100" : "opacity-70"
        }`}
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
        <Textarea
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          color={`white`}
          borderColor={`#f9004d`}
          backgroundColor={`lightBlack`}
          border={`none`}
          focusBorderColor="none"
          onChange={onChange}
          className="border-none w-full"
          width={`100%`}
          name={name}
          value={value}
        />
      </div>
    </div>
  );
}
