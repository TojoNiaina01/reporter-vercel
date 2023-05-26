import React from "react";
import AddArticle from "@/components/admin/AddArticle";

const index = ({listCategories}) => {
  return <AddArticle listCategories={listCategories}/>;
};

export default index;

export async function getStaticProps(context){
  const baseUrl = process.env.ROOT_URL
  const param = {query: 'getFullCategories', param: false}// query: ilay anaran'ilay méthode ao @ MyDatabase
  let listCategories = []
    await fetch(`${baseUrl}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => listCategories = data)
console.log("conext == ", context.req)
      return {
        props: {
          listCategories: listCategories.result
        }
      }
  }


