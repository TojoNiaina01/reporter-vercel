import React, { useState, useEffect } from "react";
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
import {v4 as uuidv4} from "uuid"
import moment from "moment";
import Paginate from "@/components/Paginate";
import {useRouter} from "next/navigation";
import { ROOT_URL } from "@/env";

const AdsManager = ({listAds}) => {
  const state = [
    { k: 1, name: "En cours" },
    { k: 2, name: "Fini" },
  ];
  const router = useRouter()
  const [adsState, setAdsState] = useState(state[0]);
  const [modalShow, setModalShow] = useState(false);
  const [modalDeleteConfirm, setModalDeleteConfirm] = useState(false);

   /* ------------------------------- pagination ------------------------------- */
   const [itemOffset, setItemOffset] = useState(null)
   const [currentArticles, setCurrentArticles] = useState()
   const itemsPerPage = 5
   const handlerPageClick = (e) => {
     const newOffset = (e.selected * itemsPerPage) % listAds.length;
     setItemOffset(newOffset)
   }

   useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentArticles(listAds.slice(itemOffset, endOffset))
   },[itemOffset, itemsPerPage, listAds])

const deleteAdsHandler = (adsID, imageID) => {
  const adsElement = document.getElementById(`ads${adsID}`)
         adsElement.classList.add("opacity-30")

         const paramDelAds = {query: 'deleteAds', param: [adsID]}
         fetch(`${ROOT_URL}/api/knexApi`, {
           method: "POST",
           body: JSON.stringify(paramDelAds),
           headers: {
             "Content-type" : "application/json"
           }
         }).then((res) => res.json())
         .then(ads => {
          const paramDelImage = {query: 'deleteImageAds', param: [imageID]}
          fetch(`${ROOT_URL}/api/knexApi`, {
            method: "POST",
            body: JSON.stringify(paramDelImage),
            headers: {
              "Content-type" : "application/json"
            }
          }).then((res) => res.json())
          .then(img => {
            router.refresh()
          })
         })
}
  return (
    <div className="w-[90%] mx-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold tracking-wide">Listes ADS.</h3>
        {/* <div className="flex gap-4">


          <Listbox value={adsState} onChange={setAdsState}>
            <div className="flex flex-col relative">
              <Listbox.Button className="text-main-500 flex gap-4 items-center border rounded-full px-4 py-2 border-main-500">
                <p className="">{adsState.name}</p>
                <ChevronDownIcon className="block h-4" />
              </Listbox.Button>
              <Listbox.Options className=" absolute top-12 border border-main-500 p-2 rounded-md shadow-md bg-white">
                {state.map((person) => (
                  <Listbox.Option
                    key={uuidv4()}
                    value={person}
                    className="ui-active:bg-main-500 whitespace-nowrap rounded-lg px-2 py-1 cursor-pointer ui-active:text-white"
                  >
                    {person.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
          
          <div className="border border-main-500 py-2 px-4 rounded-full flex items-center w-[200px] h-fit">
            <input
              type="text"
              className="focus:outline-none w-full mx-2 placeholder:text-xs"
              placeholder="SEARCH"
            />
            <MagnifyingGlassIcon className="h-5" color="#3e817d" />
          </div>
        </div> */}
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
            {currentArticles?.map((ads) => (
              <tr id={`ads${ads.id}`} key={uuidv4()} className="bg-white border-b ">
                <td className="px-6 py-4">{ads.id}</td>
                <td className="relative w-[100px] h-[100px]">
                  <Image
                    fill
                    src={`${ROOT_URL}/images/${ads.image_name}.${ads.image_extension}`}
                    className=" object-contain"
                    alt="Article image blog"
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {ads.title.length > 30 ? `${ads.title.substring(0,30)}...` : ads.title}
                </th>
                <td className="px-6 py-4">{ads.link.length > 50 ? `${ads.link.substring(0,50)}...` : ads.link}</td>
                <td className="px-2 py-4 flex flex-col items-center justify-center">
                  <div className="text-sm">de {moment(ads.date_start).format('L')} </div>
                  <div className="text-sm">à {moment(ads.date_end).format('L')}  </div>
                  
                </td>
                <td className="px-6 py-4">{ads.format}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <TrashIcon
                      className="h-5 text-red-500 cursor-pointer"
                      onClick={() => deleteAdsHandler(ads.id, ads.image_id)}
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
        <div>
        {
              listAds.length > 5 && <Paginate itemsPerPage={itemsPerPage} handlerPage={handlerPageClick} items={listAds}/>
          }
        </div>
      </div>
      {modalShow && <EditAds setModalShow={setModalShow} />}
      {modalDeleteConfirm && (
        <ConfirmDelete setModalDeleteConfirm={setModalDeleteConfirm} />
      )}
    </div>
  );
};

export default AdsManager;
