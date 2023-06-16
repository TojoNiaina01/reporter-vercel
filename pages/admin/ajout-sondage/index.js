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

  const [sondageActif, setSondageActif] = useState(true);
  return (
    <section className="mx-auto w-[90%]">
      {!sondageActif && (
        <>
          <h3 className="py-2 text-xl font-semibold tracking-wide">
            Creation sondage.
          </h3>
          <form>
            <div className="flex">
              <div className="">
                <Input
                  id="titre"
                  label="Titre du sondage"
                  required
                  type="text"
                />
                <div>
                  <div className="grid grid-cols-2  gap-4 pt-4">
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
                      <div className="relative">
                        <input
                          type="text"
                          id="choix"
                          placeholder=" "
                          className={`peer w-full rounded-md border border-gray-400 bg-white p-4 pl-4 pt-6 font-light outline-none transition`}
                        />
                        <label
                          htmlFor="choix"
                          className="text-md  absolute left-4 top-5 z-10 origin-[0] -translate-y-3 transform text-gray-500 duration-150 peer-placeholder-shown:translate-y-0          peer-placeholder-shown:scale-100          peer-focus:-translate-y-4 peer-focus:scale-75"
                        >
                          Plus de choix
                        </label>
                      </div>
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
            <div className="mt-8 flex h-[100px] w-[100px] items-center gap-5">
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
        </>
      )}

      {sondageActif && (
        <>
          <h3 className="py-2 text-xl font-semibold tracking-wide">
            Resultats sondage.
          </h3>
          <div className="mt-14 grid grid-cols-4 gap-16">
            <div className=" relative aspect-square w-full rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-500 p-8 text-white">
              <p className=" text-4xl font-semibold">41%</p>
              <span className="text-lg">Choix numero un se place ici</span>
              <div className="absolute -right-8 -top-14 flex h-[100px] w-[100px] items-center justify-center rounded-full border-4 border-white bg-yellow-500 text-xl text-white">
                1
              </div>
            </div>
            <div className=" relative aspect-square w-full rounded-xl bg-gradient-to-br from-[#3e817d] to-main-500 p-8 text-white">
              <p className=" text-4xl font-semibold">41%</p>
              <span className="text-lg">Choix numero un se place ici</span>
              <div className="absolute -right-8 -top-14 flex h-[100px] w-[100px] items-center justify-center rounded-full border-4 border-white bg-main-500 text-xl text-white">
                2
              </div>
            </div>
            <div className=" relative aspect-square w-full rounded-xl bg-gradient-to-br from-sky-700 to-sky-500 p-8 text-white">
              <p className=" text-4xl font-semibold">41%</p>
              <span className="text-lg">Choix numero un se place ici</span>
              <div className="absolute -right-8 -top-14 flex h-[100px] w-[100px] items-center justify-center rounded-full border-4 border-white bg-secondary-400 text-xl text-white">
                3
              </div>
            </div>
            <div className=" relative aspect-square w-full rounded-xl bg-gradient-to-br from-red-800 to-red-500 p-8 text-white">
              <p className=" text-4xl font-semibold">41%</p>
              <span className="text-lg">Choix numero un se place ici</span>
              <div className="absolute -right-8 -top-14 flex h-[100px] w-[100px] items-center justify-center rounded-full border-4 border-white bg-red-500 text-xl text-white">
                <span>4</span>
              </div>
            </div>
          </div>

          <button className="mt-8 rounded-xl bg-main-400 p-4 text-white active:scale-95">
            Crée un nouveau sondage.
          </button>
        </>
      )}
    </section>
  );
};

export default Sondage;
