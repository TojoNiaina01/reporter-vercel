import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Flag, Logo } from "@/public/assets/img";
import { MenuBurger, Cross } from "@/public/assets/svg";
import useMediaQuery from "@/hook/useMediaQuery";
import { ModalContext } from "@/Layout/Layout";
import localStorage from "localStorage";
import { ROOT_URL } from "@/env";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const Navbar = ({ clickHandler }) => {
  const router = useRouter();
  const [toggleMenu, setToggleMenu] = useState(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
  const {
    newsLetterModal,
    setNewsLetterModal,
    sondageModal,
    setSondagerModal,
  } = useContext(ModalContext);
  const lang = JSON.parse(localStorage.getItem("token")).lang;
  const rating = JSON.parse(localStorage.getItem("token")).rating;
  const [option, setOption] = useState();
  const [placeholderSearch, setPlaceholderSearch] = useState("SEARCH");
  const [searchVal, setSearchVal] = useState();
  const [subsribTag, setSubscribTag] = useState("SUBSCRIBE");

  const changeLangHandler = (e) => {
    localStorage.setItem(
      "token",
      JSON.stringify({ lang: e.target.value, rating })
    );
    window.location = ROOT_URL;
  };

  useEffect(() => {
    if (lang === "en") {
      const listOpt = [
        { value: "en", tag: "EN" },
        { value: "fr", tag: "FR" },
      ];

      setOption(listOpt);
    } else {
      const listOpt = [
        { value: "fr", tag: "FR" },
        { value: "en", tag: "EN" },
      ];
      setPlaceholderSearch("RECHERCHE");
      setSubscribTag("S'ABONNER");

      setOption(listOpt);
    }
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchVal) {
      router.push(`/search?search=${searchVal}&lang=${lang}`);
    }
  };
  return (
    <nav className="relative flex items-center justify-between md:pt-5 lg:pt-2">
      <div
        onClick={() => (window.location = ROOT_URL)}
        className="relative h-14 w-40 md:h-20 md:w-64 lg:order-2 lg:w-[250px] 2xl:h-[110px] 2xl:w-[350px]"
      >
        <Image src={Logo} fill className="object-contain" alt="Logo" />
      </div>
      <div className="flex items-center gap-2">
        <div className="relative hidden h-[40px] w-[40px] lg:block">
          <Image src={Flag} fill className="object-cover" alt="MG flag" />
        </div>
        <div
          className="flex h-fit w-40 items-center rounded-full
      border border-gray-300 px-2 py-2 md:w-64 md:flex-grow-0 lg:order-1 lg:mx-0 lg:w-52 2xl:w-64"
        >
          <form onSubmit={searchHandler}>
            <input
              type="text"
              className="md:placeholder:text-md mx-2 w-full
              placeholder:text-xs focus:outline-none"
              placeholder={placeholderSearch}
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </form>
          <MagnifyingGlassIcon
            onClick={searchHandler}
            className="h-5"
            color="#3e817d"
          />
        </div>
      </div>

      {isAboveMediumScreens && (
        <div className="mx-2 flex items-center gap-4 lg:order-3 lg:mx-0 lg:gap-4">
          <select
            className="cursor-pointer text-sm font-semibold outline-none"
            onChange={changeLangHandler}
          >
            {option?.map((item) => (
              <option key={uuidv4()} value={item.value}>
                {item.tag}
              </option>
            ))}
          </select>

          <button
            className="flex items-center gap-2 rounded-full bg-main-400 px-4 py-3 text-white active:scale-95"
            onClick={() => setNewsLetterModal(!newsLetterModal)}
          >
            <EnvelopeIcon className="h-5 text-white" />
          </button>

          {/* Toggel sondage modal Desctop */}
          <button
            className=" flex items-center gap-2 rounded-full bg-main-400 px-4 py-3 text-white active:scale-95"
            onClick={() => setSondagerModal(!sondageModal)}
          >
            <CheckCircleIcon className="h-5" />
            <span>Sondage</span>
          </button>
        </div>
      )}

      {/* Mobile Boutton */}
      {!isAboveMediumScreens && (
        <div className="relative" onClick={() => setToggleMenu(!toggleMenu)}>
          <div className="rounded bg-main-400 p-2 ">
            {toggleMenu ? (
              <Image src={Cross} height={20} width={20} alt="Menu" />
            ) : (
              <Image src={MenuBurger} height={20} width={20} alt="Menu" />
            )}
          </div>

          {/* Menu mobile */}
          {toggleMenu && (
            <div className="absolute right-0 top-12 z-20  rounded-md border border-gray-200 bg-white p-2 shadow-md">
              <div className="flex flex-col gap-4">
                <select
                  className="cursor-pointer bg-white text-sm font-semibold outline-none"
                  onChange={changeLangHandler}
                >
                  {option?.map((item) => (
                    <option key={uuidv4()} value={item.value}>
                      {item.tag}
                    </option>
                  ))}
                </select>

                <button
                  className="flex items-center gap-2 rounded-full bg-main-400 px-4 py-2 text-white outline-none focus:outline-none"
                  onClick={() => setNewsLetterModal(!newsLetterModal)}
                >
                  <EnvelopeIcon className="h-5" color="#FFFFFF" />
                  <span className="text-sm font-semibold uppercase tracking-wide ">
                    s'abonner
                  </span>
                </button>

                {/* Toggel sondage modal Desctop */}
                <button
                  className=" flex items-center gap-2 rounded-full bg-main-400 px-4 py-2 text-white active:scale-95"
                  onClick={() => setSondagerModal(!sondageModal)}
                >
                  <CheckCircleIcon className="h-5" />
                  <span>Sondage</span>
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
