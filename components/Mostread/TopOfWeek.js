import React, { useContext, useRef } from "react";
import HeaderCategory from "@/components/HeaderCategory";
import MainTopOfWeek from "@/components/Mostread/MainTopOfWeek";
import { ArticlesContext } from "@/pages";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {v4 as uuidv4} from "uuid";

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
    <section className="mt-10">
      <HeaderCategory title="Top of the week" banner />
      <div
        className="flex overflow-x-scroll scrollbar-hide gap-6 lg:justify-between"
        ref={ArticleRef}
      >
        {ArticleTopOfWeek?.map(({ img, category, titre, date, auteur }) => (
          <MainTopOfWeek
            key={uuidv4()}
            img={img}
            category={category}
            titre={titre}
            date={date}
            auteur={auteur}
          />
        ))}
      </div>
    </section>
  );
};

export default TopOfWeek;
