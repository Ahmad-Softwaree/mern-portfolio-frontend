import React, { useState } from "react";

export default function PasswordInput({
  name,
  value,
  onChange,
  placeholder,
  title,
  className,
  under,
}) {
  const [show, setShow] = useState(false);
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={`relative flex flex-col justify-start items-start gap-2 p-1 ${className}`}
    >
      {title && title !== "" && (
        <span
          className={`input_title text-right z-[50] text-purple absolute  p-2 !text-[14px] w-fit transition-all duration-200 ${
            focus || value !== ""
              ? "right-0 top-[-70%] bg-none"
              : "right-[20px] top-[-30%] bg-lightBlack"
          }`}
        >
          {title}
        </span>
      )}
      <div
        className={`w-full flex flex-row justify-between items-center border-2 border-solid border-purple rounded-md px-1 ${
          focus || value !== "" ? "opacity-100" : "opacity-70"
        }`}
      >
        <span
          className="!text-[14px] cursor-pointer"
          onClick={() => setShow((prev) => !prev)}
        >
          <i className={`fa-solid ${show ? "fa-eye" : "fa-eye-slash"}`}></i>
        </span>
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`p-2 w-full text-left placeholder:text-right bg-lightBlack`}
          type={show ? "text" : "password"}
          name={name}
          id={name}
          onChange={onChange}
          value={value}
        />
      </div>
      {under && (
        <span className="absolute top-[100%] right-3 w-full text-right text-red-500 text-[12px]">
          {under}*
        </span>
      )}
    </div>
  );
}
