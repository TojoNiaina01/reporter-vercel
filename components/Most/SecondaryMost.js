import React from "react";
import HeaderCategory from "@/components/HeaderCategory";
import Image from "next/image";
import { PubliciteTrois } from "@/public/assets/img";
import Hastag from "@/components/Hastag";

const SecondaryMost = () => {
  const categories = [
    { name: "Politique", number: 15 },
    { name: "video", number: 23 },
    { name: "Economie", number: 34 },
    { name: "Social", number: 5 },
    { name: "Sport", number: 51 },
    { name: "Le monde et Madagascar", number: 8 },
    { name: "Culture", number: 29 },
    { name: "Life Art", number: 29 },
  ];

  return (
    <div className="lg:w-[25%]">
      <HeaderCategory title="Categories" />
      <ul>
        {categories?.map(({ name, number }) => (
          <>
            <li className="uppercase text-xs font-semibold py-[15px] cursor-pointer transition duration-200 ease-out hover:font-bold hover:text-main-600">
              {name} <span className="font-normal">({number})</span>
            </li>
            <hr />
          </>
        ))}
      </ul>

      <div className="relative w-full h-[275px]">
        <Hastag style="absolute top-1 z-10  right-1">ads</Hastag>
        <Image
          src={PubliciteTrois}
          fill
          className="object-cover"
          alt="Publiciter"
        />
      </div>
    </div>
  );
};

export default SecondaryMost;
