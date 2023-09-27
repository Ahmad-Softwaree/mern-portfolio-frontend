import React from "react";
export default function RefreshData({ setter }) {
  return (
    <span
      data-aos="fade-right"
      data-aos-offset="-300"
      className="text-white !text-[30px] cursor-pointer transition-all duration-300 hover:text-purple"
      onClick={setter}
    >
      <i className="fa-solid fa-arrows-rotate"></i>
    </span>
  );
}
