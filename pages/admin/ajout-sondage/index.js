import Input from "@/components/Input";
import {
  CheckBadgeIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Sondage = () => {
  const [inputs, setInputs] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleAddInput = () => {
    setInputs([...inputs, ""]);
  };
  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

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
              <div className="grid grid-cols-2 gap-4 pt-4">
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

                {inputs?.map((input, i) => (
                  <Input id={i} label="Plus de choix" required type="text" />
                ))}
              </div>
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  className=" mt-6 w-fit cursor-pointer rounded-full bg-main-400 p-2 active:scale-95"
                  onClick={handleAddInput}
                >
                  <PlusIcon className="h-4 text-white" />
                </button>
                <button
                  type="button"
                  className=" mt-6 w-fit cursor-pointer rounded-full bg-red-400 p-2 active:scale-95"
                  onClick={handleRemoveInput}
                >
                  <MinusIcon className="h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
          <div className="mx-auto overflow-hidden rounded-lg border border-secondary-200">
            <DateRange
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#3e817d"]}
              // onChange={handleSelect}
              showMonthAndYearPickers={false}
              showDateDisplay={false}
              // disabledDates={disableDates}
            />
          </div>
        </div>
        <div className="mt-8 flex gap-10">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-[#555555] px-4 py-2 font-semibold text-white shadow-md active:scale-95"
          >
            <XMarkIcon className="h-5" />
            <span>Annuler</span>
          </button>
          <button
            type="submit"
            className={`flex items-center 
            gap-2 rounded-full bg-main-400 px-4 py-2 font-semibold text-white shadow-md active:scale-95`}
          >
            <CheckBadgeIcon className="h-5" />

            <span>Valider</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Sondage;
