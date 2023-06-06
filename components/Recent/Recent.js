import React, { useContext, useRef, useState } from "react";
import HeaderCategory from "@/components/HeaderCategory";
import MainArticle from "@/components/Recent/MainArticle";
import SecondaryArticle from "@/components/Recent/SecondaryArticle";
import { Jost } from "next/font/google";
import { ArticlesContext } from "@/pages";
import moment from "moment";

const jost = Jost({ subsets: ["latin"], weight: "600" });
const Recent = ({dataRecent}) => {
  const { ArticleRecentMain, ArticleRecentSecondary } =
    useContext(ArticlesContext);

  return (
    <section className="mt-10">
      <HeaderCategory title="Recent News" banner />
      <div className="flex flex-col gap-4 lg:flex-row lg:pt-2">
        {/* Left Panel */}
        <div className="space-y-7 lg:w-[80%] lg:space-y-8">
          {dataRecent.slice(0,3)?.map(
            (article) => (
              <MainArticle articleData={article}/>
            )
          )}
        </div>

        {/*  Right Panel*/}
        <div className=" flex overflow-x-scroll gap-4 pt-5 scrollbar-hide lg:flex-col lg:pt-0 lg:gap-6">
          {dataRecent.slice(3,6)?.map((article) => (
            <SecondaryArticle articleData={article}/>
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
