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

const ArticlePrincipale = ({
  listArticlesByCategoriesEn,
  listArticlesByCategoriesFr,
  listRecentArticlesEn,
  listRecentArticlesFr,
  listMostPopularEn,
  listMostPopularFr,
  listHastagEn,
  listHastagFr,
}) => {
  const [listRecent, setListRecent] = useState(listRecentArticlesEn);
  const [listPopular, setListPopular] = useState(listMostPopularEn);
  const [listHastag, setListHastag] = useState(listHastagEn);
  const storage = JSON.parse(localStorage.getItem("token"));
  const [lang, setLang] = useState("en");
  const [listArticles, setListArticles] = useState(listArticlesByCategoriesEn);
  const [currentArticles, setCurrentArticles] = useState();

  const linkBeautify = (link) => {
    const newLink = link.replace(/[';:,\s\u2019]/g, "-");
    return newLink.toLowerCase();
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
          <div>
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
          </div>
        </div>
        {/* Tag top article */}
        {/* <ul className="flex gap-4 overflow-scroll scrollbar-hide pt-4 lg:justify-between">
          {tag.map((tag) => (
            <li
              key={uuidv4()}
              className="tagBg px-2 py-1 border-[1px] border-gray-300 rounded font-bold uppercase text-xs cursor-pointer"
            >
              <Link href={`/${name}&${tag}`}>{tag}</Link>
            </li>
          ))}
        </ul> */}
        {/*Main [...article] + aside */}
        <div className="mt-10 justify-between gap-8 lg:flex">
          {/*Main ariticles*/}
          <div className="">
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
                      date={moment(article.created_at).format("MMMM Do YYYY")}
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

export async function getStaticProps({ params }) {
  const baseUrl = process.env.ROOT_URL;
  const data = await import(`/data/articles.json`);
  const dataAside = await import(`/data/thumbnail.json`);
  const articlePopular = dataAside.ArticlePopular;
  const categoryID = parseInt(params.slug[0]);
  let listRecentArticlesFr = []; // asina ny liste ny recent article (6 farany)
  let listRecentArticlesEn = []; // asina ny liste ny recent article (6 farany)
  let listArticlesByCategoriesEn = []; // asina ny liste ny article par category en (6 farany)
  let listArticlesByCategoriesFr = []; // asina ny liste ny article par category fr (6 farany)
  let listMostPopularEn = []; // asina ny liste-n'izay be mpijery, izany oe manana rating ambony (6 farany)
  let listMostPopularFr = []; // asina ny liste-n'izay be mpijery, izany oe manana rating ambony (6 farany)
  let articleData = [];
  let listHastagFr = [];
  let listHastagEn = [];

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
  /*                      ALAINA NY LISTE NY ARTICLE PAR CATEGORIE                   */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- FR ----------------------------------- */

  const paramCategoryFr = {
    query: "getArticleByCategoryLang",
    param: [categoryID, "fr"],
  }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(paramCategoryFr),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (listArticlesByCategoriesFr = data));

  /* ----------------------------------- EN ----------------------------------- */

  const paramCategoryEn = {
    query: "getArticleByCategoryLang",
    param: [categoryID, "en"],
  }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(paramCategoryEn),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (listArticlesByCategoriesEn = data));

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
  /*                   ALAINA NY LISTE NY HASTAG PAR CATEGORIES                  */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- FR ----------------------------------- */

  const paramHastagFr = {
    query: "getHastagByCategory",
    param: [categoryID, "fr"],
  }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(paramHastagFr),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (listHastagFr = data));

  /* ----------------------------------- EN ----------------------------------- */

  const paramHastagEn = {
    query: "getHastagByCategory",
    param: [categoryID, "en"],
  }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(paramHastagEn),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (listHastagEn = data));

  return {
    props: {
      listRecentArticlesEn: dataFilter(
        listRecentArticlesEn.result,
        "category_id",
        3
      ),
      listRecentArticlesFr: dataFilter(
        listRecentArticlesFr.result,
        "category_id",
        3
      ),
      listArticlesByCategoriesEn: listArticlesByCategoriesEn.result,
      listArticlesByCategoriesFr: listArticlesByCategoriesFr.result,
      listMostPopularEn: dataFilter(listMostPopularEn.result, "category_id", 4),
      listMostPopularFr: dataFilter(listMostPopularFr.result, "category_id", 4),
      listHastagEn: listHastagEn.result,
      listHastagFr: listHastagFr.result,
    },
  };
}

export async function getStaticPaths() {
  const baseUrl = process.env.ROOT_URL;
  let categories = [];
  /* -------------------------------------------------------------------------- */
  /*                    ALAINA NY LISTE NY CATEGORY REHETRA                    */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- FR ----------------------------------- */

  const paramCategory = { query: "getFullCategories", param: false }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(paramCategory),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (categories = data));

  const paths1 = categories.result.map((category) => ({
    params: { slug: [`${category.id}`, category.fr.toLowerCase()] },
  }));

  const paths2 = categories.result.map((category) => ({
    params: { slug: [`${category.id}`, category.en.toLowerCase()] },
  }));

  const paths = [...paths1, ...paths2];

  console.log("path == ", paths[0].params.slug);
  return {
    paths,
    fallback: false,
  };
}
