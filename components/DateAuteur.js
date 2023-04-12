import React from "react";
import Image from "next/image";
import { Profil } from "@/public/assets/img";

const DateAuteur = ({ date, auteur, style }) => {
  return (
    <div
      className={`${
        style ? style : "text-secondary-500 font-semibold text-xs"
      }   pt-2 uppercase pb-2 tracking-wide whitespace-nowrap  flex items-center gap-1`}
    >
      {date} <span className={`${style ? style : "text-black"}`}> - </span>
      <Image
        src={Profil}
        className="w-5 h-5 object-cover rounded-full"
        alt="Profile"
      />{" "}
      {auteur}
    </div>
  );
};

export default DateAuteur;
