import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/fr";
import localStorage from "localStorage";

const DateAuteur = ({ date, auteur, style, wrap }) => {
  const lang = JSON.parse(localStorage.getItem("token")).lang;
  const [formatedDate, setFormatedDate] = useState();

  useEffect(() => {
    if (lang === "fr") {
      moment.locale("fr");
      setFormatedDate(moment(date).format("Do MMM YYYY"));
    } else {
      moment.locale("en");
      setFormatedDate(moment(date).format("MMM Do YYYY"));
    }
  }, []);

  return (
    <div
      className={`${
        style ? style : "py-2  text-secondary-500"
      } items-center gap-1 text-[11px] font-semibold uppercase tracking-wide sm:flex`}
    >
      <p className="whitespace-nowrap">
        {formatedDate}
        <span className={`${style ? style : "text-black"}`}> - </span>
      </p>
      <p className="lg:whitespace-nowrap">{auteur}</p>
    </div>
  );
};

export default DateAuteur;
