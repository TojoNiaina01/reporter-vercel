import React, { useRef, useState, useEffect } from "react";
import { MenuFR } from "@/constant/constant";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Border } from "@/public/assets/img";
import localStorage from "localStorage";
import { useRouter } from "next/router";
import { ROOT_URL } from "@/env";

const Menu = ({ listCategories }) => {
  const router = useRouter("Home");
  const [home, setHome] = useState("home");
  const [politic, setPolitic] = useState("politic");
  const [culture, setCulture] = useState("culture");
  const [economy, setEconomy] = useState("economy");
  const [social, setSocial] = useState("social");
  const [sport, setSport] = useState("sport");
  const [diaspora, setDiaspora] = useState("diaspora");
  const [industry, setIndustry] = useState("industry");
  const [life, setLife] = useState("life-art");
  const [environment, setEnvironment] = useState("environment");
  const [infra, setInfra] = useState("infrastructure");
  const [tourism, setTourism] = useState("tourism");
  const lang = JSON.parse(localStorage.getItem("token")).lang;
  //const home = (lang === 'en') ? 'Home' : 'Acceuil'

  useEffect(() => {
    if (lang === "fr") {
      setHome("Accueil");
      setPolitic("politique");
      setEconomy("economie");
      setIndustry("industrie");
      setEnvironment("environnement");
      setTourism("tourisme");
    }
  }, []);
  return (
    <div className="mx-4 select-none pt-4 md:mx-0">
      <ul
        className="flex gap-4 overflow-x-scroll font-semibold
          scrollbar-hide md:gap-5 lg:justify-between"
      >
        <li>
          <button
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide transition duration-100
                ease-in-out hover:text-main-400 2xl:text-sm"
            onClick={() => (window.location = `${ROOT_URL}`)}
          >
            {home}
          </button>
        </li>
        <li>
          <button
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide transition duration-100
                ease-in-out hover:text-main-400 2xl:text-sm"
            onClick={() => (window.location = `${ROOT_URL}/1/${politic}`)}
          >
            {politic}
          </button>
        </li>
        <li>
          <button
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide transition duration-100
                ease-in-out hover:text-main-400 2xl:text-sm"
            onClick={() => (window.location = `${ROOT_URL}/2/${culture}`)}
          >
            {culture}
          </button>
        </li>
        <li>
          <button
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide transition duration-100
                ease-in-out hover:text-main-400 2xl:text-sm"
            onClick={() => (window.location = `${ROOT_URL}/3/${economy}`)}
          >
            {economy}
          </button>
        </li>
        <li>
          <button
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide transition duration-100
                ease-in-out hover:text-main-400 2xl:text-sm"
            onClick={() => (window.location = `${ROOT_URL}/4/${social}`)}
          >
            {social}
          </button>
        </li>
        <li>
          <button
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide transition duration-100
                ease-in-out hover:text-main-400 2xl:text-sm"
            onClick={() => (window.location = `${ROOT_URL}/5/${sport}`)}
          >
            {sport}
          </button>
        </li>
        <li>
          <button
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide transition duration-100
                ease-in-out hover:text-main-400 2xl:text-sm"
            onClick={() => (window.location = `${ROOT_URL}/6/${diaspora}`)}
          >
            {diaspora}
          </button>
        </li>
        <li>
          <button
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide transition duration-100
                ease-in-out hover:text-main-400 2xl:text-sm"
            onClick={() => (window.location = `${ROOT_URL}/7/${industry}`)}
          >
            {industry}
          </button>
        </li>
        <li>
          <button
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide transition duration-100
                ease-in-out hover:text-main-400 2xl:text-sm"
            onClick={() => (window.location = `${ROOT_URL}/8/${life}`)}
          >
            {life}
          </button>
        </li>
        <li>
          <button
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide transition duration-100
                ease-in-out hover:text-main-400 2xl:text-sm"
            onClick={() => (window.location = `${ROOT_URL}/9/${environment}`)}
          >
            {environment}
          </button>
        </li>
        <li>
          <button
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide transition duration-100
                ease-in-out hover:text-main-400 2xl:text-sm"
            onClick={() => (window.location = `${ROOT_URL}/10/${infra}`)}
          >
            {infra}
          </button>
        </li>
        <li>
          <button
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide transition duration-100
                ease-in-out hover:text-main-400 2xl:text-sm"
            onClick={() => (window.location = `${ROOT_URL}/11/${tourism}`)}
          >
            {tourism}
          </button>
        </li>
        {/* 
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
        ))} */}
      </ul>
      <Image src={Border} className="w-full pt-1" alt="Graphic decoration" />
    </div>
  );
};

export default Menu;
