import React from "react";
import { Jost } from "next/font/google";
import Title from "@/components/Title";
import { Slide } from "react-slideshow-image";

const jost = Jost({ subsets: ["latin"], weight: "700" });

const Flash = () => {
  const settings = {
    prevArrow: <div />,
    nextArrow: <div />,
    pauseOnHover: true,
    canSwipe: true,
    easing: "ease-out",
    duration: 10000,
    transitionDuration: 5000,
    autoplay: true,
  };

  return (
    <div className="hidden rounded-xl bg-main-500/20  lg:flex lg:items-center lg:justify-center">
      <div className="z-10 rounded-xl  bg-gradient-to-br from-[#D93D59] to-[#D93D59] p-4 tracking-wider">
        <h1
          className={`text-2xl uppercase text-white ${jost.className} leading-6`}
        >
          Flash <br /> Info.
        </h1>
      </div>
      <div className="w-full overflow-x-hidden  px-5">
        <Slide {...settings}>
          <div className="cursor-pointer">
            <Title style="text-lg text-gray-600">
              Lorem ipsum dolor sit amet consectetur
            </Title>
            <p className=" pt-1 text-xs tracking-wide text-gray-600">
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
