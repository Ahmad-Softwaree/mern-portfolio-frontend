import React, { useEffect, useState } from "react";
import {
  convertTimeStampToDate,
  convertTimeStampToDateWithoutZero,
} from "../../util/date";
import { Checkbox } from "@chakra-ui/react";

export default function FullDateInput({
  icon,
  name,
  value = "",
  onChange,
  placeholder,
  title,
  className,
}) {
  const [focus, setFocus] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    if (value === "") {
      if (
        year !== "" &&
        month !== "" &&
        day !== "" &&
        year !== "default" &&
        month !== "default" &&
        day !== "default"
      ) {
        let date = convertTimeStampToDate(new Date(year, month, day));
        onChange(date);
      }
    }
  }, [year, month, day]);

  useEffect(() => {
    if (value !== "") {
      let date = convertTimeStampToDateWithoutZero(value);
      setYear(date.split("-")[0]);
      setMonth(date.split("-")[1]);
      setDay(date.split("-")[2]);
    }
  }, [value]);

  return (
    <div
      className={`flex flex-col justify-center items-center gap-2 ${className}`}
    >
      <div
        className={`flex flex-row justify-between items-center gap-5 w-full`}
      >
        <div
          className={`relative flex h-[50px] flex-col justify-start items-start gap-2 p-1 w-[30%]`}
        >
          <span
            className={`input_title text-right z-[50] text-purple absolute  p-2 !text-[12px] w-fit transition-all duration-200 ${
              focus === "year" || (year !== "" && year !== "default")
                ? "right-0 top-[-50%] bg-none"
                : "right-[20px] top-[-20%] bg-black"
            }`}
          >
            Year
          </span>

          <select
            onFocus={() => setFocus("year")}
            onBlur={() => setFocus("")}
            className={`w-full flex flex-row justify-between items-center border-2 text-white bg-black border-solid border-purple rounded-md px-1 h-full ${
              focus === "year" || (year !== "" && year !== "default")
                ? "opacity-100"
                : "opacity-70"
            }`}
            name="year"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="default"></option>
            {Array.from(
              { length: new Date().getFullYear() },
              (_, index) => index + 1
            )
              .reverse()
              .map((val, index) => {
                return (
                  <option key={index} value={val}>
                    {val}
                  </option>
                );
              })}
          </select>
        </div>

        <div
          className={`relative flex h-[50px] flex-col justify-start items-start gap-2 p-1 w-[30%]`}
        >
          <span
            className={`input_title text-right z-[50] text-purple absolute  p-2 !text-[12px] w-fit transition-all duration-200 ${
              focus === "month" || (month !== "" && month !== "default")
                ? "right-0 top-[-50%] bg-none"
                : "right-[20px] top-[-20%] bg-black"
            }`}
          >
            Month
          </span>

          <select
            onFocus={() => setFocus("month")}
            onBlur={() => setFocus("")}
            className={`w-full flex flex-row justify-between items-center border-2 border-solid text-white bg-black border-purple rounded-md px-1 h-full ${
              focus === "month" || (month !== "" && month !== "default")
                ? "opacity-100"
                : "opacity-70"
            }`}
            value={month}
            name="month"
            id="month"
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="default"></option>
            {Array.from({ length: 12 }, (_, index) => index + 1)
              .reverse()
              .map((val, index) => {
                return (
                  <option key={index} value={val - 1}>
                    {val}
                  </option>
                );
              })}
          </select>
        </div>

        <div
          className={`relative flex h-[50px] flex-col justify-start items-start gap-2 p-1 w-[30%]`}
        >
          <span
            className={`input_title text-right z-[50] text-purple absolute  p-2 !text-[12px] w-fit transition-all duration-200 ${
              focus === "day" || (day !== "" && day !== "default")
                ? "right-0 top-[-50%] bg-none"
                : "right-[20px] top-[-20%] bg-black"
            }`}
          >
            Day
          </span>

          <select
            onFocus={() => setFocus("day")}
            onBlur={() => setFocus("")}
            className={`w-full flex flex-row justify-between items-center border-2 border-solid text-white bg-black border-purple rounded-md px-1 h-full ${
              focus === "day" || (day !== "" && day !== "default")
                ? "opacity-100"
                : "opacity-70"
            }`}
            value={day}
            name="day"
            id="day"
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="default"></option>
            {Array.from({ length: 31 }, (_, index) => index + 1)
              .reverse()
              .map((val, index) => {
                return (
                  <option key={index} value={val}>
                    {val}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      <Checkbox
        onChange={(e) => {
          if (e.target.checked) {
            setYear(new Date().getFullYear());
            setMonth(new Date().getMonth());
            setDay(new Date().getDate());
          } else {
            setYear("");
            setMonth("");
            setDay("");
          }
        }}
        className="!text-[12px] md:!text-[12px] w-full"
      >
        Now
      </Checkbox>
    </div>
  );
}
