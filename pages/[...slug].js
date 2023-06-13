import React, { useState, useEffect } from "react";
import Title from "@/components/Title";
import { v4 as uuidv4 } from "uuid";
import HeaderCategory from "@/components/HeaderCategory";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import DateAuteur from "@/components/DateAuteur";
import AsideRecentPopular from "@/components/pageIndiv/AsideRecentPopular";
import { PubliciteDeux } from "@/public/assets/img";
import Hastag from "@/components/Hastag";
import { dataFilter } from "@/config/dataFilter";
import localStorage from "localStorage";
import moment from "moment";
import Paginate from "@/components/Paginate";
import axios from "axios";
import { basePath } from "@/next.config";
import MyDatabase from "@/config/MyDatabase";
import { ROOT_URL } from "@/env";
import path from "path";

const linkBeautify = (link) => {
  const newLink = link.replace(/[?'%;:,\s\u2019]/g, "-");
  return newLink.toLowerCase()
};

const checkLink = (data, id, name) => {
  const checkID = data.filter(category => category.id === id)
  const checkTitle = data.filter(category => linkBeautify(category.lang) === name.toLowerCase())
  const logic = (checkID.length && checkTitle.length) ? true : false

  return logic
}

const ArticlePrincipale = ({
  listArticlesByCategoriesEn,
  listArticlesByCategoriesFr,
  listRecentArticlesEn,
  listRecentArticlesFr,
  listMostPopularEn,
  listMostPopularFr,
  listHastagEn,
  listHastagFr,
  adsHorizontale,
  adsVertical,
  pathRacing
}) => {
  const [listRecent, setListRecent] = useState(listRecentArticlesEn);
  const [listPopular, setListPopular] = useState(listMostPopularEn);
  const [listHastag, setListHastag] = useState(listHastagEn);
  const storage = JSON.parse(localStorage.getItem("token"));
  const [lang, setLang] = useState("en");
  const [listArticles, setListArticles] = useState(listArticlesByCategoriesEn);
  const [currentArticles, setCurrentArticles] = useState();

  const linkBeautify = (link) => {
    const newLink = link.replace(/[?%';:,\s\u2019]/g, "-");
    return newLink.toLowerCase()
  };

  /* ------------------------------- pagination ------------------------------- */
  const [itemOffset, setItemOffset] = useState(null);
  const itemsPerPage = 4;
  const handlerPageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % listArticles.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentArticles(listArticles.slice(itemOffset, endOffset));
    if (storage.lang === "fr") {
      setListRecent(listRecentArticlesFr);
      setListArticles(listArticlesByCategoriesFr);
      setListPopular(listMostPopularFr);
      setListHastag(listHastagFr);
      setLang("fr");
    }
  }, [itemOffset, itemsPerPage, listArticles]);
  return (
    <>
      <section className="mx-2 mt-10">
        {/* Header sy Search */}
        <div className="flex items-center justify-between gap-1">
          <HeaderCategory
            title={
              listArticles.length > 0
                ? lang && listArticles[0][`category_${lang}`]
                : ""
            }
            style
          />
          {/* <div>
            <form
              action=""
              className="relative mx-auto w-max rounded-full bg-secondary-100"
            >
              <input
                type="index"
                className="peer relative z-10 h-12 w-12 cursor-pointer rounded-full border bg-transparent pl-12
              outline-none focus:w-full focus:cursor-text focus:border-secondary-400 focus:pl-16 focus:pr-4"
              />
              <MagnifyingGlassIcon className="absolute inset-y-0 my-auto h-8 w-12 border-r  border-transparent stroke-secondary-500 px-3.5 peer-focus:border-secondary-400 peer-focus:stroke-secondary-500" />
            </form>
          </div> */}
        </div >
        {/* Tag top article */}
        <ul className="flex gap-4 overflow-scroll scrollbar-hide pt-4">
          {listHastag?.map((tag) => (
            <li
              key={uuidv4()}
              className="tagBg px-2 py-1 border-[1px] border-gray-300 rounded font-bold uppercase text-xs cursor-pointer"
            >
              <Link href={`/hastag/${tag.id}/${linkBeautify(tag.name)}`}>{tag.name}</Link>
            </li>
          ))}
        </ul>
        {/*Main [...article] + aside */}
        <div className="mt-10 justify-between gap-8 lg:flex">
          {/*Main ariticles*/}
          <div className="w-full">
            <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-4 lg:grid-cols-1">
              {currentArticles?.map((article) => (
                <article key={uuidv4()} className="group cursor-pointer">
                  <figure className="relative h-[250px] w-full lg:h-[450px]">
                    <Image
                      src={`/uploads/images/${article.image[0].image_name}.${article.image[0].image_extension}`}
                      fill
                      className="rounded object-cover"
                      alt="Article Image blog"
                    />
                  </figure>
                  <div className="mx-1">
                    <DateAuteur
                      date={article.created_at}
                      auteur={article.author}
                    />
                    <Title style="text-xl tracking-wide leading-6 group-hover:underline lg:text-2xl lg:leading-5">
                      {article.title}
                    </Title>
                    <p className="py-3 text-sm lg:py-2">
                      {article.description.length > 255
                        ? `${article.description.substring(0, 255)}...`
                        : article.description}
                    </p>
                    <Link
                      href={`/article/${article.id}/${linkBeautify(
                        article.title
                      )}`}
                    >
                      <button className="rounded-full bg-main-400 px-4 py-3 text-xs font-semibold tracking-wide text-white shadow-md active:scale-95 lg:my-1">
                        {lang === "en" ? "Read more" : "Voir plus"}
                      </button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="mb-10 mt-10">
              {listArticles.length > 4 && (
                <Paginate
                  itemsPerPage={itemsPerPage}
                  handlerPage={handlerPageClick}
                  items={listArticles}
                />
              )}
            </div>
          </div>
          {/*Aside*/}
          <AsideRecentPopular
            articleRecent={listRecent}
            listPopular={listPopular}
            listHastag={listHastag}
            adsVertical={adsVertical}
            name={
              listArticles.length > 0
                ? lang && listArticles[0][`category_${lang}`]
                : ""
            }
          />
        </div>
      </section>
      <div className="relative mt-10 hidden h-[250px] w-full lg:block">
        <Hastag style="absolute top-5 z-10  right-14">ads </Hastag>
        <Image
          src={PubliciteDeux}
          fill
          className="object-cover"
          alt="publicite"
        />
      </div>
    </>
  );
};

export default ArticlePrincipale;


export async function getServerSideProps(context){
  const linkTab = context.query.slug
  const categoryID = parseInt(linkTab[0])
  const name = linkTab[1]
  const db = new MyDatabase()
  
  let listCategoriesFr = []
  let listCategoriesEn = []
  let listFullCategories = []

  const pathRacing = path.join(process.cwd())

  console.log("path == ", pathRacing)

  await db.getFullCategories().then(category => listFullCategories = category)
  listCategoriesEn = listFullCategories.map(category => {
    return {id: category.id, lang: category.en}
  })
  listCategoriesFr = listFullCategories.map(category => {
    return {id: category.id, lang: category.fr}
  })

  listFullCategories = [...listCategoriesEn, ...listCategoriesFr]

  /* -------------------------------------------------------------------------- */
  /*                                 CHECK LIEN                                 */
  /* -------------------------------------------------------------------------- */

  
    /* -------------------------------------------------------------------------- */
    /*        ALAINA NY LISTE NY HASTAG REHETRA MBA I-CHECKENA LIEN MIDITRA       */
    /* -------------------------------------------------------------------------- */

    if(!isNaN(categoryID) && name && linkTab.length === 2){ // vérifiena alo oe type nombre ve
      if(checkLink(listFullCategories, categoryID, name.toLowerCase())){
          

        /* ------------------------- *********************** ------------------------ */
        /* -------------------------------------------------------------------------- */
        /*                            ALAINA DAHOLO NY DATA                           */
        /* -------------------------------------------------------------------------- */
        /* ----------------------- *************************** ---------------------- */

        let listRecentArticlesFr = []; // asina ny liste ny recent article (6 farany)
        let listRecentArticlesEn = []; // asina ny liste ny recent article (6 farany)
        let listArticlesByCategoriesEn = []; // asina ny liste ny article par category en (6 farany)
        let listArticlesByCategoriesFr = []; // asina ny liste ny article par category fr (6 farany)
        let listMostPopularEn = []; // asina ny liste-n'izay be mpijery, izany oe manana rating ambony (6 farany)
        let listMostPopularFr = []; // asina ny liste-n'izay be mpijery, izany oe manana rating ambony (6 farany)
        let articleData = [];
        let listHastagFr = [];
        let listHastagEn = [];
        let adsHorizontale = []
        let adsVertical = []
      
        /* -------------------------------------------------------------------------- */
        /*                      ALAINA NY LISTE NY RECENT ARTICLE                     */
        /* -------------------------------------------------------------------------- */
      
        /* ----------------------------------- FR ----------------------------------- */
      
        await db.getRecentArticle("fr").then(data => listRecentArticlesFr = data)
      
      
        /* ----------------------------------- EN ----------------------------------- */
      
        await db.getRecentArticle("en").then(data => listRecentArticlesEn = data)
      
      
        /* -------------------------------------------------------------------------- */
        /*                      ALAINA NY LISTE NY ARTICLE PAR CATEGORIE                   */
        /* -------------------------------------------------------------------------- */
      
        /* ----------------------------------- FR ----------------------------------- */
      
        await db.getArticleByCategoryLang(categoryID, "fr").then(data => listArticlesByCategoriesFr = data)
      
      
        /* ----------------------------------- EN ----------------------------------- */
      
        await db.getArticleByCategoryLang(categoryID, "en").then(data => listArticlesByCategoriesEn = data)
        
      
        /* -------------------------------------------------------------------------- */
        /*                   ALAINA NY LISTE NY IZAY BE MPANOME AVIS                  */
        /* -------------------------------------------------------------------------- */
      
        /* ----------------------------------- FR ----------------------------------- */
      
        await db.getMostPopular("fr").then(data => listMostPopularFr = data)
      
      
        /* ----------------------------------- EN ----------------------------------- */
      
        await db.getMostPopular("en").then(data => listMostPopularEn = data)
      
        /* -------------------------------------------------------------------------- */
        /*                   ALAINA NY LISTE NY HASTAG PAR CATEGORIES                  */
        /* -------------------------------------------------------------------------- */
      
        /* ----------------------------------- FR ----------------------------------- */
      
        await db.getHastagByCategory(categoryID, "fr").then(data => listHastagFr = data)
      
      
        /* ----------------------------------- EN ----------------------------------- */
      
        await db.getHastagByCategory(categoryID, "en").then(data => listHastagEn = data)
      
      
          /* -------------------------------------------------------------------------- */
        /*                               ALAINA ADS                                   */
        /* -------------------------------------------------------------------------- */
      
        /* ----------------------------------- horizontale ----------------------------------- */
      
        await db.getAdsByDate("horizontale").then(data => adsHorizontale = data)
      
      
        /* ----------------------------------- EN ----------------------------------- */
      
        await db.getAdsByDate("verticale").then(data => adsVertical = data)
      
      
        return {
          props: {
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
            listArticlesByCategoriesEn: listArticlesByCategoriesEn,
            listArticlesByCategoriesFr: listArticlesByCategoriesFr,
            listMostPopularEn: dataFilter(listMostPopularEn, "category_id", 4),
            listMostPopularFr: dataFilter(listMostPopularFr, "category_id", 4),
            listHastagEn: listHastagEn,
            listHastagFr: listHastagFr,
            adsHorizontale: adsHorizontale,
            adsVertical: adsVertical,
            pathRacing
          },
        };


      }
    }


  return {
    redirect: {
      destination: "/404"
    }
  }
}

