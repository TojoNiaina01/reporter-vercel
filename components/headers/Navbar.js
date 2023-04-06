import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { Logo } from "@/public/assets/img";
import { MenuBurger, Cross } from "@/public/assets/svg";
import useMediaQuery from "@/hook/useMediaQuery";
import { ModalContext } from "@/pages";

const Navbar = ({ clickHandler }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
  const { newsLetterModal, setNewsLetterModal } = useContext(ModalContext);

  return (
    <nav className="flex items-center justify-between relative md:pt-5 lg:pt-2">
      <div className="relative w-28 h-14 md:w-40 md:h-20 lg:order-2 lg:w-[150px] 2xl:w-[260px] 2xl:h-[110px]">
        <Image src={Logo} fill className="object-cover" alt="Logo" />
      </div>
      <div
        className="border border-gray-300 rounded-full flex items-center
      h-fit w-40 px-2 py-2 md:w-64 md:flex-grow-0 lg:order-1 lg:mx-0 lg:w-52 2xl:w-64"
      >
        <input
          type="text"
          className="focus:outline-none w-full placeholder:text-xs
          mx-2 md:placeholder:text-md"
          placeholder="SEARCH"
        />
        <MagnifyingGlassIcon className="h-5" color="#3e817d" />
      </div>

      {isAboveMediumScreens && (
        <div className="flex items-center gap-4 lg:gap-7 lg:order-3">
          <select className="cursor-pointer outline-none text-sm font-semibold">
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
          <button
            className="flex items-center shadow-md active:scale-95 transition duration-150 bg-main-500
        text-white py-3 px-4 rounded-full gap-2"
            onClick={() => setNewsLetterModal(!newsLetterModal)}
          >
            <EnvelopeIcon className="h-5 text-white" />
            <p className="uppercase text-xs tracking-wider font-semibold 2xl:text-sm">
              s'abonner
            </p>
          </button>
        </div>
      )}

      {/* Mobile Boutton */}
      {!isAboveMediumScreens && (
        <div className="relative" onClick={() => setToggleMenu(!toggleMenu)}>
          <div className="bg-main-500 rounded p-2 ">
            {toggleMenu ? (
              <Image src={Cross} height={20} width={20} alt="Menu" />
            ) : (
              <Image src={MenuBurger} height={20} width={20} alt="Menu" />
            )}
          </div>

          {/* Menu mobile */}
          {toggleMenu && (
            <div className="absolute z-20 bg-white border  border-gray-200 shadow-md p-2 rounded-md top-12 right-0">
              <div className="flex gap-4">
                <select className="cursor-pointer bg-white outline-none text-sm font-semibold">
                  <option value="fr">FR</option>
                  <option value="en">EN</option>
                </select>
                <button
                  className="flex items-center outline-none shadow-md bg-main-500 focus:outline-none text-white py-2 px-4 rounded-full gap-2"
                  onClick={() => setNewsLetterModal(!newsLetterModal)}
                >
                  <EnvelopeIcon className="h-5" color="#FFFFFF" />
                  <span className="uppercase tracking-wide font-semibold text-sm ">
                    s'abonner
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
