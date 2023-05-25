import React from "react";
import { Jost } from "next/font/google";
import Title from "@/components/Title";
import { Slide } from "react-slideshow-image";
const jost = Jost({ subsets: ["latin"], weight: "700" });

const Flash = () => {
  const settings = {
    prevArrow: <div></div>,
    nextArrow: <div></div>,
    pauseOnHover: true,
    canSwipe: true,
    easing: "ease-out",
    duration: 10000,
    transitionDuration: 5000,
    autoplay: true,
  };

  return (
    <div className="hidden bg-main-500/20 rounded-xl lg:flex lg:items-center overflow-x-hidden">
      <div className="bg-gradient-to-br from-[#D93D59]  to-[#D93D59] p-4 rounded-xl tracking-wider z-10">
        <h1
          className={`uppercase text-white text-2xl ${jost.className} leading-6`}
        >
          Flash <br /> Info.
        </h1>
      </div>
      <div className="w-full px-5">
        <Slide {...settings}>
          <div className="group cursor-pointer">
            <Title style="text-lg text-gray-600">
              Lorem ipsum dolor sit amet consectetur
            </Title>
            <p className="text-xs text-gray-600 max-w-lg tracking-wide pt-1">
              A breakdown or a flat tire can happen to anyone at any time, and
              what you have in your car can make the difference between getting
              back on the ...
            </p>
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default Flash;
