import React, { useState } from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { Logo } from "@/public/assets/img";
import { MenuBurger, Cross } from "@/public/assets/svg";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="flex items-center justify-between md:pt-5 lg:pt-2">
      <div className="relative w-28 h-14 md:w-40 md:h-20 lg:order-2 lg:w-[150px] lg:h-20 2xl:w-[260px] 2xl:h-[110px]">
        <Image src={Logo} fill className="object-cover" alt="Logo" />
      </div>
      <div
        className="border border-gray-300 rounded-full flex items-center
      h-fit w-40 sm:mx-6 sm:flex-grow px-2 py-2 md:w-64 md:flex-grow-0 lg:order-1 lg:mx-0 lg:w-52 2xl:w-64"
      >
        <input
          type="text"
          className="focus:outline-none w-full placeholder:text-xs
          mx-2 md:placeholder:text-md"
          placeholder="SEARCH"
        />
        <MagnifyingGlassIcon className="h-5" color="#3e817d" />
      </div>

      <div className="hidden lg:flex items-center gap-4 lg:gap-7 lg:order-3">
        <div className="flex gap-2 items-center">
          <p className="font-semibold text-sm 2xl:text-base">FR</p>
          <ChevronDownIcon className="h-3" color="#A4A9B4" />
        </div>
        <button
          className="flex items-center shadow-xl active:scale-95 transition duration-150 bg-main-500
        text-white py-3 px-4 rounded-full gap-2"
        >
          <EnvelopeIcon className="h-5" color="#FFFFFF" />
          <p className="uppercase text-sm tracking-wide 2xl:tracking-wider">
            s'abonner
          </p>
        </button>
      </div>

      {/* Mobile Boutton */}
      <div className="relative lg:hidden">
        <div
          className="bg-main-500 rounded p-2 "
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          {toggleMenu ? (
            <Image src={Cross} height={20} width={20} alt="Menu" />
          ) : (
            <Image src={MenuBurger} height={20} width={20} alt="Menu" />
          )}
        </div>

        {/* Menu mobile */}
        {toggleMenu && (
          <div className="absolute z-20 bg-white border  border-gray-200 shadow-md p-2 rounded-md top-12 right-0 lg:hidden">
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-2 pl-4 items-center">
                <p className="font-bold">FR</p>
                <ChevronDownIcon className="h-3" color="#A4A9B4" />
              </div>
              <div className="flex items-center outline-0 shadow-xl focus:outline-0 bg-main-500 text-white py-2 px-4 rounded-full gap-2">
                <EnvelopeIcon className="h-5" color="#FFFFFF" />
                <p className="uppercase tracking-wide font-semibold text-sm ">
                  s'abonner
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
