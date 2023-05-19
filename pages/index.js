import React, { createContext, useState, useEffect } from "react";
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
import MyDatabase from '../config/MyDatabase';



export const ArticlesContext = createContext();
const Home = ({
  ArticleRecentMain,
  ArticleRecentSecondary,
  ArticlePopular,
  ArticlePopularSeconde,
  ArticleMostMain,
  ArticleTopOfWeek
}) => {

  const testdata = {
    "clé1": "valeur1",
    "clé2": "valeur2",
    "clé3": 3
  }


  const getValue = async() => {
    const data = {query: 'getFullArticles', param: false} // query: ilay anaran'ilay méthode ao @ MyDatabase
    await fetch('/api/knexApi', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => console.log('data === ', data))
  }

  useEffect(() => {
    console.log('type of testdata', typeof(testdata))
   getValue()
  },[])
 


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
  const db = new MyDatabase
  var data = []
 await db.getFullArticles().then(item => data = item)
 
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
      data
    },
  };
}
