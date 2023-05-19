import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Publicite } from "@/public/assets/img";
import Image from "next/image";
import ConfirmDelete from "@/components/ConfirmDelete";
import EditAds from "@/components/admin/EditAds";

const AdsManager = () => {
  const state = [
    { k: 1, name: "En cours" },
    { k: 2, name: "Fini" },
  ];

  const [adsState, setAdsState] = useState(state[0]);
  console.log(adsState);
  const [modalShow, setModalShow] = useState(false);
  const [modalDeleteConfirm, setModalDeleteConfirm] = useState(false);
  return (
    <div className="w-[90%] mx-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold tracking-wide">Listes ADS.</h3>
        <div className="flex gap-4">
          {/* Liste category */}
          <Listbox value={adsState} onChange={setAdsState}>
            <div className="flex flex-col relative">
              <Listbox.Button className="text-main-500 flex gap-4 items-center border rounded-full px-4 py-2 border-main-500">
                <p className="">{adsState.name}</p>
                <ChevronDownIcon className="block h-4" />
              </Listbox.Button>
              <Listbox.Options className=" absolute top-12 border border-main-500 p-2 rounded-md shadow-md bg-white">
                {state.map((person) => (
                  <Listbox.Option
                    key={person.k}
                    value={person}
                    className="ui-active:bg-main-500 whitespace-nowrap rounded-lg px-2 py-1 cursor-pointer ui-active:text-white"
                  >
                    {person.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
          {/*  Recherche*/}
          <div className="border border-main-500 py-2 px-4 rounded-full flex items-center w-[200px] h-fit">
            <input
              type="text"
              className="focus:outline-none w-full mx-2 placeholder:text-xs"
              placeholder="SEARCH"
            />
            <MagnifyingGlassIcon className="h-5" color="#3e817d" />
          </div>
        </div>
      </div>
      {/*  tableau */}

      <div className="shadow-md rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-main-500 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Medias
              </th>
              <th scope="col" className="px-6 py-3">
                Titre
              </th>
              <th scope="col" className="px-6 py-3">
                Lien
              </th>
              <th scope="col" className="px-6 py-3">
                Diffusion
              </th>
              <th scope="col" className="px-6 py-3">
                Placement
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((table) => (
              <tr key={table} className="bg-white border-b ">
                <td className="px-6 py-4">{table}</td>
                <td className="relative w-[100px] h-[100px]">
                  <Image
                    fill
                    src={Publicite}
                    className=" object-contain"
                    alt="Article image blog"
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Telma Boost
                </th>
                <td className="px-6 py-4">https://www.telma.shop</td>
                <td className="px-6 py-4">
                  Nombre de Jours
                  <CheckIcon className="h-6 text-main-500" />
                  <ExclamationTriangleIcon className="h-5 text-yellow-500" />
                </td>
                <td className="px-6 py-4">Horizontal</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <PencilSquareIcon
                      className="h-5 text-main-500 cursor-pointer"
                      onClick={() => setModalShow(!modalShow)}
                    />
                    <TrashIcon
                      className="h-5 text-red-500 cursor-pointer"
                      onClick={() => setModalDeleteConfirm(!modalDeleteConfirm)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-5">
        <div />
        <div>PAGINATION</div>
      </div>
      {modalShow && <EditAds setModalShow={setModalShow} />}
      {modalDeleteConfirm && (
        <ConfirmDelete setModalDeleteConfirm={setModalDeleteConfirm} />
      )}
    </div>
  );
};

export default AdsManager;
