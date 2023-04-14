import React, { useContext } from "react";
import HeaderCategory from "@/components/HeaderCategory";
import MainPopular from "@/components/Popular/MainPopular";
import { ArticlesContext } from "@/pages";
import { v4 as uuidv4 } from "uuid";
import SecondaryPopular from "@/components/Popular/SecondaryPopular";

const Popular = () => {
  const { ArticlePopular } = useContext(ArticlesContext);
  return (
    <section className="mt-10">
      <HeaderCategory title="Popular Articless" all banner />
      <div className="lg:flex lg:justify-between">
        <div className="md:flex  gap-2 lg:pt-2 lg:flex-col">
          {ArticlePopular?.map(({ img, titre, date, auteur }) => (
            <MainPopular
              key={uuidv4()}
              img={img}
              titre={titre}
              date={date}
              auteur={auteur}
            />
          ))}
        </div>
        <SecondaryPopular />
      </div>
    </section>
  );
};

export default Popular;
