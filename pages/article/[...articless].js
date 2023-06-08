import React, { useRef, useState, useEffect } from "react";
import AsideRecentPopular from "@/components/pageIndiv/AsideRecentPopular";
import HeaderCategory from "@/components/HeaderCategory";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
import parse from "html-react-parser"
import { dataFilter } from "@/config/dataFilter";
import localStorage from "localStorage";
import { ROOT_URL } from "@/env";
import {v4 as uuidv4} from "uuid";
import { useRouter } from "next/router";

const jost = Jost({ subsets: ["latin"] });


const Articless = ({ articleData, listRecentArticlesEn, listRecentArticlesFr, listMostPopularEn, listMostPopularFr, listHastag }) => {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(true);
  const [isPlayed, setIsPlayed] = useState(true);
  const [listRecent, setListRecent] = useState(listRecentArticlesEn)
  const [listPopular, setListPopular] = useState(listMostPopularEn)
  const [rateArticle, setRateArticle] = useState(0)
  const [body, setBody] = useState("")
  const videoRef = useRef();
  const storage = JSON.parse(localStorage.getItem('token'))
  const rating = JSON.parse(localStorage.getItem('token')).rating

  const linkBeautify = (link) => {
    const newLink = link.replace(/[;:',\s]/g, "-");
    return newLink.toLowerCase()
  };  


  console.log("list recent article en anglais ",listRecentArticlesEn)
  useEffect(() => {
    setBody(parse(articleData.body)) // tsy maintsy parse-na ilay body satria HTML type string
    const param = {query: 'incrementViews', param: [articleData.id]}
    fetch(`${ROOT_URL}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())

    if(storage.lang === 'fr'){
      setListRecent(listRecentArticlesFr)
      setListPopular(listMostPopularFr)
    }

    if(rating.find(item => item.id === articleData.id)){
      setRateArticle(rating[rating.findIndex(item => item.id === articleData.id)].rate)
    }


  },[])

  const play = () => {
    setIsPlayed((value) => !value);
    videoRef.current.play();
  };
  const pause = () => {
    setIsPlayed((value) => !value);
    videoRef.current.pause();
  };

  const redirectHandler = (id, title) => {
    router.push(`/hastag/${id}/${linkBeautify(title)}`)
  }


  return (
    <>
      <Head>
        <title>{articleData.title}</title>
      </Head>
      <section className="mt-10 mx-2">
        <div className="flex justify-between items-center gap-1 lg:items-start">
          <div>
            <HeaderCategory title="article" style />
            <p className="text-xs lg:text-sm font-semibold tracking-wide">
              {articleData.title}
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
          {/*Main ariticles*/}
          <div>
            <div className="space-y-4">
            {articleData.image?.map((image) => (
                  <div key={uuidv4()} className="relative w-full h-[250px] lg:h-[450px] lg:rounded">
                  <Image
                    src={`/uploads/images/${image.image_name}.${image.image_extension}`}
                    className="object-cover"
                    fill
                    alt="Image article blog"
                  />
                </div>
                  ))}
             
              {
              //   <div className="relative group ">
              //   <video
              //     src={enCourData.video}
              //     type="video/mp4"
              //     play
              //     muted={isMuted}
              //     loop
              //     ref={videoRef}
              //   />
              //   <div className="absolute right-5 bottom-5 text-main-500">
              //     {isMuted ? (
              //       <SpeakerXMarkIcon
              //         className="h-5 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
              //         onClick={() => setIsMuted((value) => !value)}
              //       />
              //     ) : (
              //       <SpeakerWaveIcon
              //         className="h-5 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
              //         onClick={() => setIsMuted((value) => !value)}
              //       />
              //     )}
              //   </div>
              //   <div className="absolute  text-main-500 transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              //     {isPlayed ? (
              //       <PlayCircleIcon
              //         className="h-14 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
              //         onClick={play}
              //       />
              //     ) : (
              //       <PauseCircleIcon
              //         className="h-14 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
              //         onClick={pause}
              //       />
              //     )}
              //   </div>
              // </div>
              }

            </div>
            <DateAuteur date={moment(articleData.created_at).format('MMMM Do YYYY')} auteur={articleData.author} />
            <hr className="my-2" />
            <Title style="text-xl tracking-wide my-2 leading-6 lg:text-2xl lg:leading-5">
              {articleData.title}
            </Title>

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
           
            <div className={`${jost.className} mt-10`}>
              {body}
            </div>

            <hr className="mt-10" />

            <div className="mt-5 flex items-center gap-4">
              <HeaderCategory title="Tags :" />
              <ul className="flex gap-4 ">


                {
                  listHastag?.map((hastag) => (
                    <li 
                    key={uuidv4()} 
                    className="tagBg px-2 py-1 border-[1px] border-gray-300 rounded font-bold uppercase text-xs cursor-pointer"
                    onClick={() => redirectHandler(hastag.id, hastag.name)}
                    >
                      {hastag.name}
                    </li>
                  ))
                }
               
                
              </ul>
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
              <ReviewWithStars rate={rateArticle} articleID={articleData.id}/>
            </div>
          </div>
          {/*Aside*/}
          <AsideRecentPopular
            articleRecent={listRecent}
            listPopular={listPopular}
          />
        </div>
      </section>
      <div className="hidden lg:block relative w-full h-[250px]">
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

export default Articless;

export async function getStaticProps({ params }) {
  const baseUrl = process.env.ROOT_URL
  const articleID = parseInt(params.articless[0])
  let articleData = []
  let listRecentArticlesFr = [] // asina ny liste ny recent article (6 farany)
  let listRecentArticlesEn = [] // asina ny liste ny recent article (6 farany)
  let listMostPopularEn = [] // asina ny liste-n'izay be mpijery, izany oe manana rating ambony (6 farany)
  let listMostPopularFr = [] // asina ny liste-n'izay be mpijery, izany oe manana rating ambony (6 farany)
  let listHastag = []

    /* -------------------------------------------------------------------------- */
    /*                    ALAINA NY LISTE NY ARTICLE REHETRA                     */
    /* -------------------------------------------------------------------------- */

    /* ----------------------------------- FR ----------------------------------- */

    const paramArticle = {query: 'getArticle', param: [articleID]} // query: ilay anaran'ilay méthode ao @ MyDatabase
    await fetch(`${baseUrl}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramArticle),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => articleData = data)
    
    
      /* -------------------------------------------------------------------------- */
    /*                    ALAINA NY LISTE NY ARTICLE REHETRA                     */
    /* -------------------------------------------------------------------------- */

    /* ----------------------------------- FR ----------------------------------- */

    const paramHastag = {query: 'getHastagByArticle', param: [articleID]} // query: ilay anaran'ilay méthode ao @ MyDatabase
    await fetch(`${baseUrl}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramHastag),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => listHastag = data)

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
      articleData: articleData.result[0],
      listRecentArticlesEn: dataFilter(listRecentArticlesEn.result, "category_id", 3),
      listRecentArticlesFr: dataFilter(listRecentArticlesFr.result, "category_id", 3),
      listMostPopularEn: dataFilter(listMostPopularEn.result, "category_id", 4),
      listMostPopularFr: dataFilter(listMostPopularFr.result, "category_id", 4),
      listHastag: listHastag.result
    },
  };
}

export async function getStaticPaths() {
  const linkBeautify = (link) => {
    const newLink = link.replace(/[;:',\s]/g, "-");
    return newLink.toLowerCase()
  };
  const baseUrl = process.env.ROOT_URL
  let listArticle = []

   /* -------------------------------------------------------------------------- */
    /*                    ALAINA NY LISTE NY ARTICLE REHETRA                     */
    /* -------------------------------------------------------------------------- */

    /* ----------------------------------- FR ----------------------------------- */

    const paramArticle = {query: 'getFullArticles', param: false} // query: ilay anaran'ilay méthode ao @ MyDatabase
    await fetch(`${baseUrl}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramArticle),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => listArticle = data)

     const paths = listArticle.result.map((article) => ({
        params: {articless: [`${article.id}`, linkBeautify(article.title)]}
      }))

      console.log("paths == ", paths[0].params.articless)

  return {
    paths,
    fallback: false,
  };
}
