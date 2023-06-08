import React, { useState } from "react";
import { Logo } from "@/public/assets/img";
import Input from "@/components/Input";
import Image from "next/image";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {v4 as uuidv4} from "uuid"

const AddUser = () => {
  const roles = ["admin", "editeur"];
  const [selectedMenu, setSelectedMenu] = useState(roles[0]);
  return (
    <div className="w-full ">
      <div className="w-[450px] mx-auto relative bg-white p-14 md:p-10 rounded-lg">
        <Image src={Logo} className="object-cover mb-4" alt="Logo" />
        <form className="space-y-4">
          <Input id="username" label="Nom d'utilisateur" required type="text" />
          <Input id="email" label="Email" required type="email" />
          <Input id="password" label="Password" required type="password" />
          <Listbox value={selectedMenu} onChange={setSelectedMenu}>
            <div className="flex flex-col relative">
              <Listbox.Button className="text-main-500 flex justify-between gap-4 items-center border rounded-full p-4 border-main-500">
                <p className="">{selectedMenu}</p>
                <ChevronDownIcon className="block h-4" />
              </Listbox.Button>
              <Listbox.Options className=" absolute top-12 border border-main-500 p-2 rounded-md shadow-md bg-white">
                {roles?.map((person) => (
                  <Listbox.Option
                    key={uuidv4()}
                    value={person}
                    className="ui-active:bg-main-500 rounded-lg px-2 py-1 cursor-pointer ui-active:text-white"
                  >
                    {person}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
          <button className="w-full p-4 bg-main-500 rounded text-white font-semibold">
            Ajout Editeur
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
