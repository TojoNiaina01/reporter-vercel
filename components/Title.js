import React from "react";

import { Jost } from "next/font/google";
const jost = Jost({ subsets: ["latin"], weight: "600" });

const Title = ({ children, style }) => {
  return (
    <h5
      className={`${
        style ? style : " text-gray-800 text-base md:pt-2 leading-6"
      }   lg:group-hover:underline lg:leading-6 ${jost.className} `}
    >
      {children}
    </h5>
  );
};

export default Title;
