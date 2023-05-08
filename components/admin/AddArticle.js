import React, { useState } from "react";
import Input from "@/components/Input";
import UploadFile from "@/components/admin/UploadFile";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MenuFR } from "@/constant/constant";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const AddArticle = ({ header, submitBtn, setModalShow }) => {
    const [selectedMenu, setSelectedMenu] = useState(MenuFR[0]);
  return (
    <section className="w-[90%] mx-auto">
      <h3 className="text-xl font-semibold tracking-wide mb-4">{header}</h3>
      <form>
        <div className="flex gap-6">
          <div className="flex flex-col gap-4 w-1/2 h-fit">
            <Input id="titre" label="Titre" required type="text" />
            <Input id="sous-titre" label="Sous-Titre" required type="text" />
            <Listbox value={selectedMenu} onChange={setSelectedMenu}>
              <div className="flex flex-col relative">
                <Listbox.Button className="text-main-500 flex justify-between items-center border rounded-full p-4 border-main-500">
                  <p className="">{selectedMenu.k}</p>
                  <ChevronDownIcon className="block h-4" />
                </Listbox.Button>
                <Listbox.Options className="absolute top-16 border border-main-500 p-2 z-40  rounded-md shadow-md bg-white">
                  {MenuFR.map((person) => (
                    <Listbox.Option
                      key={person.k}
                      value={person}
                      className="ui-active:bg-main-500 rounded-lg px-2 py-1 cursor-pointer ui-active:text-white"
                    >
                      {person.k}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
            <Input id="auteur" label="Auteur" required type="text" />
            <Input
              id="contenu"
              label="Contenu"
              required
              textarea
              className="peer w-full p-4 pt-6 border border-gray-400 rounded-md outline-none transition pl-4"
            />
          </div>

          <div className="flex-1">
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

export default AddArticle;
