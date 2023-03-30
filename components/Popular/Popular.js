import React, { useContext } from "react";
import Title from "@/components/Title";
import MainPopular from "@/components/Popular/MainPopular";
import { ArticlesContext } from "@/pages";
import SecondaryPopular from "@/components/Popular/SecondaryPopular";

const Popular = () => {
  const { ArticlePopular } = useContext(ArticlesContext);
  return (
    <section className="mt-10">
      <Title title="Popular Articles" />
      <div>
        <div className="md:flex  gap-2 lg:pt-2">
          {ArticlePopular?.map(({ img, titre, date, auteur }) => (
            <MainPopular img={img} titre={titre} date={date} auteur={auteur} />
          ))}
        </div>
        <div>
          <SecondaryPopular />
        </div>
      </div>
    </section>
  );
};

export default Popular;
