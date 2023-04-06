import React, { useContext, useRef } from "react";
import HeaderCategory from "@/components/HeaderCategory";
import MainTopOfWeek from "@/components/Mostread/MainTopOfWeek";
import { ArticlesContext } from "@/pages";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const TopOfWeek = () => {
  const { ArticleTopOfWeek } = useContext(ArticlesContext);
  const ArticleRef = useRef(null);
  const handleClick = (direction) => {
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
    <section className="mt-10 relative">
      <HeaderCategory title="Top of the week" all />
      <button
        onClick={() => handleClick("left")}
        className={`absolute top-1/2 -translate-y-1/2 left-2 z-10 active:scale-95 p-2 bg-main-500 rounded-full md:-left-4 lg:hidden`}
      >
        <ChevronLeftIcon className="h-5 w-5  text-white  " />
      </button>
      <div
        className="flex overflow-x-scroll scrollbar-hide gap-6 lg:justify-between"
        ref={ArticleRef}
      >
        {ArticleTopOfWeek?.map(({ img, category, titre, date, auteur }) => (
          <MainTopOfWeek
            img={img}
            category={category}
            titre={titre}
            date={date}
            auteur={auteur}
          />
        ))}
      </div>
      <button
        onClick={() => handleClick("right")}
        className="absolute top-1/2 -translate-y-1/2 right-2 z-10 active:scale-95 p-2 bg-main-500 rounded-full md:-right-4 lg:hidden"
      >
        <ChevronRightIcon className=" h-5 w-5  text-white" />
      </button>
    </section>
  );
};

export default TopOfWeek;
