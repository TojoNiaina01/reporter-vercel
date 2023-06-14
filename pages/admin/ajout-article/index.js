import React from "react";
import AddArticle from "@/components/admin/AddArticle";
import { getCookie } from "cookies-next";

const index = ({ listCategories }) => {
  return <AddArticle listCategories={listCategories} />;
};

export default index;

export async function getServerSideProps({ req, res }) {
  if (!getCookie("token_", { req, res })) {
    return {
      redirect: {
        destination: "/admin/login",
      },
    };
  }
  const baseUrl = process.env.ROOT_URL;
  const param = { query: "getFullCategories", param: false }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  let listCategories = [];
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(param),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (listCategories = data));
  return {
    props: {
      listCategories: listCategories.result,
    },
  };
}
