import React from "react";
import Image from "next/image";
import { Border } from "@/public/assets/img";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import useMediaQuery from "@/hook/useMediaQuery";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"], weight: "600" });
const HeaderCategory = ({ title, all, banner, style }) => {
  const isAboveScreen = useMediaQuery("(min-width: 1024px)");
  return (
    <div className="flex items-center gap-4 ">
      <h4
        className={`whitespace-nowrap text-xl md:text-2xl 2xl:text-3xl font-bold first-letter:uppercase ${
          style && "uppercase"
        } ${jost.className}`}
      >
        {title}
      </h4>
      {banner && (
        <div>
          <Image src={Border} alt="Graphic decoration" />
        </div>
      )}

      {all && isAboveScreen && (
        <div className="flex items-center gap-2 whitespace-nowrap cursor-pointer">
          <p className={`uppercase text-xs ${jost.className}`}>view all</p>
          <ArrowSmallRightIcon className="h-5 text-main-500" />
        </div>
      )}
    </div>
  );
};

export default HeaderCategory;
