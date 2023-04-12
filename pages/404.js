import React from "react";
import Layout from "@/Layout/Layout";
import Image from "next/image";
import { NotFoundBg } from "@/public/assets/img";
import { Jost } from "next/font/google";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const jost = Jost({ subsets: ["latin"], weight: "500" });

const Errors = () => {
  return (
    <div className="flex flex-col h-[70vh] items-center justify-center ">
      <h3 className="text-4xl font-bold">Oops</h3>
      <p className="text-gray-600 tracking-wider">
        Home <span className="text-xl font-semibold">-</span> 404
      </p>

      <div className="relative">
        <Image src={NotFoundBg} alt="graphics decoration" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-6">
          <h4 className={`${jost.className} text-[100px]`}>404</h4>
          <div>
            <h5 className={`${jost.className} text-[30px]`}>Page Not Found</h5>
            <p className="whitespace-nowrap text-gray-500">
              It looks like nothing was found at this location. Maybe try a
              search?
            </p>
          </div>
          <div className="flex mt-4 gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-b-2 border-black p-2 focus:outline-none text-gray-600"
            />
            <button className="bg-main-500 rounded-full p-3 shadow-md active:scale-95">
              <MagnifyingGlassIcon className="h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Errors;
