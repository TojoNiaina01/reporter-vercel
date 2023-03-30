import React from "react";

const Category = ({ title, style }) => {
  return (
    <span
      className={`text-white bg-main-500 px-2 text-xs font-semibold tracking-wide uppercase ${style}`}
    >
      {title}
    </span>
  );
};

export default Category;
