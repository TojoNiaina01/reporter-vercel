import React from "react";
import Image from "next/image";
import Hastag from "@/components/Hastag";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import DateAuteur from "@/components/DateAuteur";
import Title from "@/components/Title";
import { v4 as uuidv4 } from "uuid";

const MainArticle = ({
  img,
  category,
  titre,
  description,
  date,
  auteur,
  id,
}) => {
  return (
    <div
      key={uuidv4()}
      className="group flex items-center gap-2 border-[1px] border-gray-200 rounded cursor-pointer md:gap-5"
    >
      <div className="relative w-[50%] h-[200px] md:w-[40%] lg:w-[35%]">
        <Hastag style="absolute top-2 z-10  left-4"> {category} </Hastag>
        <Image
          src={img}
          fill
          className="object-cover"
          alt="Image article blog"
        />
      </div>
      <div className="w-[55%] lg:pt-0">
        <Title>{titre}</Title>
        <p className="text-xs pt-1 pb-2  text-gray-500 md:p md:text-sm lg:text-base lg:pb-0">
          {description}
        </p>
        <div className="flex items-center gap-6">
          <hr className="flex-grow" />
          <button className="hidden lg:block rounded-full bg-secondary-500 p-2 shadow-md active:scale-95">
            <ChevronRightIcon className="text-white w-4 h-4 " />
          </button>
        </div>
        <DateAuteur date={date} auteur={auteur} />
      </div>
    </div>
  );
};

export default MainArticle;
