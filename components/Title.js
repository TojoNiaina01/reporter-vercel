import React from "react";
import Image from "next/image";
import { Border } from "@/public/assets/img";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"], weight: "600" });
const Title = ({ title }) => {
  return (
    <div className="flex items-center gap-4 ">
      <h4
        className={`whitespace-nowrap text-xl md:text-2xl 2xl:text-3xl font-bold ${jost.className}`}
      >
        {title}
      </h4>
      <div>
        <Image src={Border} alt="Graphic decoration" />
      </div>
    </div>
  );
};

export default Title;
