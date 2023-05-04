import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { MenuFR } from "@/constant/constant";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { ArticleOne } from "@/public/assets/img";
import ModalArticle from "@/components/ModalArticle";
import ConfirmDelete from "@/components/ConfirmDelete";

const Article = () => {
  const [selectedMenu, setSelectedMenu] = useState(MenuFR[0]);
  const [modalShow, setModalShow] = useState(false);
  const [modalDeleteConfirm, setModalDeleteConfirm] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold tracking-wide">
          Listes Articles.
        </h3>
        <div className="flex gap-4">
          {/* Liste category */}
          <Listbox value={selectedMenu} onChange={setSelectedMenu}>
            <div className="flex flex-col relative">
              <Listbox.Button className="text-main-500 flex gap-4 items-center border rounded-full px-4 py-2 border-main-500">
                <p className="">{selectedMenu.k}</p>
                <ChevronDownIcon className="block h-4" />
              </Listbox.Button>
              <Listbox.Options className=" absolute top-12 border border-main-500 p-2 rounded-md shadow-md bg-white">
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

      <div className="overflow-x-auto shadow-md rounded-lg mt-4">
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
                Categories
              </th>
              <th scope="col" className="px-6 py-3">
                Date
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
                    src={ArticleOne}
                    className=" object-contain"
                    alt="Article image blog"
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  A set of the most necessary things on vacation
                </th>
                <td className="px-6 py-4">Politique</td>
                <td className="px-6 py-4">05/12/2021</td>
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
        <button className="bg-main-500 text-white px-4 py-2 rounded-2xl flex items-center gap-4 active:scale-95 transition">
          <PlusCircleIcon className="h-5 text-white" />
          <span className="tracking-wide font-semibold ">Nouveau</span>
        </button>
        <div>PAGINATION</div>
      </div>

      {modalShow && <ModalArticle setModalShow={setModalShow} />}
      {modalDeleteConfirm && (
        <ConfirmDelete setModalDeleteConfirm={setModalDeleteConfirm} />
      )}
    </>
  );
};

export default Article;
