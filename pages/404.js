import React from "react";
import Layout from "@/Layout/Layout";
import Image from "next/image";
import { NotFoundBg } from "@/public/assets/img";
import { Jost } from "next/font/google";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const jost = Jost({ subsets: ["latin"], weight: "500" });

const Errors = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-10 ">
      <div>
        <h5 className="text-4xl font-bold">Oops!</h5>
        <p className="text-gray-600 tracking-wider">
          Home <span className="text-xl font-semibold">-</span> 404
        </p>
      </div>
      <div className="relative lg:mt-6">
        <Image
          src={NotFoundBg}
          className="hidden lg:block"
          alt="graphics decoration"
        />
        <div className="lg:flex lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-y-1/2 lg:-translate-x-1/2 lg:gap-5">
          <h4 className={`${jost.className} text-[100px] text-center`}>404</h4>
          <div className="flex flex-col justify-center lg:flex-row lg:items-center lg:gap-5">
            <div className="text-center lg:text-left">
              <h5 className={`${jost.className} text-[30px]`}>
                Page Not Found
              </h5>
              <p className="whitespace-nowrap text-gray-500 text-xs">
                It looks like nothing was found at this location. Maybe try a
                search?
              </p>
            </div>
            <form
              action=""
              className="m-auto mt-10 md:mt-5 lg:m-0 whitespace-nowrap"
            >
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-b-2 border-black p-2 focus:outline-none text-gray-600"
              />
              <button className="bg-main-500 rounded-full p-3 shadow-md active:scale-95">
                <MagnifyingGlassIcon className="h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Errors;
