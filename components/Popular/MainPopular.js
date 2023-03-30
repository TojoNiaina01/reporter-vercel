import React from "react";
import Image from "next/image";
import { ArticlePopularOne } from "@/public/assets/img";
import { Jost } from "next/font/google";
import DateAuteur from "@/components/DateAuteur";

const jost = Jost({ subsets: ["latin"], weight: "600" });

const MainPopular = ({ img, date, auteur, titre }) => {
  return (
    <div className="popular flex gap-4 md:flex-col md:gap-0 cursor-pointer group">
      <div className="relative w-[120px] md:w-full h-[95px] md:h-[120px]">
        <Image
          src={img}
          fill
          className="object-cover"
          alt="Image blog article"
        />
      </div>
      <div className="w-[60%] relative md:w-full mb-auto">
        <h5
          className={`text-base pb-3 md:pb-0 md:pt-2 leading-5 ${jost.className} lg:group-hover:underline`}
        >
          {titre}
        </h5>
        <DateAuteur date={date} auteur={auteur} />
      </div>
    </div>
  );
};

export default MainPopular;
