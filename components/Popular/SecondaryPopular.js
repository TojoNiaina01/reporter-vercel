import React, { useContext } from "react";
import Image from "next/image";
import { ArticlesContext } from "@/pages";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import DateAuteur from "@/components/DateAuteur";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"], weight: "600" });
const SecondaryPopular = () => {
  const { ArticlePopularSeconde } = useContext(ArticlesContext);

  const { img, titre, date, auteur, description } = ArticlePopularSeconde[0];

  return (
    <div className="pt-3 relative cursor-pointer">
      <div className="relative w-[100%] h-[228px]">
        <Image
          src={img}
          fill
          className="object-cover"
          alt="Image article blog"
        />
      </div>
      <div className="absolute bg-white py-2 px-6 left-4 bottom-0">
        <DateAuteur date={date} auteur={auteur} />
        <h5
          className={` text-base lg:text-xl ${jost.className} lg:group-hover:underline`}
        >
          {titre}
        </h5>
        <p className="text-xs pt-1 text-gray-500 md:text-sm lg:text-base lg:pb-0">
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
