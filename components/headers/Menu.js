import React, { useRef, useState } from "react";
import { MenuFR } from "@/constant/constant";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Border } from "@/public/assets/img";

const Menu = () => {
  const MenuRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction) => {
    setIsMoved(true);
    if (MenuRef.current) {
      const { scrollLeft, clientWidth } = MenuRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      MenuRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="pt-4 mx-4 md:mx-0">
      <div className="group relative">
        <ChevronLeftIcon
          onClick={() => handleClick("left")}
          className={`h-5 text-main-700 absolute top-0 bottom-0 -left-5 z-10 m-auto w-5 cursor-pointer 
          lg:opacity-0 transition lg:hover:scale-125 group-hover:opacity-100 xl:hidden ${
            !isMoved && "hidden"
          } `}
        />
        <ul
          ref={MenuRef}
          className="flex gap-4 md:gap-5 lg:gap-6 2xl:gap-10  lg:justify-center
          font-semibold overflow-x-scroll scrollbar-hide"
        >
          {MenuFR.map((item) => (
            <li key={uuidv4()}>
              <Link
                href="#"
                className="uppercase whitespace-nowrap text-xs font-semibold tracking-wide hover:text-main-400 transition
                duration-100 ease-in-out 2xl:text-sm"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <ChevronRightIcon
          onClick={() => handleClick("right")}
          className=" text-main-700 h-5 absolute top-0 bottom-0 -right-5 z-10 m-auto
          w-5 cursor-pointer lg:opacity-0 transition lg:hover:scale-125 group-hover:opacity-100 xl:hidden"
        />
      </div>
      <Image src={Border} className="pt-1 w-full" alt="Graphic decoration" />
    </div>
  );
};

export default Menu;
