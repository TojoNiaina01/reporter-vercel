import React from "react";
import Image from "next/image";
import DateAuteur from "@/components/DateAuteur";
import Title from "@/components/Title";

const MainPopular = ({ img, date, auteur, titre, styleHidden, dateStyle }) => {
  return (
    <>
      <div
        className={`${
          !styleHidden ? "" : "popular"
        } flex gap-2 py-2 cursor-pointer group md:flex-col  md:gap-0 md:py-0 lg:flex-row lg:gap-3`}
      >
        <div className="relative w-[120px] h-[95px] md:w-full md:h-[120px] lg:w-[110px] lg:h-[90px]">
          <Image
            src={img}
            fill
            className="object-cover"
            alt="Image blog article"
          />
        </div>
        <div className="w-[60%] relative md:w-full lg:w-[50%] flex flex-col">
          <Title style={`md:order-2 md:py-2 lg:order-1  lg:py-0`}>
            {titre}
          </Title>
          <DateAuteur
            style={`text-secondary-500 md:order-1 ${
              !dateStyle ? "" : "lg:pt-0"
            } pt-2 lg:order-2`}
            date={date}
            auteur={auteur}
          />
        </div>
      </div>
      <hr className="popularHr w-[90%] hidden lg:block" />
    </>
  );
};

export default MainPopular;
