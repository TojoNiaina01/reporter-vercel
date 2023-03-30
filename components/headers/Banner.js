import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Slider from "@/components/headers/Slider";
import Image from "next/image";
import { Publicite } from "@/public/assets/img";
import Category from "@/components/headers/Category";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const indicators = (index) => (
  <span className="cursor-pointer p-[6px] bg-gray-300 rounded-full mx-1 indicator" />
);

const settings = {
  prevArrow: (
    <button className="bg-white active:scale-95 w-10 h-10 shadow-md rounded-full ml-5 ">
      <ChevronLeftIcon color="#3e817d" className="h-5 2xl:h-6 mx-auto" />
    </button>
  ),
  nextArrow: (
    <button className="bg-white active:scale-95 p-3 shadow-md rounded-full mr-5 ">
      <ChevronRightIcon color="#3e817d" className=" h-4 2xl:h-6" />
    </button>
  ),
  pauseOnHover: true,
  // canSwipe: true,
  easing: "ease-out",
  duration: 7000,
  transitionDuration: 500,
  indicators: indicators,
  autoplay: false,
};

const Banner = () => {
  return (
    <section className="flex gap-4 pt-5 w-full">
      <div className=" w-full lg:w-[70%]  relative">
        <Slide {...settings}>
          <Slider />
          <Slider />
          <Slider />
          <Slider />
        </Slide>
      </div>

      <div className="hidden lg:block relative flex-grow h-[450px] 2xl:h-[600px] cursor-pointer">
        <Category title="ads" style="absolute top-2 z-10  right-4" />
        <Image
          src={Publicite}
          fill
          className="object-cover"
          alt="Publicité graphics"
        />
      </div>
    </section>
  );
};

export default Banner;
