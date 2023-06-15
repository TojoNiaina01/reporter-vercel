import React, { useState, useEffect } from "react";
import HeaderCategory from "@/components/HeaderCategory";
import {
  ArrowDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import AsideRecentPopular from "@/components/pageIndiv/AsideRecentPopular";
import { ArrowUpIcon } from "@heroicons/react/20/solid";
import DateAuteur from "@/components/DateAuteur";
import Title from "@/components/Title";
import Image from "next/image";
import { PolitiqueArticleOne } from "@/public/assets/img";
import {v4 as uuidv4} from "uuid";
import MyDatabase from "@/config/MyDatabase";
import { useRouter } from "next/router";
import { dataFilter } from "@/config/dataFilter";
import localStorage from "localStorage";
import Paginate from "@/components/Paginate";
import { ROOT_URL } from "@/env";

const search = ({
  listMostPopularEn,
  listMostPopularFr,
  listRecentArticlesEn,
  listRecentArticlesFr,
  listSearch,
  searchTag,
  adsHorizontale,
  adsVertical
}) => {
  const router = useRouter();
  const [order, setOrder] = useState(false);
  const [listRecent, setListRecent] = useState(listRecentArticlesEn);
  const [listPopular, setListPopular] = useState(listMostPopularEn);
  const storage = JSON.parse(localStorage.getItem("token"));
  const [titre, setTitre] = useState("Search Result :")
  const [miniTitre, setMiniTitre] = useState("Search - page")

  const linkBeautify = (link) => {
    const newLink = link.replace(/[?'%;:,\s\u2019]/g, "-");
    return newLink.toLowerCase()
  };  

  /* ------------------------------- pagination ------------------------------- */
  const [itemOffset, setItemOffset] = useState(null);
  const [currentArticles, setCurrentArticles] = useState();
  const itemsPerPage = 12;
  const handlerPageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % listSearch.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentArticles(listSearch.slice(itemOffset, endOffset));
    if (storage.lang === "fr") {
      setListRecent(listRecentArticlesFr);
      setListPopular(listMostPopularFr);
      setTitre("Resultat de : ")
      setMiniTitre("Recherche - page")
    }
  }, [itemOffset, itemsPerPage, listSearch]);

  const redirectHandler = (id, title) => {
    router.push(`/article/${id}/${linkBeautify(title)}`);
  };
  
  return (
    <section className="mt-10 mx-2">
      {/* TOP */}
      <div className="flex justify-between items-center gap-1 lg:items-start">
        <div>
          <HeaderCategory title={`${titre} ${searchTag}`} style />
          <p className="text-xs lg:text-sm font-thin tracking-wide">
            {miniTitre}
          </p>
        </div>
        <div className="z-10 absolute right-5 md:static">
          <form className="relative mx-auto w-max bg-secondary-100 rounded-full">
            <input
              type="index"
              className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12
              outline-none focus:w-full focus:cursor-text focus:border-secondary-400 focus:pl-16 focus:pr-4"
            />
            <MagnifyingGlassIcon className="absolute inset-y-0 my-auto h-8 w-12 border-r  border-transparent stroke-secondary-500 px-3.5 peer-focus:border-secondary-400 peer-focus:stroke-secondary-500" />
          </form>
        </div>
      </div>

      <div className="mt-4 lg:flex gap-8 justify-between">
        <div className="w-full">
          <div className="flex justify-between items-center">
            {/* <button onClick={() => setOrder(!order)}>
              {order ? (
                <p className="flex items-center font-semibold gap-1">
                  Newest <ArrowDownIcon className="h-3 w-3" />
                </p>
              ) : (
                <p className="flex items-center font-semibold gap-1">
                  Older <ArrowUpIcon className="h-3 w-3" />
                </p>
              )}
            </button> */}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {currentArticles?.map((articleData) => (
              <div onClick={() =>
                redirectHandler(articleData.id, articleData.title)
              } 
              key={uuidv4()} className="group cursor-pointer flex flex-col bg-[#EFF2FB]  mb-2 rounded overflow-hidden lg:flex-row">
                <Image
                  src={`${ROOT_URL}/images/${articleData.image[0].image_name}.${articleData.image[0].image_extension}`}
                  className="h-[150px] object-cover md:w-full/2 md:h-full/2 lg:w-[250px] lg:h-full"
                  alt={articleData.title.substring(0, 50)}
                  width={1200}
                  height={575}
                />
                <div className="mx-2 lg:pt-5">
                  <Title style="text-base tracking-wide lg:text-xl ">
                  {articleData.title}
                  </Title>
                  <DateAuteur
                    date={articleData.created_at}
                    auteur={articleData.author}
                    style="text-secondary-500 py-1 "
                  />
                  <p className="text-sm text-secondary-700">
                  {articleData.description.length > 255
                      ? `${articleData.description.substring(0, 255)}...`
                      : articleData.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h7 className="text-xl font-semibold text-center w-full">
          {listSearch.length > 12 && (
              <Paginate
                itemsPerPage={itemsPerPage}
                handlerPage={handlerPageClick}
                items={listSearch}
              />
            )}
          </h7>
        </div>
        <AsideRecentPopular
           articleRecent={listRecent}
           listPopular={listPopular}
           adsVertical={adsVertical}
           
           hastagPage
        />
      </div>
    </section>
  );
};

export default search;

export async function getServerSideProps({query}) {
  
  const db = new MyDatabase()
  let listSearch = []
  let listRecentArticlesFr = []; // asina ny liste ny recent article (6 farany)
  let listRecentArticlesEn = []; // asina ny liste ny recent article (6 farany)
  let listMostPopularEn = []; // asina ny liste-n'izay be mpijery, izany oe manana rating ambony (6 farany)
  let listMostPopularFr = []; // asina ny liste-n'izay be mpijery, izany oe manana rating ambony (6 farany)
  let adsHorizontale = []
  let adsVertical = []

  if(!query.search || !query.lang){
    return {
      redirect: {
        destination: "/"
      }
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                        ALAINA NY RESULTAT RECHERCHE                        */
  /* -------------------------------------------------------------------------- */
    const resSearch =  query.search.replace(/[%20]/g, " ");
    console.log("resulta == ", resSearch)
    await db.searchArticle(resSearch, query.lang).then(data => listSearch = data)
    


  /* -------------------------------------------------------------------------- */
  /*                      ALAINA NY LISTE NY RECENT ARTICLE                     */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- FR ----------------------------------- */

  await db.getRecentArticle('fr').then(data => listRecentArticlesFr = data)

  /* ----------------------------------- EN ----------------------------------- */

  await db.getRecentArticle('en').then(data => listRecentArticlesEn = data)

  /* -------------------------------------------------------------------------- */
  /*                   ALAINA NY LISTE NY IZAY BE MPANOME AVIS                  */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- FR ----------------------------------- */

  await db.getMostPopular('fr').then(data => listMostPopularFr = data)

  /* ----------------------------------- EN ----------------------------------- */

  await db.getMostPopular('en').then(data => listMostPopularEn = data)

  /* -------------------------------------------------------------------------- */
  /*                               ALAINA ADS                                   */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- horizontale ----------------------------------- */

  await db.getAdsByDate("horizontale").then(data => adsHorizontale = data)


  /* ----------------------------------- EN ----------------------------------- */

  await db.getAdsByDate("verticale").then(data => adsVertical = data)
  

  return {
    props: {
      searchTag: query.search,
      listSearch,
      listRecentArticlesEn: dataFilter(
        listRecentArticlesEn,
        "category_id",
        3
      ),
      listRecentArticlesFr: dataFilter(
        listRecentArticlesFr,
        "category_id",
        3
      ),
      listMostPopularEn: dataFilter(listMostPopularEn, "category_id", 4),
      listMostPopularFr: dataFilter(listMostPopularFr, "category_id", 4),
      adsHorizontale: adsHorizontale,
      adsVertical: adsVertical
    }
    }
  }

