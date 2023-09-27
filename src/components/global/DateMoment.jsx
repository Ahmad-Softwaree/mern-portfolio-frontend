import React, { useEffect, useState } from "react";
import { convertTimeStampToMomentMonth } from "../../util/date";

export default function DateMoment({ date }) {
  const [format, setFormat] = useState(date);
  useEffect(() => {
    if (parseInt(date)) {
      setFormat(convertTimeStampToMomentMonth(date));
    }
  }, [date]);

  return format;
}
