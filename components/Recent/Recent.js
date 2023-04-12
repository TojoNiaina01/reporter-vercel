import React, { useContext, useRef, useState } from "react";
import HeaderCategory from "@/components/HeaderCategory";
import MainArticle from "@/components/Recent/MainArticle";
import { ArticlesContext } from "@/pages";
import SecondaryArticle from "@/components/Recent/SecondaryArticle";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"], weight: "600" });
const Recent = () => {
  const { ArticleRecentMain, ArticleRecentSecondary } =
    useContext(ArticlesContext);

  return (
    <section className="mt-10">
      <HeaderCategory title="Recent News" banner />
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-10 lg:pt-2">
        {/* Left Panel */}
        <div className="space-y-7 lg:space-y-8">
          {ArticleRecentMain?.map(
            ({ img, category, titre, description, auteur, date, id }) => (
              <MainArticle
                img={img}
                category={category}
                titre={titre}
                description={description}
                auteur={auteur}
                date={date}
              />
            )
          )}
        </div>

        {/*  Right Panel*/}
        <div className=" flex overflow-x-scroll gap-4 pt-5 scrollbar-hide lg:flex-col lg:pt-0 lg:gap-6">
          {ArticleRecentSecondary?.map(({ img, date, auteur, titre, id }) => (
            <SecondaryArticle
              id={id}
              img={img}
              date={date}
              auteur={auteur}
              titre={titre}
            />
          ))}

          <button
            className={`hidden lg:block uppercase text-white bg-secondary-500 rounded-full py-2 shadow-md active:scale-95 text-xs  tracking-wide ${jost.className}`}
          >
            view all
          </button>
        </div>
      </div>
    </section>
  );
};

export default Recent;
