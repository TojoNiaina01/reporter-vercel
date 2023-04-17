import React, { useState } from "react";
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

const ArticlePrincipale = ({ articles, articleRecent, articlePopular }) => {
  const { name, tag, data } = articles;
  const linkBeautify = (link) => {
    return link.replace(/\s+/g, "-");
  };
  return (
    <>
      <section className="mt-10 mx-2">
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
        {/* Tag top article */}
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
        {/*Main [...article] + aside */}
        <div className="lg:flex gap-8 justify-between mt-10">
          {/*Main ariticles*/}
          <div className="">
            <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-4 lg:grid-cols-1">
              {data?.map(({ img, date, auteur, titre, minidescription }) => (
                <article key={uuidv4()} className="cursor-pointer group">
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
                    <Link href={`/article/${linkBeautify(titre)}`}>
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
            articleRecent={articleRecent}
            articlePopular={articlePopular}
            name={name}
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
  const { slug } = params;
  const data = await import(`/data/articles.json`);
  const dataAside = await import(`/data/thumbnail.json`);

  const enCour = data.pages.find((list) => list.name === slug);
  const articleRecent = dataAside.ArticleRecentMain;
  const articlePopular = dataAside.ArticlePopular;
  return {
    props: {
      articles: enCour,
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
