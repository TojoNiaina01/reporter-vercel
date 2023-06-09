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
import MyDatabase from "../config/MyDatabase";
import localStorage from "localStorage";
import { dataFilter } from "@/config/dataFilter";
import { ROOT_URL } from "@/env";
import bcrypt from "bcryptjs";

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
  const [hot, setHot] = useState(hotEn);

  const storage = JSON.parse(localStorage.getItem("token"));
  // const saltPassword = bcrypt.genSaltSync(10)
  // const passwordHash = bcrypt.hashSync('Admin@@123', saltPassword)

  // console.log("pass == ", passwordHash)

  const getValue = async () => {
    const paramFind = { query: "findUser", param: ["email"] };
    fetch(`${ROOT_URL}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramFind),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("search data === ", data));
  };

  useEffect(() => {
    console.log("type of testdata", typeof testdata);
    console.log("list recent en == ", listRecentArticlesEn);
    console.log("list recent fr == ", listRecentArticlesFr);

    if (storage.lang === "fr") {
      setListSlide(listSlideFr);
      setListRecent(listRecentArticlesFr);
      setListMostRead(listMostReadFr);
      setHot(hotFr);
      setListMostPopular(listMostPopularFr);
    }

    getValue();
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
      <Banner dataSlide={listSlide} />
      <div className="app relative mt-6 hidden h-[290px] w-full cursor-pointer lg:block 2xl:mt-16">
        <Hastag style="absolute top-10 z-10  right-14">ads </Hastag>
        <Image
          src={PubliciteDeux}
          fill
          className="h-[290px] w-full object-cover"
          alt="Publicite"
        />
      </div>
      <Recent dataRecent={listRecent} />
      <Popular dataMostPopular={listMostPopular} />
      <Most dataMostRead={listMostRead} />
      <NewLetter />
      <Hotstaff dataHot={hot} />
      {/* <TopOfWeek /> */}
    </ArticlesContext.Provider>
  );
};

export default Home;

export async function getStaticProps() {
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

  /* -------------------------------------------------------------------------- */
  /*                           maka ny slide fr sy en                           */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- FR ----------------------------------- */
  const paramSlideFr = { query: "getSlideByLang", param: ["fr"] }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(paramSlideFr),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (listSlideFr = data));

  /* ----------------------------------- EN ----------------------------------- */
  const paramSlideEn = { query: "getSlideByLang", param: ["en"] }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(paramSlideEn),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (listSlideEn = data));

  /* -------------------------------------------------------------------------- */
  /*                   ALAINA NY LISTE-N'NY CATEGORIE REHETRA                   */
  /* -------------------------------------------------------------------------- */

  const paramCategory = { query: "getFullCategories", param: false }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(paramCategory),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (listCategories = data));

  /* -------------------------------------------------------------------------- */
  /*                      ALAINA NY LISTE NY RECENT ARTICLE                     */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- FR ----------------------------------- */

  const paramRecentFr = { query: "getRecentArticle", param: ["fr"] }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(paramRecentFr),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (listRecentArticlesFr = data));

  /* ----------------------------------- EN ----------------------------------- */

  const paramRecentEn = { query: "getRecentArticle", param: ["en"] }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(paramRecentEn),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (listRecentArticlesEn = data));

  /* -------------------------------------------------------------------------- */
  /*                      ALAINA NY LISTE NY IZAY BE PAMAKY                     */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- FR ----------------------------------- */

  const paramMostReadFr = { query: "getMostReadByLang", param: ["fr"] }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(paramMostReadFr),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (listMostReadFr = data));

  /* ----------------------------------- EN ----------------------------------- */

  const paramMostReadEn = { query: "getMostReadByLang", param: ["en"] }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(paramMostReadEn),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (listMostReadEn = data));

  /* -------------------------------------------------------------------------- */
  /*                   ALAINA NY LISTE NY IZAY BE MPANOME AVIS                  */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- FR ----------------------------------- */

  const paramMostPopularFr = { query: "getMostPopular", param: ["fr"] }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(paramMostPopularFr),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (listMostPopularFr = data));

  /* ----------------------------------- EN ----------------------------------- */

  const paramMostPopularEn = { query: "getMostPopular", param: ["en"] }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(paramMostPopularEn),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (listMostPopularEn = data));

  /* -------------------------------------------------------------------------- */
  /*                             ALAINA NY HOT STAFF                            */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- FR ----------------------------------- */

  const paramHotFr = { query: "getHotByLang", param: ["fr"] }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(paramHotFr),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (hotFr = data));

  /* ----------------------------------- EN ----------------------------------- */

  const paramHotEn = { query: "getHotByLang", param: ["en"] }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(paramHotEn),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (hotEn = data));

  const ArticleRecentMain = allArticlesData.ArticleRecentMain;
  const ArticleRecentSecondary = allArticlesData.ArticleRecentSecondary;
  const ArticlePopular = allArticlesData.ArticlePopular;
  const ArticlePopularSeconde = allArticlesData.ArticlePopularSeconde;
  const ArticleMostMain = allArticlesData.ArticleMostMain;
  const ArticleTopOfWeek = allArticlesData.ArticleTopOfWeek;
  return {
    props: {
      listSlideFr: listSlideFr.result,
      listSlideEn: listSlideEn.result,
      listCategories: listCategories.result,
      listRecentArticlesEn:
        listRecentArticlesEn.result.length > 6
          ? listRecentArticlesEn.result.slice(0, 6)
          : listRecentArticlesEn.result,
      listRecentArticlesFr:
        listRecentArticlesFr.result.length > 6
          ? listRecentArticlesFr.result.slice(0, 6)
          : listRecentArticlesFr.result,
      listMostReadFr:
        listMostReadFr.result.length > 4
          ? listMostReadFr.result.slice(0, 4)
          : listMostReadFr.result,
      listMostReadEn:
        listMostReadEn.result.length > 4
          ? listMostReadEn.result.slice(0, 4)
          : listMostReadEn.result,
      hotEn: hotEn.result[0],
      hotFr: hotFr.result[0],
      listMostPopularEn: dataFilter(listMostPopularEn.result, "category_id", 5),
      listMostPopularFr: dataFilter(listMostPopularFr.result, "category_id", 5),
    },
  };
}
