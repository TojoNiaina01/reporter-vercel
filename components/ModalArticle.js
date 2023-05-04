import React, { useState } from "react";
import { Cross } from "@/public/assets/svg";
import Image from "next/image";
import AddArticle from "@/components/admin/AddArticle";

const ModalArticle = ({ setModalShow }) => {
  return (
    <section className="fixed inset-0  bg-black/30 z-20 backdrop-blur-sm flex  justify-center items-center">
      <button
        className="fixed top-5 right-5 border-white lg:top-10 lg:right-20 border-2 lg:border-main-500 p-2 rounded-md"
        onClick={() => setModalShow(false)}
      >
        <Image src={Cross} alt="close" />
      </button>
      <div className="bg-white w-2/3 px-6 py-5">
        {/*  Add Articles */}
        <AddArticle
          header="Edition d'une Article"
          submitBtn="Editer"
          setModalShow={setModalShow}
        />
      </div>
    </section>
  );
};

export default ModalArticle;
