import React from "react";
import HeaderCategory from "@/components/HeaderCategory";
import Image from "next/image";
import { PubliciteTrois } from "@/public/assets/img";
import Hastag from "@/components/Hastag";
import { MenuFR } from "@/constant/constant";
import Link from "next/link";

const SecondaryMost = () => {
  return (
    <div className="lg:w-[25%]">
      <HeaderCategory title="Categories" banner />
      <ul>
        {MenuFR?.map((menu) => (
          <>
            <li className="uppercase text-xs font-semibold py-[12px] cursor-pointer transition duration-200 ease-out hover:font-bold hover:text-secondary-500">
              <Link href={menu.href}>
                {menu.k} <span className="font-normal">(10)</span>{" "}
              </Link>
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
