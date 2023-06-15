import { ModalContext } from "@/Layout/Layout";
import { Cross } from "@/public/assets/svg";
import Image from "next/image";
import React, { useContext } from "react";
import { Jost } from "next/font/google";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const jost = Jost({ subsets: ["latin"], weight: "600" });
const SondageModal = () => {
  const { sondageModal, setSondagerModal } = useContext(ModalContext);
  return (
    <section className="fixed inset-0  z-20 flex items-center justify-center  bg-black/40 backdrop-blur-[2px]">
      <button
        className="fixed right-5 top-5 rounded-md border-2 border-white p-2 lg:right-20 lg:top-10 lg:border-main-500"
        onClick={() => setSondagerModal(!sondageModal)}
      >
        <Image src={Cross} alt="close" />
      </button>

      {/*<div className="w-[45vw] rounded-lg bg-white p-14 md:p-10">*/}
      <div className="w-full rounded-lg bg-white p-14 md:mx-4 md:p-10 lg:w-[45vw] lg:max-w-5xl">
        <h6 className={` text-2xl leading-7 ${jost.className} lg:text-4xl`}>
          Quels est votre opinion sur ce sujet ?
        </h6>

        <p className=" mt-6 text-lg font-semibold lg:text-xl">
          Le titre du sondage here.
        </p>
        <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <button className="rounded-lg border-[1px] border-gray-200 bg-gray-100 p-4 font-medium shadow transition hover:bg-main-400 hover:text-white">
            Option One for the sondage
          </button>
          <button className="rounded-lg border-[1px]  border-gray-200 bg-gray-100 p-4 font-medium shadow transition hover:bg-main-400 hover:text-white">
            Option Two for the sondage
          </button>
          <button className="rounded-lg border-[1px]  border-gray-200 bg-gray-100 p-4 font-medium shadow transition hover:bg-main-400 hover:text-white">
            Option Two for the sondage
          </button>
        </div>
      </div>
    </section>
  );
};

export default SondageModal;
