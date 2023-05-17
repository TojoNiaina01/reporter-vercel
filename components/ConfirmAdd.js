import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ConfirmAdd = ({setConfirmModal}) => {
  return (
   <section className="fixed inset-0  bg-black/30 z-20 backdrop-blur-[1px] flex  justify-center items-center bg-black">
      <div className="w-[40vw] bg-white p-10 rounded relative">
        <button
          className="absolute top-2 right-2"
          onClick={() => setConfirmModal(false)}
        >
          <XMarkIcon className="h-5 text-main-500" />
        </button>
        <h3 className="font-semibold text-lg">
          Ajout Article
        </h3>

        <div className="space-y-2 font-semibold pt-4">
          <p className="tracking-wide">Titre :  <span className=" font-normal text-lg">A set of the most necessary things on vacation</span></p>
          <p className="tracking-wide">Description :  <span className=" font-normal text-lg">A breakdown or a flat tire can happen to anyone at any time, and what you have in your car can make the difference between getting back on the ...</span></p>
          <p className="tracking-wide">Langue :  <span className=" font-normal text-lg">Francais</span></p>
        </div>


        <div className="space-x-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-500 rounded-xl shadow-md font-semibold text-white active:scale-95"
            onClick={() => setConfirmModal(false)}
          >
            Annuler
          </button>
          <button className="px-4 py-2 bg-main-500 rounded-xl shadow-md font-semibold text-white active:scale-95">
            Confirmer
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmAdd;