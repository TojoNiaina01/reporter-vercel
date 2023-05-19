import React, { useRef, useState } from "react";
import AsideRecentPopular from "@/components/pageIndiv/AsideRecentPopular";
import HeaderCategory from "@/components/HeaderCategory";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import {
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import DateAuteur from "@/components/DateAuteur";
import { Jost } from "next/font/google";
import { NotFoundBg, Profil, PubliciteDeux } from "@/public/assets/img";
import { Vector } from "@/public/assets/svg";
import Title from "@/components/Title";
import Hastag from "@/components/Hastag";
import ReviewWithStars from "@/components/ReviewWithStars";

const jost = Jost({ subsets: ["latin"], weight: "600" });

const Articless = ({ enCourData, articleRecent, articlePopular }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlayed, setIsPlayed] = useState(true);
  const videoRef = useRef();
  const play = () => {
    setIsPlayed((value) => !value);
    videoRef.current.play();
  };
  const pause = () => {
    setIsPlayed((value) => !value);
    videoRef.current.pause();
  };
  return (
    <>
      <Head>
        <title>{enCourData.titre}</title>
      </Head>
      <section className="mt-10 mx-2">
        <div className="flex justify-between items-center gap-1 lg:items-start">
          <div>
            <HeaderCategory title="article" style />
            <p className="text-xs lg:text-sm font-semibold tracking-wide">
              {enCourData.titre}
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
              <div className="relative w-full h-[250px] lg:h-[450px] lg:rounded">
                <Image
                  src={enCourData.img}
                  className="object-cover"
                  fill
                  alt="Image article blog"
                />
              </div>
              <div className="relative group ">
                <video
                  src={enCourData.video}
                  type="video/mp4"
                  play
                  muted={isMuted}
                  loop
                  ref={videoRef}
                />
                <div className="absolute right-5 bottom-5 text-main-500">
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
                <div className="absolute  text-main-500 transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
              <div className="relative w-full h-[250px] lg:h-[450px] lg:rounded">
                <Image
                  src={enCourData.img}
                  className="object-cover"
                  fill
                  alt="Image article blog"
                />
              </div>
            </div>
            <DateAuteur date={enCourData.date} auteur={enCourData.auteur} />
            <hr className="my-2" />
            <Title style="text-xl tracking-wide my-2 leading-6 lg:text-2xl lg:leading-5">
              {enCourData.titre}
            </Title>

            <p className="text-sm tracking-wide text-gray-600">
              {enCourData.description}
            </p>

            <div className="relative w-full h-fit py-5 mt-10 px-10">
              <Image
                src={Vector}
                className="absolute -top-5 w-[70px] h-[70px] lg:left-5"
                alt="graphics decoration"
              />
              <Image src={NotFoundBg} fill alt="graphics decoration" />
              <q className="text-[11px] tracking-wide uppercase font-semibold ">
                As a participatory media culture, social media platforms or
                social networking sites are forms of mass communication that,
                through media technologies, allow large amounts of product and
                distribution of content to reach the largest audience possible.
              </q>
              <span className="border-b-2 border-black block my-4" />
              <p className={`${jost.className}`}>Ralph Edwardes</p>
            </div>

            <div className="mt-10">
              <Title style="text-xl lg:text-2xl">
                Pariatur cupidatat Lorem irure nisi Velit qui
              </Title>
              <p className="text-sm tracking-wide text-gray-600 my-2">
                Pariatur cupidatat Lorem irure nisi. Velit qui irure consectetur
                do cupi roident id est ex sunt nostrud nisi mine consectetur do
                cupi roident id est ex sunt nostrud nisi minim ut. Cupidatat
                velit dolore consectetur deserunt laboris magna eiusmod aliquip
                consectetur commodo in eiusmod aliqua cupidatat. Nostrud laboris
                et eu mollit qui esse dolore exercitation in dolore sint nisi eu
                aliqua.
              </p>
              <ul className="list-decimal mx-4 text-sm text-gray-600">
                <li className="my-4 tracking-wide">
                  As a participatory media culture, social media platforms or
                  social networking sites are forms of mass communication that,
                  through media technologies.
                </li>
                <li className="my-4 tracking-wide">
                  Allow large amounts of product and distribution of content to
                  reach the largest audience possible.
                </li>
                <li className="my-4 tracking-wide">
                  However, there are downsides to virtual promotions as servers,
                  systems, and websites may crash, fail, or become overloaded
                  with information. You also can stand risk of losing uploaded
                  information and storage and at a use can also be effected by a
                  number of outside variables.
                </li>
              </ul>
            </div>

            <hr className="mt-10" />

            <div className="mt-5 flex items-center gap-4">
              <HeaderCategory title="Tags :" />
              <ul className="flex gap-4 ">
                <li className="tagBg px-2 py-1 border-[1px] border-gray-300 rounded font-bold uppercase text-xs cursor-pointer">
                  election
                </li>
                <li className="tagBg px-2 py-1 border-[1px] border-gray-300 rounded font-bold uppercase text-xs cursor-pointer">
                  maison blanche
                </li>
                <li className="tagBg px-2 py-1 border-[1px] border-gray-300 rounded font-bold uppercase text-xs cursor-pointer">
                  office
                </li>
              </ul>
            </div>
            <div className="bg-main-400 flex gap-6 items-center my-6 rounded">
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
            </div>
            <div className=" h-24">
              <ReviewWithStars />
            </div>
          </div>
          {/*Aside*/}
          <AsideRecentPopular
            articleRecent={articleRecent}
            articlePopular={articlePopular}
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
  const linkBeautify = (link) => {
    return link.split(" ").join("-");
  };
  const { articless } = params;
  const data = await import(`/data/articles.json`);
  const dataAside = await import(`/data/thumbnail.json`);
  const articleRecent = dataAside.ArticleRecentMain;
  const articlePopular = dataAside.ArticlePopular;

  const enCourData = data.pages
    .find((obj) => obj.name === "culture")
    .data.find((obj) => linkBeautify(obj.titre) === articless[0]);

  return {
    props: {
      enCourData,
      articleRecent,
      articlePopular,
    },
  };
}

export async function getStaticPaths(context) {
  const linkBeautify = (link) => {
    return link.split(" ").join("-");
  };
  const data = await import(`/data/articles.json`);
  const paths = data.pages
    .find((obj) => obj.name === "culture")
    .data.map((item) => ({
      params: { articless: [linkBeautify(item.titre)] },
    }));

  return {
    paths,
    fallback: false,
  };
}
