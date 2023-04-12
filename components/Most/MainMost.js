import React from "react";
import Image from "next/image";
import Title from "@/components/Title";
import DateAuteur from "@/components/DateAuteur";
import HeaderCategory from "@/components/HeaderCategory";
import Hastag from "@/components/Hastag";
import { v4 as uuidv4 } from "uuid";

const MainMost = ({ img, date, titre, auteur, category }) => {
  return (
    <div
      key={uuidv4()}
      className="group relative border-[1px] border-gray-300 rounded cursor-pointer"
    >
      <Hastag style="absolute top-1 z-10  left-1">{category}</Hastag>
      <div className="relative w-full h-[100px] md:h-[150px] lg:w-full lg:h-[200px]">
        <Image
          src={img}
          fill
          className="object-cover"
          alt="Article image blog"
        />
      </div>
      <div className="p-2">
        <Title style="text-sm lg:text-base">{titre}</Title>
        <hr />
        <DateAuteur date={date} auteur={auteur} />
      </div>
    </div>
  );
};

export default MainMost;
