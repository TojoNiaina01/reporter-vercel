import React, { useRef, useState, useEffect } from "react";
import { MenuFR } from "@/constant/constant";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Border } from "@/public/assets/img";
import localStorage from "localStorage";
import {useRouter} from "next/router";
import { ROOT_URL } from "@/env";

const Menu = ({listCategories}) => {
  const router = useRouter()
  const [home, setHome] = useState()
  const lang = JSON.parse(localStorage.getItem('token')).lang
  //const home = (lang === 'en') ? 'Home' : 'Acceuil'

  useEffect(() => {
    if(lang === 'en'){
      setHome('Home')
    }else{
      setHome('Acceuil')
    }
  },[])
  return (
    <div className="pt-4 mx-4 md:mx-0 select-none">
      <ul
        className="flex gap-4 md:gap-5 lg:justify-between
          font-semibold overflow-x-scroll scrollbar-hide"
      >
        <li>
            <button
              className="uppercase whitespace-nowrap text-xs font-semibold tracking-wide hover:text-main-400 transition
                duration-100 ease-in-out 2xl:text-sm"
              onClick={() => window.location = `${ROOT_URL}`}
            >
            {home}
            </button>
          </li>

        {listCategories?.map((category) => (
          <li key={uuidv4()}>
            <button
              className="uppercase whitespace-nowrap text-xs font-semibold tracking-wide hover:text-main-400 transition
                duration-100 ease-in-out 2xl:text-sm"
              onClick={() => window.location = `${ROOT_URL}/${category.id}/${category[lang].toLowerCase()}`}
            >
              {category[lang]}
            </button>
          </li>
        ))}
      </ul>
      <Image src={Border} className="pt-1 w-full" alt="Graphic decoration" />
    </div>
  );
};

export default Menu;
