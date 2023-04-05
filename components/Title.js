import React from "react";

import { Jost } from "next/font/google";
const jost = Jost({ subsets: ["latin"], weight: "600" });

const Title = ({ children, style }) => {
  return (
    <h5
      className={`${style ? style : "text-base"} md:pt-2 leading-5 ${
        jost.className
      } lg:group-hover:underline`}
    >
      {children}
    </h5>
  );
};

export default Title;
