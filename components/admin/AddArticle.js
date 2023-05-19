import React, { useCallback, useState } from "react";
import Input from "@/components/Input";
import UploadFile from "@/components/admin/UploadFile";
import dynamic from "next/dynamic";

import {
  BoltIcon,
  CheckIcon,
  FireIcon,
  HomeIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MenuFR } from "@/constant/constant";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ConfirmAdd from "@/components/ConfirmAdd";
import RichText from "@/components/RichText";

const AddArticle = ({ header, submitBtn, setModalShow, edition, pushBtn }) => {
  const lang = ["Francais", "Anglais"];
  const [selectedMenu, setSelectedMenu] = useState(MenuFR[0]);
  const [selectedLang, setSelectedLang] = useState(lang[0]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggleConfirmModal = useCallback(() => {
    setConfirmModal(!confirmModal);
  }, [confirmModal]);

  return (
    <>
      <section className={`w-[90%] mx-auto`}>
        <h3 className="text-xl font-semibold tracking-wide mb-4">{header}</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex gap-6 ">
            <div
              className={`flex flex-col gap-4 ${
                edition ? "w-1/2" : "w-full"
              } h-fit`}
            >
              <Input id="titre" label="Titre" required type="text" />
              <Input
                id="description"
                label="Description"
                required
                type="text"
              />
              <div className="flex gap-4 w-full">
                <Listbox value={selectedMenu} onChange={setSelectedMenu}>
                  <div className="flex flex-col relative w-full">
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
                <Listbox value={selectedLang} onChange={setSelectedLang}>
                  <div className="flex flex-col relative w-full">
                    <Listbox.Button className="text-main-500 flex justify-between items-center border rounded-full p-4 border-main-500">
                      <p className="">{selectedLang}</p>
                      <ChevronDownIcon className="block h-4" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute top-16 border border-main-500 p-2 z-40  rounded-md shadow-md bg-white">
                      {lang.map((item) => (
                        <Listbox.Option
                          key={item}
                          value={item}
                          className="ui-active:bg-main-500 rounded-lg px-2 py-1 cursor-pointer ui-active:text-white"
                        >
                          {item}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
              <div>
                <Input
                  id="tags"
                  label="Enter all of the choices divided by a comma (',')."
                  required
                  type="text"
                />
              </div>
              {pushBtn && (
                <div className="flex gap-3">
                  <button className="flex items-center bg-main-500 gap-2 text-white p-2 rounded-lg active:scale-95 transition">
                    <BoltIcon className="h-5" />
                    <span>Flash info</span>
                  </button>
                  <button className="flex items-center bg-main-500 gap-2 text-white p-2 rounded-lg active:scale-95 transition">
                    <HomeIcon className="h-5" />
                    <span>Slider</span>
                  </button>
                  <button className="flex items-center bg-main-500 gap-2 text-white p-2 rounded-lg active:scale-95 transition">
                    <FireIcon className="h-5" />
                    <span>Hot staff</span>
                  </button>
                </div>
              )}
            </div>

            {edition && (
              <div className="flex-1">
                <UploadFile />
              </div>
            )}
          </div>

          {/* rich text content */}
          <RichText theme="snow" value={value} onChange={setValue} />

          <div className="flex gap-12 mt-8">
            <button
              className="flex items-center bg-[#555555] text-white font-semibold gap-2 px-4 py-2 rounded-full active:scale-95 shadow-md"
              onClick={() => setModalShow(false)}
            >
              <XMarkIcon className="h-5" />
              <span>Annuler</span>
            </button>
            <button
              onClick={toggleConfirmModal}
              className="flex items-center bg-main-500 text-white font-semibold gap-2 px-4 py-2 rounded-full active:scale-95 shadow-md"
            >
              <CheckIcon className="h-5" />
              <span>{submitBtn}</span>
            </button>
          </div>
        </form>

        {confirmModal && <ConfirmAdd setConfirmModal={setConfirmModal} />}
      </section>
    </>
  );
};

export default AddArticle;
