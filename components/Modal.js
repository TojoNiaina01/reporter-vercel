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
  const router = useRouter()
  const [followers, setFollowers] = useState()
  const { newsLetterModal, setNewsLetterModal } = useContext(ModalContext);
  const storage = JSON.parse(localStorage.getItem("token"))

  const subscribeHandler = () => {
    const checkEmailReg = new RegExp(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)
    if(followers){
      if(checkEmailReg.test(followers)){
        const param = {query: 'addFollowers', param: [followers]}
        fetch(`${ROOT_URL}/api/knexApi`, {
          method: "POST",
          body: JSON.stringify(param),
          headers: {
            "Content-type" : "application/json"
          }
        }).then((res) => res.json())
        .then(data => {
          router.refresh()
        })
      }else{
        if(storage.lang === "fr"){
          toast.error("Email non valide")
        }else{
          toast.error("Email not valid")
        }
        
      }
    }
  }
  return (
    <section className="fixed inset-0  bg-black/40 z-20 backdrop-blur-sm flex  justify-center items-center">
      <Toaster toastOptions={{
          className: 'text-sm'
        }}/>
      <button
        className="fixed top-5 right-5 border-white lg:top-10 lg:right-20 border-2 lg:border-main-500 p-2 rounded-md"
        onClick={() => setNewsLetterModal(!newsLetterModal)}
      >
        <Image src={Cross} alt="close" />
      </button>
      <div className="w-[450px] bg-white p-14 md:p-10 rounded-lg">
        <h6 className={` text-2xl leading-7 ${jost.className} lg:text-4xl`}>
          Stay Up To Date! <br /> Subscribe!
        </h6>
        <div className="w-full flex gap-4">
          <input
            type="text"
            placeholder="Your Email"
            className=" w-72 border-b-2 border-black text-sm outline-none focus:border-main-500 text-main-700 bg-transparent md:w-[50%] lg:w-full lg:text-base 2xl:text-base"
            value={followers}
            onChange={(e) => setFollowers(e.target.value)}
          />
          <button onClick={subscribeHandler} className="bg-black text-sm text-white uppercase px-5 py-4 rounded-full shadow-md active:scale-95 transition duration-150 ease-in-out">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Modal;
