import React from "react";
import { Jost } from "next/font/google";
import Title from "@/components/Title";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";

const jost = Jost({ subsets: ["latin"], weight: "700" });

const Flash = () => {
  return (
    <div className="hidden bg-main-500/20 rounded-xl lg:flex lg:items-center overflow-x-hidden">
      <div className="bg-gradient-to-br from-[#D93D59]  to-[#D93D59] p-4 rounded-xl tracking-wider z-10">
        <h1
          className={`uppercase text-white text-2xl ${jost.className} leading-6`}
        >
          Flash <br /> Info.
        </h1>
      </div>
      <div className="w-full flex items-center justify-between mx-6 animate-marquee -z-10">
        <div>
          <Title style="text-lg text-gray-600">
            Lorem ipsum dolor sit amet consectetur
          </Title>
          <p className="text-xs text-gray-600 max-w-lg tracking-wide pt-1">
            A breakdown or a flat tire can happen to anyone at any time, and
            what you have in your car can make the difference between getting
            back on the ...
          </p>
        </div>
      </div>
        <button className="bg-main-400 rounded-full p-2 mr-4">
          <ArrowSmallRightIcon className="h-5 text-gray-300" />
        </button>
    </div>


  );
};

export default Flash;
