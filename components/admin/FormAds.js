import React, { useState } from "react";
import Input from "@/components/Input";
import UploadFile from "@/components/admin/UploadFile";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const FormAds = ({ submitBtn, setModalShow, header }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const menu = [
    { k: 1, name: "horizontale" },
    { k: 2, name: "verticale" },
  ];
  const [selectedMenu, setSelectedMenu] = useState(menu[0]);
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  return (
    <section className="w-[90%] mx-auto">
      <h3 className="text-xl font-semibold tracking-wide py-2">{header}</h3>
      <form>
        <div className="flex gap-6">
          <div className="flex flex-col gap-4 w-1/2 h-fit">
            <Input id="titre" label="Titre CPM" required type="text" />
            <Input id="lien" label="Lien de redirection" required type="text" />
            <div className="mx-auto">
              <DateRange
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={["#659a97"]}
                onChange={handleSelect}
                showMonthAndYearPickers={false}
                showDateDisplay={false}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 flex-1">
            <Listbox value={selectedMenu} onChange={setSelectedMenu}>
              <div className="flex flex-col  relative">
                <Listbox.Button className="text-main-500 flex justify-between gap-4 items-center border rounded-full px-4 py-2 border-main-500">
                  <p className="">{selectedMenu.name}</p>
                  <ChevronDownIcon className="block h-4" />
                </Listbox.Button>
                <Listbox.Options className=" absolute top-12 border border-main-500 p-2 rounded-md shadow-md bg-white">
                  {menu.map((person) => (
                    <Listbox.Option
                      key={person.name}
                      value={person}
                      className="ui-active:bg-main-500 rounded-lg px-2 py-1 cursor-pointer ui-active:text-white"
                    >
                      {person.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
            {/* Upload file */}
            <UploadFile />
          </div>
        </div>
        <div className="flex gap-12 mt-8">
          <button
            className="flex items-center bg-[#555555] text-white font-semibold gap-2 px-4 py-2 rounded-full active:scale-95 shadow-md"
            onClick={() => setModalShow(false)}
          >
            <XMarkIcon className="h-5" />
            <span>Annuler</span>
          </button>
          <button className="flex items-center bg-main-500 text-white font-semibold gap-2 px-4 py-2 rounded-full active:scale-95 shadow-md">
            <CheckIcon className="h-5" />
            <span>{submitBtn}</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormAds;
