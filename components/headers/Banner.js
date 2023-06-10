import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Slider from "@/components/headers/Slider";
import Image from "next/image";
import { Publicite } from "@/public/assets/img";
import Hastag from "@/components/Hastag";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {v4 as uuidV4} from 'uuid'

const indicators = (index) => (
  <span className="cursor-pointer p-[4px] bg-gray-300 rounded-full mx-1 indicator xl:p-[5px]" />
);

const settings = {
  prevArrow: (
    <button className="opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 ease-out bg-white active:scale-95 w-10 h-10 shadow-md rounded-full ml-5 ">
      <ChevronLeftIcon color="#3e817d" className="h-4 2xl:h-6 mx-auto" />
    </button>
  ),
  nextArrow: (
    <button className="opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-white active:scale-95 p-3 shadow-md rounded-full mr-5 ">
      <ChevronRightIcon color="#3e817d" className=" h-4 2xl:h-6" />
    </button>
  ),
  pauseOnHover: true,
  canSwipe: true,
  easing: "ease-out",
  duration: 5000,
  transitionDuration: 500,
  indicators: indicators,
  autoplay: true,
};

const Banner = ({dataSlide, adsVertical}) => {

  return (
    <section className="flex gap-4 pt-5 w-full 2xl:justify-between">
      <div className=" w-full lg:w-[70%]  relative group">
        <Slide {...settings}>
          {
            dataSlide?.map((slide) => (
              <Slider key={uuidV4()} dataSlide={slide}/>
            ))
          }
        </Slide>
      </div>

      {
        adsVertical[0]&&<div className="hidden lg:block relative flex-grow h-[450px] 2xl:h-[600px] cursor-pointer max-w-sm bg-black">
        <Hastag style="absolute top-2 z-10  right-4">ads</Hastag>
        <Image
          src={`/uploads/images/${adsVertical[0].image_name}.${adsVertical[0].image_extension}`}
          fill
          className="object-contain"
          alt="Publicité graphics"
        />
      </div>
      }
    </section>
  );
};

export default Banner;
