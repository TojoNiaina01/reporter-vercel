import React from "react";

const Hastag = ({ children, style, text }) => {
  return (
    <span
      className={`${
        text ? text : "text-white bg-main-500"
      } px-2 text-xs font-semibold tracking-wide uppercase ${style}`}
    >
      {children}
    </span>
  );
};

export default Hastag;
