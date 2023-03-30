import React from "react";
import Image from "next/image";
import { ArticleOne } from "@/public/assets/img";

import { Jost } from "next/font/google";
import Category from "@/components/headers/Category";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import DateAuteur from "@/components/DateAuteur";

const jost = Jost({ subsets: ["latin"], weight: "600" });

const MainArticle = ({ img, category, titre, description, date, auteur }) => {
  return (
    <div className="group flex items-center gap-2 border-[1px] border-gray-200 rounded cursor-pointer md:gap-5 mg:gap-7">
      <div className=" flex-1 h-[200px] md:w-[40%] lg:w-[30%] lg:h-[200px]">
        <div className="relative w-full h-full">
          <Category title={category} style="absolute top-2 z-10  left-4" />
          <Image
            src={img}
            fill
            className="object-cover "
            alt="Image article blog"
          />
        </div>
      </div>
      <div className="w-[55%] pt-4 md:w-[50%] lg:w-[60%] lg:mr-2 lg:pt-0">
        <h5
          className={` text-sm md:text-lg md:leading-6 lg:leading-normal lg:text-xl ${jost.className} lg:group-hover:underline`}
        >
          {titre}
        </h5>
        <p className="text-xs pt-1 pb-2  text-gray-500 md:p md:text-sm lg:text-base lg:pb-0">
          {description}
        </p>
        <div className="flex items-center gap-6">
          <hr className="flex-grow" />
          <button className="hidden lg:block rounded-full bg-main-700 p-2 shadow-md active:scale-95">
            <ChevronRightIcon className="text-white w-4 h-4 " />
          </button>
        </div>
        <DateAuteur date={date} auteur={auteur} />
      </div>
    </div>
  );
};

export default MainArticle;
