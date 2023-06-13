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
import localStorage from "localStorage";
import { dataFilter } from "@/config/dataFilter";
import { ROOT_URL } from "@/env";
import bcrypt from "bcryptjs";
import MyDatabase from "../config/MyDatabase";

export const ArticlesContext = createContext();
const Home = ({
  ArticleRecentMain,
  ArticleRecentSecondary,
  ArticlePopular,
  ArticlePopularSeconde,
  ArticleMostMain,
  ArticleTopOfWeek,
  listSlideEn,
  listSlideFr,
  listCategories,
  listRecentArticlesEn,
  listRecentArticlesFr,
  listMostReadEn,
  listMostReadFr,
  listMostPopularEn,
  listMostPopularFr,
  hotEn,
  hotFr,
  adsHorizontale,
  adsVertical
}) => {
  const testdata = {
    clé1: "valeur1",
    clé2: "valeur2",
    clé3: 3,
  };

  const [listSlide, setListSlide] = useState(listSlideEn);
  const [listRecent, setListRecent] = useState(listRecentArticlesEn);
  const [listMostRead, setListMostRead] = useState(listMostReadEn);
  const [listMostPopular, setListMostPopular] = useState(listMostPopularEn);
  const [hot, setHot] = useState(hotEn[0]&&hotEn[0]);

  const storage = JSON.parse(localStorage.getItem("token"));
  // const saltPassword = bcrypt.genSaltSync(10)
  // const passwordHash = bcrypt.hashSync('Admin@@123', saltPassword)

  // console.log("pass == ", passwordHash)

 
  useEffect(() => {

    if (storage.lang === "fr") {
      setListSlide(listSlideFr);
      setListRecent(listRecentArticlesFr);
      setListMostRead(listMostReadFr);
      setHot(hotFr[0]&&hotFr[0]);
      setListMostPopular(listMostPopularFr);
    }

  
  }, []);

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
      <Banner dataSlide={listSlide} adsVertical={adsVertical}/>
      {adsHorizontale[0]&&<div className="app relative mt-6 hidden h-[290px] w-full cursor-pointer lg:block 2xl:mt-16">
        <Hastag style="absolute top-10 z-10  right-14">ads </Hastag>
        <Image
          src={`/uploads/images/${adsHorizontale[0].image_name}.${adsHorizontale[0].image_extension}`}
          fill
          className="h-[290px] w-full object-cover"
          alt="Publicite"
        />
      </div>}
      <Recent dataRecent={listRecent} />
      <Popular dataMostPopular={listMostPopular} />
      <Most dataMostRead={listMostRead} listCategories={listCategories} adsVertical={adsVertical}/>
      <NewLetter />
      {hot&&<Hotstaff dataHot={hot} />}
      {/* <TopOfWeek /> */}
    </ArticlesContext.Provider>
  );
};

export default Home;

export async function getServerSideProps() {
  const baseUrl = process.env.ROOT_URL;
  const allArticlesData = await import(`/data/thumbnail.json`);
  const db = new MyDatabase();
  var data = [];
  await db.getFullArticles().then((item) => (data = item));

  let listSlideFr = []; // asina ny liste slide en français
  let listSlideEn = []; // asina ny liste slide en Anglais
  let listCategories = []; // asina ny liste ny categories rehetra
  let listRecentArticlesFr = []; // asina ny liste ny recent article (6 farany)
  let listRecentArticlesEn = []; // asina ny liste ny recent article (6 farany)
  let listMostReadEn = []; // asina ny liste ny most read en (6 farany)
  let listMostReadFr = []; // asina ny liste ny most read fr (6 farany)
  let listMostPopularEn = []; // asina ny liste-n'izay be mpijery, izany oe manana rating ambony (6 farany)
  let listMostPopularFr = []; // asina ny liste-n'izay be mpijery, izany oe manana rating ambony (6 farany)
  let hotEn = [];
  let hotFr = [];
  let adsHorizontale = []
  let adsVertical = []

  /* -------------------------------------------------------------------------- */
  /*                           maka ny slide fr sy en                           */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- FR ----------------------------------- */

  await db.getSlideByLang("fr").then(data => listSlideFr = data)

  /* ----------------------------------- EN ----------------------------------- */

  await db.getSlideByLang("en").then(data => listSlideEn = data)

  /* -------------------------------------------------------------------------- */
  /*                   ALAINA NY LISTE-N'NY CATEGORIE REHETRA                   */
  /* -------------------------------------------------------------------------- */

  await db.getFullCategories().then(data => listCategories = data)

  /* -------------------------------------------------------------------------- */
  /*                      ALAINA NY LISTE NY RECENT ARTICLE                     */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- FR ----------------------------------- */

  await db.getRecentArticle("fr").then(data => listRecentArticlesFr = data)

  /* ----------------------------------- EN ----------------------------------- */

  await db.getRecentArticle("en").then(data => listRecentArticlesEn = data)


  /* -------------------------------------------------------------------------- */
  /*                      ALAINA NY LISTE NY IZAY BE PAMAKY                     */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- FR ----------------------------------- */

  await db.getMostReadByLang("fr").then(data => listMostReadFr = data)

  /* ----------------------------------- EN ----------------------------------- */

  await db.getMostReadByLang("en").then(data => listMostReadEn = data)


  /* -------------------------------------------------------------------------- */
  /*                   ALAINA NY LISTE NY IZAY BE MPANOME AVIS                  */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- FR ----------------------------------- */

  await db.getMostPopular("fr").then(data => listMostPopularFr = data)

  /* ----------------------------------- EN ----------------------------------- */

  await db.getMostPopular("en").then(data => listMostPopularEn = data)


  /* -------------------------------------------------------------------------- */
  /*                             ALAINA NY HOT STAFF                            */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- FR ----------------------------------- */

  await db.getHotByLang("fr").then(data => hotFr = data)

  /* ----------------------------------- EN ----------------------------------- */

  await db.getHotByLang("en").then(data => hotEn = data)


  /* -------------------------------------------------------------------------- */
  /*                               ALAINA ADS                                   */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- horizontale ----------------------------------- */

  await db.getAdsByDate("horizontale").then(data => adsHorizontale = data)


  /* ----------------------------------- EN ----------------------------------- */

  await db.getAdsByDate("verticale").then(data => adsVertical = data)

  return {
    props: {
      listSlideFr: listSlideFr,
      listSlideEn: listSlideEn,
      listCategories: listCategories,
      listRecentArticlesEn:
        listRecentArticlesEn.length > 6
          ? listRecentArticlesEn.slice(0, 6)
          : listRecentArticlesEn,
      listRecentArticlesFr:
        listRecentArticlesFr.length > 6
          ? listRecentArticlesFr.slice(0, 6)
          : listRecentArticlesFr,
      listMostReadFr:
        listMostReadFr.length > 4
          ? listMostReadFr.slice(0, 4)
          : listMostReadFr,
      listMostReadEn:
        listMostReadEn.length > 4
          ? listMostReadEn.slice(0, 4)
          : listMostReadEn,
      hotEn: hotEn,
      hotFr: hotFr,
      listMostPopularEn: dataFilter(listMostPopularEn, "category_id", 5),
      listMostPopularFr: dataFilter(listMostPopularFr, "category_id", 5),
      adsHorizontale: adsHorizontale,
      adsVertical: adsVertical
    },
  };
}
