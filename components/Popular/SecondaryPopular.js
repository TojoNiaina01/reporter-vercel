import React, { useContext } from "react";
import Image from "next/image";
import { ArticlesContext } from "@/pages";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import DateAuteur from "@/components/DateAuteur";
import Title from "@/components/Title";

const SecondaryPopular = () => {
  const { ArticlePopularSeconde } = useContext(ArticlesContext);

  const { img, titre, date, auteur, description } = ArticlePopularSeconde[0];

  return (
    <div className="pt-3 relative cursor-pointer lg:w-[70%]">
      <div className="relative w-full h-[228px] md:h-[270px] lg:w-full lg:h-full">
        <Image
          src={img}
          fill
          className="object-cover"
          alt="Image article blog"
        />
      </div>
      <div className="absolute bg-white w-[65%] py-2 px-4 md:px-6 left-4 bottom-0 md:w-[45%] md:left-9 lg:w-[50%]">
        <DateAuteur date={date} auteur={auteur} />
        <Title>{titre}</Title>
        <p className="text-xs pt-1 text-gray-500 md:text-sm 2xl:text-base lg:pb-0">
          {description}
        </p>

        <div className="pt-5 inline-flex gap-2 items-center">
          <p className="uppercase text-[10px] font-semibold">read more</p>
          <ArrowRightIcon className="w-4 h-4 text-main-500" />
        </div>
      </div>
    </div>
  );
};

export default SecondaryPopular;
