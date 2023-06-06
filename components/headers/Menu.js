import React, { useRef, useState, useEffect } from "react";
import { MenuFR } from "@/constant/constant";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Border } from "@/public/assets/img";
import localStorage from "localStorage";

const Menu = ({listCategories}) => {
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
            <Link
              href="/"
              className="uppercase whitespace-nowrap text-xs font-semibold tracking-wide hover:text-main-400 transition
                duration-100 ease-in-out 2xl:text-sm"
            >
            {home}
            </Link>
          </li>

        {listCategories?.map((category) => (
          <li key={uuidv4()}>
            <Link
              href={`/${category.id}/${category[lang].toLowerCase()}`}
              className="uppercase whitespace-nowrap text-xs font-semibold tracking-wide hover:text-main-400 transition
                duration-100 ease-in-out 2xl:text-sm"
            >
              {category[lang]}
            </Link>
          </li>
        ))}
      </ul>
      <Image src={Border} className="pt-1 w-full" alt="Graphic decoration" />
    </div>
  );
};

export default Menu;
