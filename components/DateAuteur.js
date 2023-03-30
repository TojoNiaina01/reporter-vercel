import React from "react";

const DateAuteur = ({ date, auteur }) => {
  return (
    <p className="text-xs text-main-400 pt-2 uppercase pb-2">
      {date} <span className="text-black"> - </span> {auteur}
    </p>
  );
};

export default DateAuteur;
