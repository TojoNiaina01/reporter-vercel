import React, { createContext, useState } from "react";
import Image from "next/image";
import { PubliciteDeux } from "@/public/assets/img";
import Hastag from "@/components/Hastag";
import Recent from "@/components/Recent/Recent";
import Popular from "@/components/Popular/Popular";
import Most from "@/components/Most/Most";
import NewLetter from "@/components/NewLetter";
import Hotstaff from "@/components/hotStaff/Hotstaff";
import TopOfWeek from "@/components/Mostread/TopOfWeek";
import Banner from "@/components/headers/Banner";

export const ArticlesContext = createContext();
const Home = ({
  ArticleRecentMain,
  ArticleRecentSecondary,
  ArticlePopular,
  ArticlePopularSeconde,
  ArticleMostMain,
  ArticleTopOfWeek,
}) => {
  return (
    <ArticlesContext.Provider
      value={{
        ArticleRecentMain,
        ArticleRecentSecondary,
        ArticlePopular,
        ArticlePopularSeconde,
        ArticleMostMain,
        ArticleTopOfWeek,
      }}
    >
      <Banner />
      <div className="app hidden lg:block relative w-full h-[290px] mt-6 2xl:mt-16 cursor-pointer">
        <Hastag style="absolute top-10 z-10  right-14">ads </Hastag>
        <Image
          src={PubliciteDeux}
          fill
          className="w-full h-[290px] object-cover"
          alt="Publicite"
        />
      </div>
      <Recent />
      <Popular />
      <Most />
      <NewLetter />
      <Hotstaff />
      <TopOfWeek />
    </ArticlesContext.Provider>
  );
};

export default Home;

export async function getStaticProps() {
  const allArticlesData = await import(`/data/thumbnail.json`);

  const ArticleRecentMain = allArticlesData.ArticleRecentMain;
  const ArticleRecentSecondary = allArticlesData.ArticleRecentSecondary;
  const ArticlePopular = allArticlesData.ArticlePopular;
  const ArticlePopularSeconde = allArticlesData.ArticlePopularSeconde;
  const ArticleMostMain = allArticlesData.ArticleMostMain;
  const ArticleTopOfWeek = allArticlesData.ArticleTopOfWeek;
  return {
    props: {
      ArticleRecentMain,
      ArticleRecentSecondary,
      ArticlePopular,
      ArticlePopularSeconde,
      ArticleMostMain,
      ArticleTopOfWeek,
    },
  };
}
