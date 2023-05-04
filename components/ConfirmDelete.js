import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ConfirmDelete = ({ setModalDeleteConfirm }) => {
  return (
    <section className="fixed inset-0  bg-black/30 z-20 backdrop-blur-[1px] flex  justify-center items-center">
      <div className="w-[500px] bg-white p-10 rounded relative">
        <button
          className="absolute top-2 right-2"
          onClick={() => setModalDeleteConfirm(false)}
        >
          <XMarkIcon className="h-5 text-main-500" />
        </button>
        <h3 className="font-semibold text-lg">
          Etes-vous sûr de vouloir supprimer cet élément ?
        </h3>
        <div className="space-x-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-500 rounded-xl shadow-md font-semibold text-white active:scale-95"
            onClick={() => setModalDeleteConfirm(false)}
          >
            NON
          </button>
          <button className="px-4 py-2 bg-red-500 rounded-xl shadow-md font-semibold text-white active:scale-95">
            OUI
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmDelete;
