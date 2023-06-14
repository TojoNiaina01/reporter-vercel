import Input from "@/components/Input";
import React from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Sondage = () => {
  return (
    <section className="mx-auto w-[90%]">
      <h3 className="py-2 text-xl font-semibold tracking-wide">
        Creation sondage.
      </h3>
      <form>
        <div className="flex">
          <div className="">
            <Input id="titre" label="Titre du sondage" required type="text" />
            <div>
              <div className="flex gap-4 pt-4">
              <Input
                id="resultOne"
                label="Premier choix"
                required
                type="text"
              />
              <Input
                id="resultTwo"
                label="Deuxieme choix"
                required
                type="text"
              />
            </div>
            <p>plus de choix</p>
            </div>
          </div>
          <div className="mx-auto">
            <DateRange
              // ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#659a97"]}
              // onChange={handleSelect}
              showMonthAndYearPickers={false}
              showDateDisplay={false}
              // disabledDates={disableDates}
            />
          </div>
        </div>
        <div>BTN anaky 2  </div>
      </form>
    </section>
  );
};

export default Sondage;
