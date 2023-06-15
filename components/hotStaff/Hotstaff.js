import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HotStafImg } from "@/public/assets/img";
import DateAuteur from "@/components/DateAuteur";
import Link from "next/link";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { Jost } from "next/font/google";
import Hastag from "@/components/Hastag";
import HeaderCategory from "@/components/HeaderCategory";
import moment from "moment";
import localStorage from "localStorage";
import { ROOT_URL } from "@/env";

const jost = Jost({ subsets: ["latin"], weight: "500" });

const Hotstaff = ({ dataHot }) => {
  const lang = JSON.parse(localStorage.getItem("token")).lang;
  const [hastag, setHasTag] = useState();

  const linkBeautify = (link) => {
    const newLink = link.replace(/[?%';:,\s\u2019]/g, "-");
    return newLink.toLowerCase()
  };  


  useEffect(() => {
    if (lang === "en") {
      setHasTag(dataHot.category_en);
    } else {
      setHasTag(dataHot.category_fr);
    }
  }, []);

  return (
    <section className="mt-10">
      <HeaderCategory title="Hot Staff" banner />
      <div className="lg:flex">
        <Image
          src={`${ROOT_URL}/images/${dataHot.image[0].image_name}.${dataHot.image[0].image_extension}`}
          className="w-full object-cover md:h-[500px] lg:h-[400px] lg:w-[50%] xl:w-[60%] 2xl:w-full "
          alt="Image article blog"
          width={1200}
          height={592}
        />
        <div className="relative -top-10 bg-main-400 lg:-top-0 lg:h-[400px] lg:w-[70%]">
          <Hastag
            style="absolute top-2 z-10  left-4"
            text="text-black bg-white"
          >
            {hastag}
          </Hastag>
          <div className="absolute -top-[40px] left-0 right-0 mx-auto h-0 w-0 border-b-[40px] border-l-[35px] border-r-[35px] border-b-main-400 border-l-transparent border-r-transparent lg:hidden" />
          <div className="absolute -left-[40px] top-1/2 hidden h-0 w-0 -translate-y-1/2 border-b-[35px]  border-r-[40px] border-t-[35px] border-b-transparent border-r-main-400 border-t-transparent lg:block" />

          <div className="w-full  p-10 text-white md:p-14 ">
            <h6 className={`text-3xl tracking-wide ${jost.className}`}>
              {dataHot.title.length > 50
                ? `${dataHot.title.substring(0, 50)}...`
                : dataHot.title}
            </h6>
            <p className="py-4 text-sm tracking-wide text-gray-200">
              {dataHot.description.length > 255
                ? `${dataHot.description.substring(0, 255)}`
                : dataHot.description}
            </p>
            <hr className="pb-4 text-white " />
            <DateAuteur
              style="text-gray-300 text-sm lg:text-xs"
              date={dataHot.created_at}
              auteur={dataHot.author}
            />

            <Link href={`/article/${dataHot.id}/${linkBeautify(dataHot.title)}`} className="flex items-center gap-1 pt-3 lg:pt-6">
              <span className={`uppercase tracking-wide ${jost.className}`}>
                Explorer
              </span>
              <ArrowSmallRightIcon className="h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hotstaff;
