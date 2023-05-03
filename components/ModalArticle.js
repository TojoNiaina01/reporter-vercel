import React, { useState } from "react";
import { Cross } from "@/public/assets/svg";
import Image from "next/image";
import AddArticle from "@/components/admin/AddArticle";

const ModalArticle = () => {
  return (
    <section className="fixed inset-0  bg-black/30 z-20 backdrop-blur-sm flex  justify-center items-center">
      <button className="fixed top-5 right-5 border-white lg:top-10 lg:right-20 border-2 lg:border-main-500 p-2 rounded-md">
        <Image src={Cross} alt="close" />
      </button>
      <div className="bg-white w-1/2 py-5">
        <h2 className="text-center text-2xl font-semibold">Crée une Article</h2>
        <hr />

        {/*  Add Articles */}
        <AddArticle />
      </div>
    </section>
  );
};

export default ModalArticle;
