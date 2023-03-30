import React, { useContext, useRef, useState } from "react";
import Title from "@/components/Title";
import MainArticle from "@/components/Recent/MainArticle";
import { ArticlesContext } from "@/pages";
import SecondaryArticle from "@/components/Recent/SecondaryArticle";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"], weight: "600" });
const Recent = () => {
  const [isMoved, setIsMoved] = useState(false);
  const ArticleRef = useRef(null);
  const { ArticleRecentMain, ArticleRecentSecondary } =
    useContext(ArticlesContext);

  const handleClick = (direction) => {
    setIsMoved(true);
    if (ArticleRef.current) {
      const { scrollLeft, clientWidth } = ArticleRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      ArticleRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-10">
      <Title title="Recent News" />
      <div className="flex flex-col gap-2 lg:flex-row lg:gap-8 lg:pt-2">
        {/* Left Panel */}
        <div className="space-y-7 lg:space-y-8">
          {ArticleRecentMain?.map(
            ({ img, category, titre, description, auteur, date }) => (
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
        <div className="relative">
          <button
            onClick={() => handleClick("left")}
            className={`absolute top-1/2 -translate-y-1/2 left-2 z-10 active:scale-95 p-2 bg-[#D93D59] rounded-full ${
              !isMoved && "hidden"
            } md:-left-4 lg:hidden`}
          >
            <ChevronLeftIcon className="h-5 w-5  text-white  " />
          </button>
          <div
            className=" flex overflow-x-scroll gap-4 pt-5 scrollbar-hide lg:flex-col lg:pt-0 lg:gap-6"
            ref={ArticleRef}
          >
            {ArticleRecentSecondary?.map(({ img, date, auteur, titre }) => (
              <SecondaryArticle
                img={img}
                date={date}
                auteur={auteur}
                titre={titre}
              />
            ))}

            <button
              className={`hidden lg:block uppercase text-white bg-main-500 rounded-full py-2 shadow-md active:scale-95 text-xs  tracking-wide ${jost.className}`}
            >
              view all
            </button>
          </div>
          <button
            onClick={() => handleClick("right")}
            className="absolute top-1/2 -translate-y-1/2 right-2 z-10 active:scale-95 p-2 bg-[#D93D59] rounded-full md:-right-4 lg:hidden"
          >
            <ChevronRightIcon className=" h-5 w-5  text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Recent;
