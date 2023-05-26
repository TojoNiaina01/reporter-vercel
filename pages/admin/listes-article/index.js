import React, {createContext} from "react";
import { ArticleOne } from "@/public/assets/img";
import Article from "@/components/admin/Article";
import {listCategories} from "@/context/allContext"

const ListeArticle = ({categories, listArticles}) => {

  

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

  return (
    <listCategories.Provider value={categories}>
      <Article header="Listes Articles." tabhead={tabsHead} data={data} listArticles={listArticles} />;
    </listCategories.Provider>
  )
};

export default ListeArticle;


export async function getStaticProps(context){
  const baseUrl = process.env.ROOT_URL
  const param = {query: 'getFullCategories', param: false}// query: ilay anaran'ilay méthode ao @ MyDatabase
  const paramArticle = {query: 'getArticlesByLang', param: ["fr"]}// query: ilay anaran'ilay méthode ao @ MyDatabase
  let listCategories = []
  let listArticles = []
    await fetch(`${baseUrl}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramArticle),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => listArticles = data)

    await fetch(`${baseUrl}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => listCategories = data)
      return {
        props: {
          categories: listCategories.result,
          listArticles: listArticles.result
        }
      }
  }