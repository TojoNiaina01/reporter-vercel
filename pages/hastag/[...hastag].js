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
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useRouter } from "next/router";
import { dataFilter } from "@/config/dataFilter";
import localStorage from "localStorage";
import Paginate from "@/components/Paginate";
import MyDatabase from "@/config/MyDatabase";




const linkBeautify = (link) => {
  const newLink = link.replace(/[?'%;:,\s\u2019]/g, "-");
  return newLink.toLowerCase()
};

const checkLink = (data, id, name) => {
  const checkID = data.filter(hastag => hastag.id === id)
  const checkTitle = data.filter(hastag => linkBeautify(hastag.name) === name.toLowerCase())
  const logic = (checkID.length && checkTitle.length) ? true : false

  return logic
}

const Hastag = ({
  listMostPopularEn,
  listMostPopularFr,
  listRecentArticlesEn,
  listRecentArticlesFr,
  listArticles,
  hastagData,
  adsHorizontale,
  adsVertical
}) => {
  const router = useRouter();
  const [order, setOrder] = useState(false);
  const [listRecent, setListRecent] = useState(listRecentArticlesEn);
  const [listPopular, setListPopular] = useState(listMostPopularEn);
  const storage = JSON.parse(localStorage.getItem("token"));
  const rating = JSON.parse(localStorage.getItem("token")).rating;

  const linkBeautify = (link) => {
    const newLink = link.replace(/[?'%;:,\s\u2019]/g, "-");
    return newLink.toLowerCase()
  };  

  /* ------------------------------- pagination ------------------------------- */
  const [itemOffset, setItemOffset] = useState(null);
  const [currentArticles, setCurrentArticles] = useState();
  const itemsPerPage = 12;
  const handlerPageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % listArticles.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentArticles(listArticles.slice(itemOffset, endOffset));
    if (storage.lang === "fr") {
      setListRecent(listRecentArticlesFr);
      setListPopular(listMostPopularFr);
    }
  }, [itemOffset, itemsPerPage, listArticles]);

  const redirectHandler = (id, title) => {
    router.push(`/article/${id}/${linkBeautify(title)}`);
  };
  return (
    <section className="mx-2 mt-10">
      {/* TOP */}
      <div className="flex items-center justify-between gap-1 lg:items-start">
        <div>
          <HeaderCategory title={`#${hastagData.name}`} style />
          <p className="text-xs font-thin tracking-wide lg:text-sm">
            Hashtag - page
          </p>
        </div>
        <div className="absolute right-5 z-10 md:static">
          <form className="relative mx-auto w-max rounded-full bg-secondary-100">
            <input
              type="index"
              className="peer relative z-10 h-12 w-12 cursor-pointer rounded-full border bg-transparent pl-12
              outline-none focus:w-full focus:cursor-text focus:border-secondary-400 focus:pl-16 focus:pr-4"
            />
            <MagnifyingGlassIcon className="absolute inset-y-0 my-auto h-8 w-12 border-r  border-transparent stroke-secondary-500 px-3.5 peer-focus:border-secondary-400 peer-focus:stroke-secondary-500" />
          </form>
        </div>
      </div>

      <div className="mt-4 justify-between gap-8 lg:flex">
        <div className="w-full">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {currentArticles?.map((articleData) => (
              <div
                key={uuidv4()}
                className="group mb-2 flex cursor-pointer flex-col  overflow-hidden rounded bg-[#EFF2FB] lg:flex-row"
              >
                <Image
                  src={`/uploads/images/${articleData.image[0].image_name}.${articleData.image[0].image_extension}`}
                  className="md:w-full/2 md:h-full/2 h-[150px] object-cover lg:h-full lg:w-[250px]"
                  alt="Article image blog"
                  width={1200}
                  height={575}
                />
                <div
                  className="mx-2 lg:pt-5"
                  onClick={() =>
                    redirectHandler(articleData.id, articleData.title)
                  }
                >
                  <Title style="text-base tracking-wide lg:text-xl">
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

          <h7 className="w-full text-center text-xl font-semibold">
            {listArticles.length > 12 && (
              <Paginate
                itemsPerPage={itemsPerPage}
                handlerPage={handlerPageClick}
                items={listArticles}
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

export default Hastag;


export async function getServerSideProps(context) {
  const linkTab = context.query.hastag
  const hastagID = parseInt(linkTab[0])
  const name = linkTab[1]
  const db = new MyDatabase()

      
    let listFullHastag = [] // alaina lony ny list article mba i-checkena anle lien miditra



    /* -------------------------------------------------------------------------- */
    /*        ALAINA NY LISTE NY HASTAG REHETRA MBA I-CHECKENA LIEN MIDITRA       */
    /* -------------------------------------------------------------------------- */

    await db.getAllHastag().then(data => listFullHastag = data)
    if(!isNaN(hastagID) && name && linkTab.length === 2){ // vérifiena alo oe type nombre ve
      if(checkLink(listFullHastag, hastagID, name.toLowerCase())){


          /* ------------------- ********************************** ------------------- */
        /* -------------------------------------------------------------------------- */
        /*                  ALAINA AMZAY NY DATA IZAY ILAINA REHETRA                  */
        /* -------------------------------------------------------------------------- */
        /* -------------- ********************************************* ------------- */

        let listArticles = []; // asina ny liste ny articles par hastag
        let hastagData = []; // asina ny momban'ilay hastag
        let listRecentArticlesFr = []; // asina ny liste ny recent article (6 farany)
        let listRecentArticlesEn = []; // asina ny liste ny recent article (6 farany)
        let listMostPopularEn = []; // asina ny liste-n'izay be mpijery, izany oe manana rating ambony (6 farany)
        let listMostPopularFr = []; // asina ny liste-n'izay be mpijery, izany oe manana rating ambony (6 farany)
        let adsHorizontale = []
        let adsVertical = []
      
        /* -------------------------------------------------------------------------- */
        /*                  ALAINA NY LISTE NY ARTICLE IZAY MANANA #                  */
        /* -------------------------------------------------------------------------- */
      
        await db.getArticlesByHasTag(hastagID).then(data => listArticles = data)
      
        /* -------------------------------------------------------------------------- */
        /*                       ALAINA NY HASTAG DATA                                */
        /* -------------------------------------------------------------------------- */
      
        await db.getHastagByID(hastagID).then(data => hastagData = data)
      
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
            listArticles: listArticles,
            hastagData: hastagData[0],
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
