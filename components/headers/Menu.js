import React, { useRef, useState } from "react";
import { MenuFR } from "@/constant/constant";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Border } from "@/public/assets/img";

const Menu = () => {
  return (
    <div className="pt-4 mx-4 md:mx-0 select-none">
      <ul
        className="flex gap-4 md:gap-5 lg:gap-4 xl:justify-between
          font-semibold overflow-x-scroll scrollbar-hide"
      >
        {MenuFR.map((item) => (
          <li key={uuidv4()}>
            <Link
              href={`${item.href}`}
              className="uppercase whitespace-nowrap text-xs font-semibold tracking-wide hover:text-main-400 transition
                duration-100 ease-in-out 2xl:text-sm"
            >
              {item.k}
            </Link>
          </li>
        ))}
      </ul>
      <Image src={Border} className="pt-1 w-full" alt="Graphic decoration" />
    </div>
  );
};

export default Menu;
