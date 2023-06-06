import React, {useReducer} from "react";
import { ArticleOne } from "@/public/assets/img";
import Article from "@/components/admin/Article";
import {listCategories, listArticlesContext} from "@/context/allContext"
import { articleAction } from "@/context/allAction";
import { getTest } from "@/config/storage";

const ListeArticle = ({categories, listArticles}) => {
console.log(getTest)
  const [state, dispatch] = useReducer(articleAction, listArticles)
  

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
      <listArticlesContext.Provider value={{state, dispatch}}>
        <Article header="Listes Articles." tabhead={tabsHead} data={data} listArticles={state} dispatchArticle={dispatch} listCategories={categories} />;
      </listArticlesContext.Provider>
    </listCategories.Provider>
  )
};

export default ListeArticle;


export async function getStaticProps(){
  const baseUrl = process.env.ROOT_URL
  console.log(getTest)
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