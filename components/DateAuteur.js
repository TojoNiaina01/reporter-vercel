import React from "react";
import Image from "next/image";
import { Profil } from "@/public/assets/img";

const DateAuteur = ({ date, auteur, style }) => {
  return (
    <div
      className={`${
        style ? style : "text-secondary-500  py-2"
      } uppercase tracking-wide whitespace-nowrap font-semibold text-xs  flex items-center gap-1`}
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
