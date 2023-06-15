import React from "react";
import HeaderCategory from "@/components/HeaderCategory";
import Image from "next/image";
import { PubliciteTrois } from "@/public/assets/img";
import Hastag from "@/components/Hastag";
import { MenuFR } from "@/constant/constant";
import Link from "next/link";
import {v4 as uuidv4} from "uuid"
import localStorage from "localStorage";
import { ROOT_URL } from "@/env";

const SecondaryMost = ({listCategories, adsVertical}) => {
  const lang = JSON.parse(localStorage.getItem('token')).lang
  return (
    <div className="lg:w-[25%]">
      <HeaderCategory title="Categories" banner />
      <ul>
        {listCategories?.map((category) => (
          <>
            <li onClick={() => window.location = `${ROOT_URL}/${category.id}/${category[lang].toLowerCase()}`}  key={uuidv4()} className="uppercase text-xs font-semibold py-[12px] cursor-pointer transition duration-200 ease-out hover:font-bold hover:text-secondary-500">
              {/* <Link href={menu.href}>
                {menu.k} <span className="font-normal">(10)</span>{" "}
              </Link> */}
              {category[lang]}
            </li>
            <hr />
          </>
        ))}
      </ul>

      {
        adsVertical[0]&&(
          <div className="relative w-full h-[275px]">
            <Hastag style="absolute top-1 z-10  right-1">ads</Hastag>
            <Image
              src={`${ROOT_URL}/images/${adsVertical[0].image_name}.${adsVertical[0].image_extension}`}
              fill
              className="object-contain"
              alt="Publiciter"
            />
          </div>
        )
      }
    </div>
  );
};

export default SecondaryMost;
