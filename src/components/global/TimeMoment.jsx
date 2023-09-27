import React, { useEffect, useState } from "react";
import { convertTimeStampToTime } from "../../data/date";
export default function TimeMoment({ date }) {
  const [format, setFormat] = useState(date);
  useEffect(() => {
    if (parseInt(date)) {
      setFormat(convertTimeStampToTime(date));
    }
  }, [date]);
  return <span>{format}</span>;
}
