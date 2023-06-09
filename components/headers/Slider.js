import React, { useState, useEffect } from "react";
import Hastag from "@/components/Hastag";
import Image from "next/image";
import { ArticleDemo } from "@/public/assets/img";
import { Jost } from "next/font/google";
import DateAuteur from "@/components/DateAuteur";
import localStorage from "localStorage";
import { useRouter } from "next/router";
import moment from "moment";
//const frLocale = require('moment/locale/fr');

const jost = Jost({ subsets: ["latin"], weight: "400" });

const Slider = ({ dataSlide }) => {
  const router = useRouter();
  const lang = JSON.parse(localStorage.getItem("token")).lang;
  const [hastag, setHasTag] = useState();
  const linkBeautify = (link) => {
    const newLink = link.replace(/[';:,\s\u2019]/g, "-");
    return newLink.toLowerCase();
  };

  useEffect(() => {
    if (lang === "en") {
      setHasTag(dataSlide.category_en);
    } else {
      setHasTag(dataSlide.category_fr);
    }
  }, []);

  const pushToArticleHandler = () => {
    router.push(`/article/${dataSlide.id}/${linkBeautify(dataSlide.title)}`);
  };

  return (
    <div className="relative mx-3 rounded-md border-[1px] border-gray-300 shadow-md md:h-[550px] md:border-0 md:shadow-none  lg:mx-0 2xl:h-[700px]">
      <Hastag style="absolute top-2 z-10  left-4 bg-main-400">{hastag}</Hastag>
      <div className="relative max-w-6xl">
        <div className="relative h-[240px] w-full md:h-[450px] 2xl:h-[600px] ">
          <Image
            src={`/uploads/images/${dataSlide.image[0].image_name}.${dataSlide.image[0].image_extension}`}
            fill
            alt="Article"
            className="object-cover"
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>
        <div
          className="z-50 w-full rounded bg-white
        px-6 py-4 md:absolute md:-bottom-24 md:right-1/2 md:w-fit md:translate-x-1/2 md:border-2 md:border-gray-200 md:px-10  lg:w-[70%] "
        >
          <DateAuteur
            date={moment(dataSlide.created_at).format("MMMM Do YYYY")}
            auteur={dataSlide.author}
          />
          <h3
            className={`  text-[30px] font-semibold  lg:text-3xl 2xl:text-4xl ${jost.className}`}
          >
            {dataSlide.title.length > 50
              ? `${dataSlide.title.substring(0, 50)}...`
              : dataSlide.title}
          </h3>
          <p className=" break-normal pb-4  text-sm leading-5 tracking-wide text-gray-500 2xl:text-base">
            {dataSlide.description.length > 255
              ? `${dataSlide.description.substring(0, 255)}`
              : dataSlide.description}
          </p>
          <button
            onClick={pushToArticleHandler}
            className="#F9E0E5 rounded-full bg-main-400 px-6 py-3 text-white shadow-lg hover:underline active:scale-95"
          >
            {lang === "en" ? "Read More" : "Voir plus"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
