import React from "react";

const DateAuteur = ({ date, auteur, style }) => {
  return (
    <p
      className={`${
        style ? style : "text-main-400 text-xs"
      }   pt-2 uppercase pb-2`}
    >
      {date} <span className={`${style ? style : "text-black"}`}> - </span>{" "}
      {auteur}
    </p>
  );
};

export default DateAuteur;
