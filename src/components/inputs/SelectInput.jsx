import React, { useState } from "react";

export default function SelectInput({
  icon,
  name,
  value,
  onChange,
  placeholder,
  title,
  className,
  defaultOption,
  options,
}) {
  const [focus, setFocus] = useState(false);
  return (
    <div
      className={`relative flex flex-col justify-start items-start gap-2 p-1  ${className}`}
    >
      {title && title !== "" && (
        <span
          className={`input_title text-right z-[50] text-blue absolute  p-2 text-[14px] w-fit transition-all duration-200 ${
            focus || (value !== "" && value !== "default")
              ? "right-0 top-[-50%] bg-none"
              : "right-[20px] top-[-20%] bg-white"
          }`}
        >
          {title}
        </span>
      )}
      <div
        className={`w-full flex flex-row justify-between items-center border-2 border-solid border-blue rounded-md px-1 ${
          focus || (value !== "" && value !== "default")
            ? "opacity-100"
            : "opacity-70"
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
        <select
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`p-2 w-full text-left placeholder:text-right transition-all duration-300`}
          type="date"
          name={name}
          id={name}
          onChange={onChange}
          value={value}
        >
          <option value=""></option>
          {options.map((val, index) => {
            return (
              <option value={val.value} key={index}>
                {val.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}