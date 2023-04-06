import React from "react";
import { Jost } from "next/font/google";
import useMediaQuery from "@/hook/useMediaQuery";
import Image from "next/image";
import { NewsletterImg } from "@/public/assets/img";

const jost = Jost({ subsets: ["latin"], weight: "500" });

const NewLetter = () => {
  const isAboveScreen = useMediaQuery("(min-width: 1024px)");

  return (
    <section className="mt-10 mx-4 lg:w-full lg:mx-0 lg:relative">
      {isAboveScreen && <Image src={NewsletterImg} alt="Newletter graphics" />}
      <div className="lg:absolute top-4 left-10 w-full xl:top-12">
        <h6 className={` text-2xl leading-7 ${jost.className} lg:text-4xl`}>
          Stay Up To Date! <br /> Subscribe!
        </h6>
        <div className="w-full flex gap-4 lg:w-[40%]">
          <input
            type="text"
            placeholder="Your Email"
            className=" w-full border-b-2 border-black text-sm outline-none focus:border-main-500 text-main-700 bg-transparent md:w-[50%] lg:w-full lg:text-base 2xl:text-base"
          />
          <button className="bg-black text-sm text-white uppercase px-5 py-4 rounded-full shadow-md active:scale-95 transition duration-150 ease-in-out">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewLetter;
