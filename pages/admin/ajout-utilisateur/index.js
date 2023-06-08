import React, { useState } from "react";
import { Logo } from "@/public/assets/img";
import Input from "@/components/Input";
import Image from "next/image";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { v4 as uuidv4 } from "uuid";

const AddUser = () => {
  const roles = ["admin", "editeur"];
  const [selectedMenu, setSelectedMenu] = useState(roles[0]);
  return (
    <div className="w-full ">
      <div className="relative mx-auto w-[450px] rounded-lg bg-white">
        <Image src={Logo} className="mb-4 object-cover" alt="Logo" />
        <form className="space-y-4">
          <Input id="username" label="Nom d'utilisateur" required type="text" />
          <Input id="email" label="Email" required type="email" />
          <Input id="password" label="Password" required type="password" />
          <Listbox value={selectedMenu} onChange={setSelectedMenu}>
            <div className="relative flex flex-col">
              <Listbox.Button className="flex items-center justify-between gap-4 rounded-full border border-main-500 p-4 text-main-500">
                <p className="">{selectedMenu}</p>
                <ChevronDownIcon className="block h-4" />
              </Listbox.Button>
              <Listbox.Options className=" absolute top-12 rounded-md border border-main-500 bg-white p-2 shadow-md">
                {roles?.map((person) => (
                  <Listbox.Option
                    key={uuidv4()}
                    value={person}
                    className="cursor-pointer rounded-lg px-2 py-1 ui-active:bg-main-500 ui-active:text-white"
                  >
                    {person}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
          <button className="w-full rounded bg-main-500 p-4 font-semibold text-white">
            Ajout Editeur
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
