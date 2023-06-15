import React, { useContext, useState } from "react";
import { Jost } from "next/font/google";
import { Cross } from "@/public/assets/svg";
import Image from "next/image";
import { ModalContext } from "@/Layout/Layout";
import { useRouter } from "next/navigation";
import localStorage from "localStorage";
import toast, { Toaster } from "react-hot-toast";
import { ROOT_URL } from "@/env";

const jost = Jost({ subsets: ["latin"], weight: "600" });
const Modal = () => {
  const router = useRouter();
  const [followers, setFollowers] = useState();
  const { newsLetterModal, setNewsLetterModal } = useContext(ModalContext);
  const storage = JSON.parse(localStorage.getItem("token"));

  const subscribeHandler = () => {
    const checkEmailReg = new RegExp(
      /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
    );
    if (followers) {
      if (checkEmailReg.test(followers)) {
        const param = { query: "addFollowers", param: [followers] };
        fetch(`${ROOT_URL}/api/knexApi`, {
          method: "POST",
          body: JSON.stringify(param),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            router.refresh();
          });
      } else {
        if (storage.lang === "fr") {
          toast.error("Email non valide");
        } else {
          toast.error("Email not valid");
        }
      }
    }
  };
  return (
    <section className="fixed inset-0  z-20 flex items-center justify-center  bg-black/40 backdrop-blur-[2px]">
      <Toaster
        toastOptions={{
          className: "text-sm",
        }}
      />
      <button
        className="fixed right-5 top-5 rounded-md border-2 border-white p-2 lg:right-20 lg:top-10 lg:border-main-500"
        onClick={() => setNewsLetterModal(!newsLetterModal)}
      >
        <Image src={Cross} alt="close" />
      </button>
      <div className="w-[450px] rounded-lg bg-white p-14 md:p-10">
        <h6 className={` text-2xl leading-7 ${jost.className} lg:text-4xl`}>
          Stay Up To Date! <br /> Subscribe!
        </h6>
        <div className="flex w-full gap-4">
          <input
            type="text"
            placeholder="Your Email"
            className=" w-72 border-b-2 border-black bg-transparent text-sm text-main-700 outline-none focus:border-main-500 md:w-[50%] lg:w-full lg:text-base 2xl:text-base"
            value={followers}
            onChange={(e) => setFollowers(e.target.value)}
          />
          <button
            onClick={subscribeHandler}
            className="rounded-full bg-black px-5 py-4 text-sm uppercase text-white shadow-md transition duration-150 ease-in-out active:scale-95"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Modal;
