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
import {v4 as uuidv4} from "uuid";
import moment from "moment";
import { useRouter } from "next/router";
import { dataFilter } from "@/config/dataFilter";
import localStorage from "localStorage";
import Paginate from "@/components/Paginate";

const Hastag = ({ listMostPopularEn, listMostPopularFr, listRecentArticlesEn, listRecentArticlesFr, listArticles, hastagData }) => {
  const router = useRouter()
  const [order, setOrder] = useState(false);
  const [listRecent, setListRecent] = useState(listRecentArticlesEn)
  const [listPopular, setListPopular] = useState(listMostPopularEn)
  const storage = JSON.parse(localStorage.getItem('token'))
  const rating = JSON.parse(localStorage.getItem('token')).rating

  const linkBeautify = (link) => {
    const newLink = link.replace(/[;:',\s]/g, "-");
    return newLink.toLowerCase()
  };  

  /* ------------------------------- pagination ------------------------------- */
  const [itemOffset, setItemOffset] = useState(null)
  const [currentArticles, setCurrentArticles] = useState()
  const itemsPerPage = 12
  const handlerPageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % listArticles.length;
    setItemOffset(newOffset)
  }

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentArticles(listArticles.slice(itemOffset, endOffset))
    if(storage.lang === 'fr'){
      setListRecent(listRecentArticlesFr)
      setListPopular(listMostPopularFr)
    }
  },[itemOffset, itemsPerPage, listArticles])



  const redirectHandler = (id, title) => {
    router.push(`/article/${id}/${linkBeautify(title)}`)
  }
  return (
    <section className="mt-10 mx-2">
      {/* TOP */}
      <div className="flex justify-between items-center gap-1 lg:items-start">
        <div>
          <HeaderCategory title={`#${hastagData.name}`} style />
          <p className="text-xs lg:text-sm font-thin tracking-wide">
          Hastag - page
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
            <button onClick={() => setOrder(!order)}>
              {order ? (
                <p className="flex items-center font-semibold gap-1">
                  Newest <ArrowDownIcon className="h-3 w-3" />
                </p>
              ) : (
                <p className="flex items-center font-semibold gap-1">
                  Older <ArrowUpIcon className="h-3 w-3" />
                </p>
              )}
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">

            {currentArticles?.map((articleData) => (
              <div key={uuidv4()} className="group cursor-pointer flex flex-col bg-[#EFF2FB]  mb-2 rounded overflow-hidden lg:flex-row">
                <Image
                  src={`/uploads/images/${articleData.image[0].image_name}.${articleData.image[0].image_extension}`}
                  className="h-[150px] object-cover md:w-full/2 md:h-full/2 lg:w-[250px] lg:h-full"
                  alt="Article image blog"
                  width={1200}
                  height={575}
                />
                <div className="mx-2 lg:pt-5" onClick={() => redirectHandler(articleData.id, articleData.title)}>
                  <Title style="text-base tracking-wide lg:text-xl">
                    {articleData.title}
                  </Title>
                  <DateAuteur
                    date={moment(articleData.created_at).format('MMMM Do YYYY')} auteur={articleData.author}
                    style="text-secondary-500 py-1 "
                  />
                  <p className="text-sm text-secondary-700">
                  {articleData.description.length > 255 ? `${articleData.description.substring(0,255)}...` : articleData.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h7 className="text-xl font-semibold text-center w-full">
          {
              listArticles.length > 12 && <Paginate itemsPerPage={itemsPerPage} handlerPage={handlerPageClick} items={listArticles}/>
          }
          </h7>
        </div>
        <AsideRecentPopular
          articleRecent={listRecent}
          listPopular={listPopular}
          hastagPage
        />
      </div>
    </section>
  );
};

export default Hastag;

export async function getStaticProps({params}) {
  const baseUrl = process.env.ROOT_URL
  const hastagID = parseInt(params.hastag[0])
  let listArticles = [] // asina ny liste ny articles par hastag
  let hastagData = [] // asina ny momban'ilay hastag
  let listRecentArticlesFr = [] // asina ny liste ny recent article (6 farany)
  let listRecentArticlesEn = [] // asina ny liste ny recent article (6 farany)
  let listMostPopularEn = [] // asina ny liste-n'izay be mpijery, izany oe manana rating ambony (6 farany)
  let listMostPopularFr = [] // asina ny liste-n'izay be mpijery, izany oe manana rating ambony (6 farany)

   /* -------------------------------------------------------------------------- */
    /*                  ALAINA NY LISTE NY ARTICLE IZAY MANANA #                  */
    /* -------------------------------------------------------------------------- */


    const paramHas = {query: 'getArticlesByHasTag', param: [hastagID]} // query: ilay anaran'ilay méthode ao @ MyDatabase
    await fetch(`${baseUrl}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramHas),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => listArticles = data)
  
  
      /* -------------------------------------------------------------------------- */
    /*                       ALAINA NY HASTAG DATA                                */
    /* -------------------------------------------------------------------------- */


    const paramHastag = {query: 'getHastagByID', param: [hastagID]} // query: ilay anaran'ilay méthode ao @ MyDatabase
    await fetch(`${baseUrl}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramHastag),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => hastagData = data)

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
    /*                   ALAINA NY LISTE NY IZAY BE MPANOME AVIS                  */
    /* -------------------------------------------------------------------------- */

    /* ----------------------------------- FR ----------------------------------- */

    const paramMostPopularFr = {query: 'getMostPopular', param: ['fr']} // query: ilay anaran'ilay méthode ao @ MyDatabase
    await fetch(`${baseUrl}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramMostPopularFr),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => listMostPopularFr = data)


    /* ----------------------------------- EN ----------------------------------- */

    const paramMostPopularEn = {query: 'getMostPopular', param: ['en']} // query: ilay anaran'ilay méthode ao @ MyDatabase
    await fetch(`${baseUrl}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramMostPopularEn),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => listMostPopularEn = data)


  return {
    props: {
      listArticles: listArticles.result,
      hastagData: hastagData.result[0],
      listRecentArticlesEn: dataFilter(listRecentArticlesEn.result, "category_id", 3),
      listRecentArticlesFr: dataFilter(listRecentArticlesFr.result, "category_id", 3),
      listMostPopularEn: dataFilter(listMostPopularEn.result, "category_id", 4),
      listMostPopularFr: dataFilter(listMostPopularFr.result, "category_id", 4)
    },
  };
}


export async function getStaticPaths(){
  const baseUrl = process.env.ROOT_URL
  
  const linkBeautify = (link) => {
    const newLink = link.replace(/[;:',\s]/g, "-");
      return newLink.toLowerCase()
  };

  let hastag = []

  const param = {query: 'getAllHastag', param: false} // query: ilay anaran'ilay méthode ao @ MyDatabase
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(param),
    headers: {
      "Content-type" : "application/json"
    }
  }).then((res) => res.json())
    .then(data => hastag = data)

  const paths = hastag.result.map((item) => ({
    params: { hastag: [`${item.id}` ,linkBeautify(item.name)]}
  }))

  return {
    paths,
    fallback: false,
  }

}