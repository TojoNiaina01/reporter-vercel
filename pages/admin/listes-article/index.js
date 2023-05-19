import React from "react";
import { ArticleOne } from "@/public/assets/img";
import Article from "@/components/admin/Article";

const ListeArticle = () => {
  const tabsHead = [
    "id",
    "medias",
    "titre",
    "categories",
    "placement",
    "date",
    "actions",
  ];

  const data = [
    {
      img: ArticleOne,
      titre: "A set of the most necessary things on vacation",
      category: "Politique",
      date: "05/12/2021",
    },
    {
      img: ArticleOne,
      titre: "A set of the most necessary things on vacation",
      category: "Politique",
      date: "05/12/2021",
    },
    {
      img: ArticleOne,
      titre: "A set of the most necessary things on vacation",
      category: "Politique",
      date: "05/12/2021",
    },
    {
      img: ArticleOne,
      titre: "A set of the most necessary things on vacation",
      category: "Politique",
      date: "05/12/2021",
    },
    {
      img: ArticleOne,
      titre: "A set of the most necessary things on vacation",
      category: "Politique",
      date: "05/12/2021",
    },
    {
      img: ArticleOne,
      titre: "A set of the most necessary things on vacation",
      category: "Politique",
      date: "05/12/2021",
    },
  ];

  return <Article header="Listes Articles." tabhead={tabsHead} data={data} />;
};

export default ListeArticle;
