import React from "react";
import Image from "next/image";
import { HotStafImg } from "@/public/assets/img";
import DateAuteur from "@/components/DateAuteur";
import Link from "next/link";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { Jost } from "next/font/google";
import Hastag from "@/components/Hastag";
import HeaderCategory from "@/components/HeaderCategory";

const jost = Jost({ subsets: ["latin"], weight: "500" });

const Hotstaff = () => {
  return (
    <section className="mt-10">
      <HeaderCategory title="Hot Staff" banner />
      <div className="lg:flex">
        <Image
          src={HotStafImg}
          className="w-full md:h-[500px] object-cover lg:h-[400px] "
          alt="Image article blog"
        />
        <div className="relative -top-10 lg:-top-0 bg-main-500 lg:w-[80%] lg:h-[400px]">
          <Hastag
            style="absolute top-2 z-10  left-4"
            text="text-black bg-white"
          >
            Social
          </Hastag>
          <div className="w-0 h-0 mx-auto border-l-[35px] border-l-transparent border-b-[40px] border-b-main-500 border-r-[35px] border-r-transparent absolute -top-[40px] right-0 left-0 lg:hidden" />
          <div className="hidden lg:block w-0 h-0 border-t-[35px] border-t-transparent border-r-[40px] border-r-main-500  border-b-[35px] border-b-transparent absolute top-1/2 -left-[40px] -translate-y-1/2" />
          <div className="w-full  text-white p-10 md:p-14 ">
            <h6 className={`text-3xl tracking-wide ${jost.className}`}>
              The best solutions for the interior of a bedroom in an apartment
            </h6>
            <p className="text-sm py-4 text-gray-200 tracking-wide">
              A breakdown or a flat tire can happen to anyone at any time, and
              what you have in your car can make the difference between getting
              back ...
            </p>
            <hr className="text-white pb-4 " />
            <DateAuteur
              style="text-gray-300 text-sm lg:text-xs"
              date="JUL 06.2021"
              auteur="vinago"
            />

            <Link href="#" className="flex gap-1 pt-3 items-center lg:pt-6">
              <span className={`uppercase ${jost.className}`}>read more</span>
              <ArrowSmallRightIcon className="h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hotstaff;
