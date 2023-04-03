import React from "react";
import Category from "@/components/headers/Category";
import Image from "next/image";
import { ArticleDemo } from "@/public/assets/img";
import { Jost } from "next/font/google";
import DateAuteur from "@/components/DateAuteur";

const jost = Jost({ subsets: ["latin"], weight: "400" });

const Slider = () => {
  return (
    <div className="relative mx-3 border-[1px] border-gray-300 rounded-md shadow-md md:border-0 md:shadow-none md:h-[550px]  lg:mx-0 2xl:h-[700px]">
      <Category title="politique" style="absolute top-2 z-10  left-4 " />
      {/*<div className="relative">*/}
      <div className="relative w-full h-[240px] md:h-[450px] 2xl:h-[600px] max-w-5xl">
        <Image
          src={ArticleDemo}
          fill
          alt="Article"
          className="object-cover"
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
        <div
          className="bg-white px-6 py-4 w-full
        md:w-fit md:px-10 md:absolute md:-bottom-24 md:right-1/2 md:translate-x-1/2 md:border-2 md:border-gray-200 z-50  rounded "
        >
          <DateAuteur date="JUL 06.2021" auteur="VINAGO" />
          <h3
            className={` text-[30px]  lg:text-3xl font-semibold  whitespace-nowrap 2xl:text-4xl ${jost.className}`}
          >
            Réforme des Retraites
          </h3>
          <p className=" text-sm leading-5  text-gray-500 tracking-wide pb-4 break-normal 2xl:text-base">
            Journée décisive pour la réforme des retraites : des manifestations
            partout en France tandis que la commission mixte paritaire entame
            ses travaux
          </p>
          <button className="text-white px-6 py-3 bg-main-400 rounded-full shadow-lg #F9E0E5 hover:underline active:scale-95">
            Read more
          </button>
        </div>
      </div>
      {/*</div>*/}
    </div>
  );
};

export default Slider;
