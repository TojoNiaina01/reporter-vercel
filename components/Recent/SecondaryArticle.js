import React from "react";
import Image from "next/image";
import { Jost } from "next/font/google";
import DateAuteur from "@/components/DateAuteur";
const jost = Jost({ subsets: ["latin"], weight: "600" });
const Secondary = ({ img, date, auteur, titre }) => {
  return (
    <div className="w-[210px] group cursor-pointer">
      <div className="relative w-[210px] h-[103px]">
        <Image
          src={img}
          fill
          className="object-cover"
          alt="Image article blog"
        />
      </div>
      <DateAuteur date={date} auteur={auteur} />
      <hr />
      <h5
        className={` text-sm md:text-base  ${jost.className} lg:group-hover:underline lg:pt-1`}
      >
        {titre}
      </h5>
    </div>
  );
};

export default Secondary;
