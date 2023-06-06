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

const ArticlePrincipale = ({ listArticlesByCategoriesEn, listArticlesByCategoriesFr, articlePopular, listRecentArticlesEn, listRecentArticlesFr }) => {
  const [listRecent, setListRecent] = useState(listRecentArticlesEn)
  const [listArticles, setListArticles] = useState(listArticlesByCategoriesEn)
  const storage = JSON.parse(localStorage.getItem('token'))
  const [lang, setLang] = useState("en")
  const linkBeautify = (link) => {
    return link.replace(/\s+/g, "-");
  };

  useEffect(() => {
    if(storage.lang === "fr"){
      setListRecent(listRecentArticlesFr)
      setListArticles(listArticlesByCategoriesFr)
      setLang("fr")
    }
  })
  return (
    <>
      <section className="mt-10 mx-2">
        {/* Header sy Search */}
        <div className="flex justify-between items-center gap-1">
          <HeaderCategory title={listArticles.length > 0 ? (lang&&listArticles[0][`category_${lang}`]) : ""} style />
          <div>
            <form
              action=""
              className="relative mx-auto w-max bg-secondary-100 rounded-full"
            >
              <input
                type="index"
                className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12
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
        <div className="lg:flex gap-8 justify-between mt-10">
          {/*Main ariticles*/}
          <div className="">
            <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-4 lg:grid-cols-1">
              {listArticles?.map((article) => (
                <article key={uuidv4()} className="cursor-pointer group">
                  <figure className="relative w-full h-[250px] lg:h-[450px]">
                    <Image
                      src={`/uploads/images/${article.image[0].image_name}.${article.image[0].image_extension}`}
                      fill
                      className="object-cover rounded"
                      alt="Article Image blog"
                    />
                  </figure>
                  <div className="mx-1">
                    <DateAuteur date={moment(article.created_at).format('MMMM Do YYYY')} auteur={article.author} />
                    <Title style="text-xl tracking-wide leading-6 group-hover:underline lg:text-2xl lg:leading-5">
                      {article.title}
                    </Title>
                    <p className="text-sm py-3 lg:py-2">{article.description.length > 255 ? `${article.description.substring(0,255)}...` : article.description}</p>
                    <Link href={`/article/${article.id}/${linkBeautify(article.title)}`}>
                      <button className="bg-main-400 text-white font-semibold py-3 px-4 rounded-full shadow-md uppercase tracking-wide text-xs active:scale-95 lg:my-1">
                        read more
                      </button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <h6 className="text-4xl font-bold py-6 text-center">PAGINATION</h6>
          </div>
          {/*Aside*/}
          <AsideRecentPopular
            articleRecent={listRecent}
            articlePopular={articlePopular}
            name={listArticles.length > 0 ? listArticles[0].category_fr : ""}
          />
        </div>
      </section>
      <div className="hidden lg:block relative w-full h-[250px] mt-10">
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
  const baseUrl = process.env.ROOT_URL
  const data = await import(`/data/articles.json`);
  const dataAside = await import(`/data/thumbnail.json`);
  const articlePopular = dataAside.ArticlePopular;
  const categoryID = parseInt(params.slug[0])
  let listRecentArticlesFr = [] // asina ny liste ny recent article (6 farany)
  let listRecentArticlesEn = [] // asina ny liste ny recent article (6 farany)
  let listArticlesByCategoriesEn = [] // asina ny liste ny article par category en (6 farany)
  let listArticlesByCategoriesFr = [] // asina ny liste ny article par category fr (6 farany)
  let articleData = []

   /* -------------------------------------------------------------------------- */
    /*                      ALAINA NY LISTE NY RECENT ARTICLE                     */
    /* -------------------------------------------------------------------------- */

    /* ----------------------------------- FR ----------------------------------- */

    const paramRecentFr = {query: 'getRecentArticle', param: ['fr']} // query: ilay anaran'ilay méthode ao @ MyDatabase
    await fetch(`${baseUrl}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramRecentFr),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => listRecentArticlesFr = data)


    /* ----------------------------------- EN ----------------------------------- */

    const paramRecentEn = {query: 'getRecentArticle', param: ['en']} // query: ilay anaran'ilay méthode ao @ MyDatabase
    await fetch(`${baseUrl}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramRecentEn),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => listRecentArticlesEn = data)


   /* -------------------------------------------------------------------------- */
    /*                      ALAINA NY LISTE NY ARTICLE PAR CATEGORIE                   */
    /* -------------------------------------------------------------------------- */

    /* ----------------------------------- FR ----------------------------------- */

    const paramCategoryFr = {query: 'getArticleByCategoryLang', param: [categoryID, 'fr']} // query: ilay anaran'ilay méthode ao @ MyDatabase
    await fetch(`${baseUrl}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramCategoryFr),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => listArticlesByCategoriesFr = data)


    /* ----------------------------------- EN ----------------------------------- */

    const paramCategoryEn = {query: 'getArticleByCategoryLang', param: [categoryID, 'en']} // query: ilay anaran'ilay méthode ao @ MyDatabase
    await fetch(`${baseUrl}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramCategoryEn),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => listArticlesByCategoriesEn = data)


  return {
    props: {
      articlePopular,
      listRecentArticlesEn: dataFilter(listRecentArticlesEn.result, "category_id", 3),
      listRecentArticlesFr: dataFilter(listRecentArticlesFr.result, "category_id", 3),
      listArticlesByCategoriesEn: listArticlesByCategoriesEn.result,
      listArticlesByCategoriesFr: listArticlesByCategoriesFr.result
    },
  };
}



export async function getStaticPaths() {
  const baseUrl = process.env.ROOT_URL
  let categories = []
   /* -------------------------------------------------------------------------- */
    /*                    ALAINA NY LISTE NY CATEGORY REHETRA                    */
    /* -------------------------------------------------------------------------- */

    /* ----------------------------------- FR ----------------------------------- */

    const paramCategory = {query: 'getFullCategories', param: false} // query: ilay anaran'ilay méthode ao @ MyDatabase
    await fetch(`${baseUrl}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramCategory),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => categories = data)

  const paths1 = categories.result.map((category) => ({
    params: { slug: [`${category.id}` ,category.fr.toLowerCase()]},
  }));

  const paths2 = categories.result.map((category) => ({
    params: { slug: [`${category.id}` ,category.en.toLowerCase()]},
  }));

  const paths = [...paths1, ...paths2]

  console.log("path == ", paths[0].params.slug)
  return {
    paths,
    fallback: false,
  };
}
