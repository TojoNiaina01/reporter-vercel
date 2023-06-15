import React, { useRef, useState, useEffect } from "react";
import AsideRecentPopular from "@/components/pageIndiv/AsideRecentPopular";
import HeaderCategory from "@/components/HeaderCategory";
import Head from "next/head";
import Image from "next/image";
import DateAuteur from "@/components/DateAuteur";
import { Jost } from "next/font/google";
import { NotFoundBg, Profil, PubliciteDeux } from "@/public/assets/img";
//import { Vector } from "@/public/assets/svg";
import Title from "@/components/Title";
import Hastag from "@/components/Hastag";
import ReviewWithStars from "@/components/ReviewWithStars";
import moment from "moment";
import parse from "html-react-parser";
import { dataFilter } from "@/config/dataFilter";
import localStorage from "localStorage";
import { ROOT_URL } from "@/env";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import {
  MagnifyingGlassIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import MyDatabase from "@/config/MyDatabase";

const linkBeautify = (link) => {
  const newLink = link.replace(/[?%';:,\s\u2019]/g, "-");
  return newLink.toLowerCase();
};

const checkLink = (data, id, title) => {
  const checkID = data.filter((article) => article.id === id);
  const checkTitle = data.filter(
    (article) => linkBeautify(article.title) === title
  );
  const logic = checkID.length && checkTitle.length ? true : false;

  return logic;
};

const jost = Jost({ subsets: ["latin"] });

const Articless = ({
  articleData,
  listRecentArticlesEn,
  listRecentArticlesFr,
  listMostPopularEn,
  listMostPopularFr,
  listHastag,
  adsHorizontale,
  adsVertical,
}) => {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(true);
  const [isPlayed, setIsPlayed] = useState(true);
  const [listRecent, setListRecent] = useState(listRecentArticlesEn);
  const [listPopular, setListPopular] = useState(listMostPopularEn);
  const [rateArticle, setRateArticle] = useState(0);
  const [body, setBody] = useState("");
  const videoRef = useRef();
  const storage = JSON.parse(localStorage.getItem("token"));
  const rating = JSON.parse(localStorage.getItem("token")).rating;

  const linkBeautify = (link) => {
    const newLink = link.replace(/[?'%;:,\s\u2019]/g, "-");
    return newLink.toLowerCase();
  };

  console.log("list hastag == ", listHastag);

  useEffect(() => {
    setBody(parse(articleData.body)); // tsy maintsy parse-na ilay body satria HTML type string
    const param = { query: "incrementViews", param: [articleData.id] };
    fetch(`${ROOT_URL}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => res.json());

    if (storage.lang === "fr") {
      setListRecent(listRecentArticlesFr);
      setListPopular(listMostPopularFr);
    }

    if (rating.find((item) => item.id === articleData.id)) {
      setRateArticle(
        rating[rating.findIndex((item) => item.id === articleData.id)].rate
      );
    }
  }, []);

  const play = () => {
    setIsPlayed((value) => !value);
    videoRef.current.play();
  };
  const pause = () => {
    setIsPlayed((value) => !value);
    videoRef.current.pause();
  };

  const redirectHandler = (id, title) => {
    router.push(`/hastag/${id}/${linkBeautify(title)}`);
  };

  return (
    <>
      <Head>
        <title>{articleData.title}</title>
      </Head>
      <section className="mx-2 mt-10">
        <div className="flex items-center justify-between gap-1 lg:items-start">
          <div>
            <Title style="text-xl tracking-wide my-2 leading-6 lg:text-3xl lg:leading-5">
              {articleData.title}
            </Title>

            {/* Eto ilay sous titre misy slash imput vaovao */}
            <h4 className="text-base uppercase tracking-wide text-main-400">
              interview
            </h4>
          </div>
        </div>
        <div className="mt-4 justify-between gap-8 lg:flex">
          {/*Main ariticles*/}
          <div className="w-full">
            <div className="space-y-4">
              {articleData.image?.map((image) => (
                <div
                  key={uuidv4()}
                  className="relative h-[250px] w-full md:h-[350px] lg:h-[500px] lg:rounded"
                >
                  <Image
                    src={`${ROOT_URL}/images/${image.image_name}.${image.image_extension}`}
                    className="object-cover"
                    fill
                    alt="Image article blog"
                  />
                </div>
              ))}

              {articleData.video[0].video_name &&
                articleData.video?.map((video) => (
                  <div className="group relative ">
                    <video
                      src={`${ROOT_URL}/videos/${video.video_name}.${video.video_extension}`}
                      type="video/mp4"
                      play
                      muted={isMuted}
                      loop
                      ref={videoRef}
                    />
                    <div className="absolute bottom-5 right-5 text-main-500">
                      {isMuted ? (
                        <SpeakerXMarkIcon
                          className="h-5 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                          onClick={() => setIsMuted((value) => !value)}
                        />
                      ) : (
                        <SpeakerWaveIcon
                          className="h-5 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                          onClick={() => setIsMuted((value) => !value)}
                        />
                      )}
                    </div>
                    <div className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-main-500">
                      {isPlayed ? (
                        <PlayCircleIcon
                          className="h-14 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                          onClick={play}
                        />
                      ) : (
                        <PauseCircleIcon
                          className="h-14 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                          onClick={pause}
                        />
                      )}
                    </div>
                  </div>
                ))}

              {articleData.video[0].video_name &&
                articleData.video?.map((video) => (
                  <div className="group relative ">
                    <video
                      src={`/uploads/videos/${video.video_name}.${video.video_extension}`}
                      type="video/mp4"
                      play
                      muted={isMuted}
                      loop
                      ref={videoRef}
                    />
                    <div className="absolute bottom-5 right-5 text-main-500">
                      {isMuted ? (
                        <SpeakerXMarkIcon
                          className="h-5 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                          onClick={() => setIsMuted((value) => !value)}
                        />
                      ) : (
                        <SpeakerWaveIcon
                          className="h-5 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                          onClick={() => setIsMuted((value) => !value)}
                        />
                      )}
                    </div>
                    <div className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-main-500">
                      {isPlayed ? (
                        <PlayCircleIcon
                          className="h-14 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                          onClick={play}
                        />
                      ) : (
                        <PauseCircleIcon
                          className="h-14 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                          onClick={pause}
                        />
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <DateAuteur
              date={articleData.created_at}
              auteur={articleData.author}
            />
            <hr className="my-2" />

            {/*<Title style="text-xl tracking-wide my-2 leading-6 lg:text-2xl lg:leading-5">*/}
            {/*  {articleData.title}*/}
            {/*</Title>*/}

            <p className="text-sm tracking-wide text-gray-600">
              {articleData.description}
            </p>
            {
              //    <div className="relative w-full h-fit py-5 mt-10 px-10">
              //    <Image
              //      src={Vector}
              //      className="absolute -top-5 w-[70px] h-[70px] lg:left-5"
              //      alt="graphics decoration"
              //    />
              //    <Image src={NotFoundBg} fill alt="graphics decoration" />
              //    <q className="text-[11px] tracking-wide uppercase font-semibold ">
              //      As a participatory media culture, social media platforms or
              //      social networking sites are forms of mass communication that,
              //      through media technologies, allow large amounts of product and
              //      distribution of content to reach the largest audience possible.
              //    </q>
              //    <span className="border-b-2 border-black block my-4" />
              //    <p className={`${jost.className}`}>Ralph Edwardes</p>
              //  </div>
            }

            <div className={`${jost.className} mt-10`}>{body}</div>

            <hr className="mt-10" />

            <div className="mt-5 flex items-center gap-4">
              <HeaderCategory title="Tags :" />
              {listHastag[0].id && (
                <ul className="flex gap-4 ">
                  {listHastag?.map((hastag) => (
                    <li
                      key={uuidv4()}
                      className="tagBg cursor-pointer rounded border-[1px] border-gray-300 px-2 py-1 text-xs font-bold uppercase"
                      onClick={() => redirectHandler(hastag.id, hastag.name)}
                    >
                      {hastag.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* <div className="bg-main-400 flex gap-6 items-center my-6 rounded">
              <div className="relative w-[200px] h-[180px] rounded-r-full overflow-hidden">
                <Image
                  src={Profil}
                  fill
                  className="object-cover"
                  alt="Profil users"
                />
              </div>

              <div className="w-full mr-4 rounded ">
                <Title style="text-white text-lg">Judi Cael</Title>
                <p className="text-xs text-white my-2 tracking-wide leading-5 lg:text-sm lg:max-w-md">
                  Web developer since 2016. Create hundreds of websites, HTML
                  and CSS3 expert, who started to learn web design on a
                  world-class level.
                </p>
              </div>
            </div> */}
            <div className=" h-24">
              <ReviewWithStars rate={rateArticle} articleID={articleData.id} />
            </div>
          </div>
          {/*Aside*/}
          <AsideRecentPopular
            articleRecent={listRecent}
            listPopular={listPopular}
            adsVertical={adsVertical}
          />
        </div>
      </section>
      {adsHorizontale && (
        <div className="relative hidden h-[250px] w-full lg:block">
          <Hastag style="absolute top-5 z-10  right-14">ads </Hastag>
          <Image
            src={`${ROOT_URL}/images/${adsHorizontale[0].image_name}.${adsHorizontale[0].image_extension}`}
            fill
            className="object-cover"
            alt="publicite"
          />
        </div>
      )}
    </>
  );
};

export default Articless;

export async function getServerSideProps(context) {
  const linkTab = context.query.articless;
  const articleID = parseInt(linkTab[0]);
  const title = linkTab[1];
  const db = new MyDatabase();

  let listFullArticle = []; // alaina lony ny list article mba i-checkena anle lien miditra

  /* -------------------------------------------------------------------------- */
  /*                    ALAINA NY LISTE NY ARTICLE REHETRA                     */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- FR ----------------------------------- */

  await db.getFullArticles().then((data) => (listFullArticle = data));

  console.log("isNaN == ", isNaN(articleID));
  console.log("title == ", title);
  console.log("length == ", linkTab.length);

  if (!isNaN(articleID) && title && linkTab.length === 2) {
    // vérifiena alo oe type nombre ve
    if (checkLink(listFullArticle, articleID, title)) {
      /* ------------ ************************************************* ----------- */
      /* -------------------------------------------------------------------------- */
      /*                  ALAINA AMZAY NY DATA IZAY ILAINA REHETRA                  */
      /* -------------------------------------------------------------------------- */
      /* -------------- ********************************************* ------------- */

      let articleData = [];
      let listRecentArticlesFr = []; // asina ny liste ny recent article (6 farany)
      let listRecentArticlesEn = []; // asina ny liste ny recent article (6 farany)
      let listMostPopularEn = []; // asina ny liste-n'izay be mpijery, izany oe manana rating ambony (6 farany)
      let listMostPopularFr = []; // asina ny liste-n'izay be mpijery, izany oe manana rating ambony (6 farany)
      let listHastag = [];
      let adsHorizontale = [];
      let adsVertical = [];

      /* -------------------------------------------------------------------------- */
      /*                    ALAINA NY LISTE NY ARTICLE REHETRA                     */
      /* -------------------------------------------------------------------------- */

      /* ----------------------------------- FR ----------------------------------- */

      await db.getArticle(articleID).then((data) => (articleData = data));

      /* -------------------------------------------------------------------------- */
      /*                    ALAINA NY LISTE NY HASTAG REHETRA                     */
      /* -------------------------------------------------------------------------- */

      /* ----------------------------------- FR ----------------------------------- */

      await db
        .getHastagByArticle(articleID)
        .then((data) => (listHastag = data));

      /* -------------------------------------------------------------------------- */
      /*                      ALAINA NY LISTE NY RECENT ARTICLE                     */
      /* -------------------------------------------------------------------------- */

      /* ----------------------------------- FR ----------------------------------- */
      await db
        .getRecentArticle("fr")
        .then((data) => (listRecentArticlesFr = data));

      /* ----------------------------------- EN ----------------------------------- */
      await db
        .getRecentArticle("en")
        .then((data) => (listRecentArticlesEn = data));

      /* -------------------------------------------------------------------------- */
      /*                   ALAINA NY LISTE NY IZAY BE MPANOME AVIS                  */
      /* -------------------------------------------------------------------------- */

      /* ----------------------------------- FR ----------------------------------- */

      await db.getMostPopular("fr").then((data) => (listMostPopularFr = data));

      /* ----------------------------------- EN ----------------------------------- */

      await db.getMostPopular("en").then((data) => (listMostPopularEn = data));

      /* -------------------------------------------------------------------------- */
      /*                               ALAINA ADS                                   */
      /* -------------------------------------------------------------------------- */

      /* ----------------------------------- horizontale ----------------------------------- */

      await db
        .getAdsByDate("horizontale")
        .then((data) => (adsHorizontale = data));

      /* ----------------------------------- EN ----------------------------------- */

      await db.getAdsByDate("verticale").then((data) => (adsVertical = data));

      return {
        props: {
          articleData: articleData[0],
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
          listHastag: listHastag,
          adsHorizontale: adsHorizontale,
          adsVertical: adsVertical,
        },
      };
    }
  }

  return {
    redirect: {
      destination: "/404",
    },
  };
}
