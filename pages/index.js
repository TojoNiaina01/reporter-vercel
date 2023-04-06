import React, { useState } from "react";
import Image from "next/image";
import { PubliciteDeux } from "@/public/assets/img";
import Hastag from "@/components/Hastag";
import Recent from "@/components/Recent/Recent";
import Popular from "@/components/Popular/Popular";
import Most from "@/components/Most/Most";
import NewLetter from "@/components/NewLetter";
import Hotstaff from "@/components/hotStaff/Hotstaff";
import TopOfWeek from "@/components/Mostread/TopOfWeek";
import Layout from "@/Layout/Layout";
import Modal from "@/components/Modal";

export const ArticlesContext = React.createContext(undefined, undefined);
export const ModalContext = React.createContext(undefined, undefined);

const Home = ({ articleMain }) => {
  const [newsLetterModal, setNewsLetterModal] = useState(false);
  return (
    <>
      <div className="app mx-2 md:mx-14 lg:mx-36 max-w-screen-xl 2xl:mx-auto">
        <ModalContext.Provider value={{ newsLetterModal, setNewsLetterModal }}>
          <Layout>
            <div className=" hidden lg:block relative w-full h-[290px] mt-6 2xl:mt-16 cursor-pointer">
              <Hastag style="absolute top-10 z-10  right-14">ads </Hastag>
              <Image
                src={PubliciteDeux}
                fill
                className="w-full h-[290px] object-cover"
                alt="Publicite"
              />
            </div>
            <ArticlesContext.Provider value={articleMain}>
              <Recent />
              <Popular />
              <Most />
              <NewLetter />
              <Hotstaff />
              <TopOfWeek />
            </ArticlesContext.Provider>
            {newsLetterModal && <Modal />}
          </Layout>
        </ModalContext.Provider>
      </div>
    </>
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
