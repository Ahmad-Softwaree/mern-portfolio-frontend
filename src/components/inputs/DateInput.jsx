import React, { useState } from "react";

export default function DateInput({
  icon,
  name,
  value,
  onChange,
  placeholder,
  title,
  className,
}) {
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={`relative flex flex-col justify-start items-start gap-2 p-1  ${className}`}
    >
      {title && title !== "" && (
        <span
          className={`input_title text-right z-[50] text-blue absolute  p-2 text-[14px] w-fit transition-all duration-200 ${
            focus || value !== ""
              ? "right-0 top-[-50%] bg-none"
              : "right-[20px] top-[-20%] bg-white"
          }`}
        >
          {title}
        </span>
      )}
      <div
        className={`w-full flex flex-row justify-between items-center border-2 border-solid border-blue rounded-md px-1 ${
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
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`p-2 w-full text-left placeholder:text-right`}
          type={`${focus ? "date" : "text"}`}
          name={name}
          id={name}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
}
