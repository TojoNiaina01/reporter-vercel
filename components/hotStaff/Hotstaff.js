import React, {useState, useEffect} from "react";
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

const jost = Jost({ subsets: ["latin"], weight: "500" });

const Hotstaff = ({dataHot}) => {
  const lang = JSON.parse(localStorage.getItem('token')).lang
  const [hastag, setHasTag] = useState()

  useEffect(() => {
    if(lang === 'en'){
      setHasTag(dataHot.category_en)
    }else{
      setHasTag(dataHot.category_fr)
    }
  },[])


  return (
    <section className="mt-10">
      <HeaderCategory title="Hot Staff" banner />
      <div className="lg:flex">
        <Image
          src={`/uploads/images/${dataHot.image[0].image_name}.${dataHot.image[0].image_extension}`}
          className="w-full md:h-[500px] object-cover lg:h-[400px] "
          alt="Image article blog"
          width={1200}
          height={592}
          
        />
        <div className="relative -top-10 lg:-top-0 bg-main-400 lg:w-[80%] lg:h-[400px]">
          <Hastag
            style="absolute top-2 z-10  left-4"
            text="text-black bg-white"
          >
            {hastag}
          </Hastag>
          <div className="w-0 h-0 mx-auto border-l-[35px] border-l-transparent border-b-[40px] border-b-main-400 border-r-[35px] border-r-transparent absolute -top-[40px] right-0 left-0 lg:hidden" />
          <div className="hidden lg:block w-0 h-0 border-t-[35px] border-t-transparent border-r-[40px] border-r-main-400  border-b-[35px] border-b-transparent absolute top-1/2 -left-[40px] -translate-y-1/2" />
          <div className="w-full  text-white p-10 md:p-14 ">
            <h6 className={`text-3xl tracking-wide ${jost.className}`}>
            {dataHot.title.length > 50 ? `${dataHot.title.substring(0,50)}...` : dataHot.title}
            </h6>
            <p className="text-sm py-4 text-gray-200 tracking-wide">
            {dataHot.description.length > 255 ? `${dataHot.description.substring(0,255)}` : dataHot.description}
            </p>
            <hr className="text-white pb-4 " />
            <DateAuteur
              style="text-gray-300 text-sm lg:text-xs"
              date={moment(dataHot.created_at).format('MMMM Do YYYY')} 
              auteur={dataHot.author}
            />

            <Link href="#" className="flex gap-1 pt-3 items-center lg:pt-6">
              <span className={`uppercase ${jost.className}`}>read more</span>
              <ArrowSmallRightIcon className="h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hotstaff;
