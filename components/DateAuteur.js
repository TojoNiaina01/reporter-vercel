import React from "react";
import Image from "next/image";
import { Profil } from "@/public/assets/img";

const DateAuteur = ({ date, auteur, style, wrap }) => {
  return (
    <div
      className={`${
        style ? style : "text-secondary-500  py-2"
      } uppercase tracking-wide font-semibold text-[11px] sm:flex items-center gap-1`}
    >
      <p className="whitespace-nowrap">
        {date} <span className={`${style ? style : "text-black"}`}> - </span>
      </p>
      <p className="lg:whitespace-nowrap">{auteur}</p>
    </div>
  );
};

export default DateAuteur;
