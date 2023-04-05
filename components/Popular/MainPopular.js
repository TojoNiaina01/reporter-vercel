import React from "react";
import Image from "next/image";
import DateAuteur from "@/components/DateAuteur";
import Title from "@/components/Title";

const MainPopular = ({ img, date, auteur, titre }) => {
  return (
    <>
      <div className="popular flex gap-4 cursor-pointer group md:flex-col  md:gap-0 lg:flex-row lg:gap-3">
        <div className="relative w-[120px] h-[95px] md:w-full md:h-[120px] lg:w-[110px] lg:h-[90px]">
          <Image
            src={img}
            fill
            className="object-cover"
            alt="Image blog article"
          />
        </div>
        <div className="w-[60%] relative md:w-full mb-auto lg:w-[50%]">
          <Title>{titre}</Title>
          <DateAuteur date={date} auteur={auteur} />
        </div>
      </div>
      <hr className="popularHr w-[90%] hidden lg:block" />
    </>
  );
};

export default MainPopular;
