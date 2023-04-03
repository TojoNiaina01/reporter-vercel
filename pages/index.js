import React, { useEffect, useRef } from "react";
import Navbar from "@/components/headers/Navbar";
import Menu from "@/components/headers/Menu";
import Banner from "@/components/headers/Banner";
import Image from "next/image";
import { PubliciteDeux } from "@/public/assets/img";
import Category from "@/components/headers/Category";
import Recent from "@/components/Recent/Recent";
import Popular from "@/components/Popular/Popular";

export const ArticlesContext = React.createContext();

const Home = ({ articleMain }) => {
  return (
    <div className="app mx-2 md:mx-14 lg:mx-36 2xl:mx-72">
      <header>
        <Navbar />
        <Menu />
        <Banner />
      </header>
      <main>
        <div className=" hidden lg:block relative w-full h-[290px] mt-6 2xl:mt-16 cursor-pointer">
          <Category title="ads" style="absolute top-10 z-10  right-14" />
          <Image
            src={PubliciteDeux}
            fill
            alt="Publicite"
            className="object-cover"
          />
        </div>
        <ArticlesContext.Provider value={articleMain}>
          <Recent />
          <Popular />
        </ArticlesContext.Provider>
      </main>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const data = await import(`/data/Articles.json`);
  const articleMain = JSON.parse(JSON.stringify(data));

  return {
    props: {
      articleMain,
    },
  };
}
