import React from "react";
import Image from "next/image";
import DateAuteur from "@/components/DateAuteur";
import Title from "@/components/Title";
const Secondary = ({ img, date, auteur, titre, id }) => {
  return (
    <div key={id} className="w-full lg:w-[210px] group cursor-pointer">
      <div className="relative w-[210px] h-[103px] lg:w-full">
        <Image
          src={img}
          fill
          className="object-cover"
          alt="Image article blog"
        />
      </div>
      <DateAuteur date={date} auteur={auteur} wrap />
      <hr />
      <Title>{titre}</Title>
    </div>
  );
};

export default Secondary;
