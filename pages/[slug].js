import React, { useState } from "react";
import Title from "@/components/Title";
import { v4 as uuidv4 } from "uuid";
import HeaderCategory from "@/components/HeaderCategory";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import DateAuteur from "@/components/DateAuteur";
import { Publicite } from "@/public/assets/img";
import Hastag from "@/components/Hastag";
import MainPopular from "@/components/Popular/MainPopular";
import { SocialIcon } from "react-social-icons";

const TagDeux = [
  "election",
  "office",
  "university",
  "study",
  "communication",
  "president",
  "business",
  "tax",
  "money",
  "bank",
  "maison blanche",
];

const ArticlePrincipale = ({
  name,
  article,
  articleRecent,
  articlePopular,
}) => {
  const { tag, articles } = article[0];
  const linkBeautify = (link) => {
    return link.replace(/\s+/g, "-");
  };
  return (
    <section className="pt-10 mx-2">
      {/* Header sy Search */}
      <div className="flex justify-between items-center gap-1">
        <HeaderCategory title={name} style />
        <div>
          <form
            action=""
            className="relative mx-auto w-max bg-secondary-100 rounded-full"
          >
            <input
              type="search"
              className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12
              outline-none focus:w-full focus:cursor-text focus:border-secondary-400 focus:pl-16 focus:pr-4"
            />
            <MagnifyingGlassIcon className="absolute inset-y-0 my-auto h-8 w-12 border-r  border-transparent stroke-secondary-500 px-3.5 peer-focus:border-secondary-400 peer-focus:stroke-secondary-500" />
          </form>
        </div>
      </div>
      {/* Tag top page */}
      <ul className="flex gap-4 overflow-scroll scrollbar-hide pt-4 lg:justify-between">
        {tag.map((tag) => (
          <li
            key={uuidv4()}
            className="tagBg px-2 py-1 border-[1px] border-gray-300 rounded font-bold uppercase text-xs cursor-pointer"
          >
            <Link href={`/${name}&${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
      {/*Main article + aside */}
      <div className="lg:flex gap-8 justify-between">
        {/*Main ariticles*/}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 lg:grid-cols-1">
            {articles?.map(({ img, date, auteur, titre, minidescription }) => (
              <article key={uuidv4()} className="mt-10 cursor-pointer group">
                <figure className="relative w-full h-[250px] lg:h-[450px]">
                  <Image
                    src={img}
                    fill
                    className="object-cover rounded"
                    alt="Article Image blog"
                  />
                </figure>
                <div className="mx-1">
                  <DateAuteur date={date} auteur={auteur} />
                  <Title style="text-xl tracking-wide leading-6 group-hover:underline lg:text-2xl lg:leading-5">
                    {titre}
                  </Title>
                  <p className="text-sm py-3 lg:py-2">{minidescription}</p>
                  <Link href={`/${name}/${linkBeautify(titre)}`}>
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
        <aside className="mt-8 lg:flex lg:flex-col lg:basis-1/5">
          <HeaderCategory title="Recent Articles" />
          <div className="space-y-7 lg:space-y-8">
            {articleRecent?.map(
              ({ img, date, auteur, titre, description, category }) => (
                <div
                  key={uuidv4()}
                  className="group flex items-center gap-2 cursor-pointer md:gap-5 lg:flex-col lg:gap-0 lg:order-1"
                >
                  <div className="relative w-[50%] h-[200px] md:w-[40%] lg:w-full lg:h-[150px]">
                    <Hastag style="absolute top-2 z-10  left-4">
                      {category}
                    </Hastag>
                    <Image
                      src={img}
                      fill
                      className="object-cover"
                      alt="Image article blog"
                    />
                  </div>
                  <div className="w-[55%] lg:w-full">
                    <Title>{titre}</Title>
                    <p className="text-xs pt-1 pb-2  text-gray-500 md:p md:text-sm lg:hidden">
                      {description}
                    </p>
                    <DateAuteur date={date} auteur={auteur} />
                  </div>
                </div>
              )
            )}
          </div>
          <div className="hidden lg:block mt-10 lg:order-2">
            <HeaderCategory title="Tag" />
            <ul className="flex flex-wrap gap-4 pt-4">
              {TagDeux?.map((tag) => (
                <li
                  key={uuidv4()}
                  className="tagBg text-center w-fit px-2 border-[1px] border-gray-300 rounded font-bold uppercase cursor-pointer"
                >
                  <Link
                    href={`/${name}&${tag}`}
                    className="whitespace-nowrap text-[10px] leading-[12px]"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative w-full h-[437px] mt-5 md:h-[752px] lg:h-[300px] lg:order-3">
            <Hastag style="absolute top-2 z-10  right-4">ads</Hastag>
            <Image
              src={Publicite}
              fill
              className="object-cover"
              alt="Publicite"
            />
          </div>
          {/*Follow us*/}
          <div className="mt-10 hidden lg:block">
            <HeaderCategory title="Follow Us" />
            <ul className="flex gap-3 mt-4">
              <li>
                <SocialIcon
                  url="https://facebook.com"
                  style={{ height: 40, width: 40 }}
                  className="hover:scale-105"
                  bgColor="#EFF2FB"
                  fgColor="gray"
                  target="_blank"
                />
              </li>
              <li>
                <SocialIcon
                  url="https://twitter.com"
                  style={{ height: 40, width: 40 }}
                  className="hover:scale-105"
                  bgColor="#EFF2FB"
                  fgColor="gray"
                  target="_blank"
                />
              </li>
              <li>
                <SocialIcon
                  url="https://youtube.com"
                  style={{ height: 40, width: 40 }}
                  className="hover:scale-105"
                  bgColor="#EFF2FB"
                  fgColor="gray"
                  target="_blank"
                />
              </li>
              <li>
                <SocialIcon
                  url="https://instagram.com"
                  style={{ height: 40, width: 40 }}
                  className="hover:scale-105"
                  bgColor="#EFF2FB"
                  fgColor="gray"
                  target="_blank"
                />
              </li>
              <li>
                <SocialIcon
                  url="https://linkedin.com"
                  style={{ height: 40, width: 40 }}
                  className="hover:scale-105"
                  bgColor="#EFF2FB"
                  fgColor="gray"
                  target="_blank"
                />
              </li>
            </ul>
          </div>

          <div className="mt-10 lg:order-4">
            <HeaderCategory title="Popular" />
            <div className="md:flex  gap-2 lg:pt-2 lg:flex-col">
              {articlePopular?.map(({ img, titre, date, auteur }) => (
                <MainPopular
                  key={uuidv4()}
                  img={img}
                  auteur={auteur}
                  date={date}
                  titre={titre}
                />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ArticlePrincipale;

export async function getStaticProps({ params }) {
  const { slug } = params;
  const data = await import(`/data/articles.json`);
  const dataRecent = await import(`/data/thumbnail.json`);

  const enCour = data.pages.find((list) => list.name === slug);
  const articleRecent = dataRecent.ArticleRecentMain;
  const articlePopular = dataRecent.ArticlePopular;
  return {
    props: {
      name: enCour.name,
      article: enCour.data,
      articleRecent,
      articlePopular,
    },
  };
}

export async function getStaticPaths() {
  const data = await import(`/data/articles.json`);
  const paths = data.pages.map((item) => ({
    params: { slug: item.name },
  }));
  return {
    paths,
    fallback: false,
  };
}
