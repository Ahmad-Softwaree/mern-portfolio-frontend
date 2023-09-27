import React, { useState } from "react";

export default function FileInput({
  title,
  className,
  holder,
  value,
  onChange,
  name,
  icon,
  id,
  ref,
}) {
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={`relative flex flex-col justify-start items-start gap-2 p-1  ${className} `}
    >
      {title && title !== "" && (
        <span
          className={`input_title text-right z-[50] text-purple absolute  p-2 !text-[14px] w-fit transition-all duration-200  ${
            focus || value !== ""
              ? "right-0 top-[-50%] bg-none"
              : "right-[20px] top-[-30%] bg-black"
          }`}
        >
          {title}
        </span>
      )}
      <label
        className={`w-full flex flex-row justify-between items-center border-2 border-solid border-purple rounded-md p-2 cursor-pointer px-1 ${
          focus || value !== "" ? "opacity-100" : "opacity-70"
        }`}
        htmlFor={id}
      >
        <span className="object-cover text-purple">
          <i className="fa-solid fa-upload"></i>
        </span>
      </label>
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        ref={ref}
        value={value}
        onChange={onChange}
        type="file"
        name={name}
        id={id}
        className={`hidden`}
      />
    </div>
  );
}
