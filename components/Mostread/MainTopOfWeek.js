import React from "react";
import Image from "next/image";
import Hastag from "@/components/Hastag";
import Title from "@/components/Title";
import DateAuteur from "@/components/DateAuteur";
import Link from "next/link";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";

const MainTopOfWeek = ({ img, category, titre, date, auteur }) => {
  return (
    <div className="group w-[245px] lg:w-full cursor-pointer">
      <div className="relative w-[245px] h-[129px] lg:w-full lg:h-[175px] ">
        <Hastag style="absolute top-2 z-10  left-2">{category}</Hastag>
        <Image
          src={img}
          fill
          className="object-cover"
          alt="Image article blog"
        />
      </div>
      <div className="pt-2">
        <Title style="text-sm pt-1 lg:text-base">{titre}</Title>
        <DateAuteur auteur={auteur} date={date} />
        <Link href="#" className="flex gap-1 items-center pt-1 ">
          <span className="font-semibold hover:font-bold uppercase text-xs transition duration-200 ease-in-out">
            read more
          </span>
          <ArrowSmallRightIcon className="h-5 text-main-500" />
        </Link>
      </div>
    </div>
  );
};

export default MainTopOfWeek;
