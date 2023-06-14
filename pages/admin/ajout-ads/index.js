import React from "react";
import AddAds from "@/components/admin/AddAds";
import { getCookie } from "cookies-next";

const index = ({ listAds, listCategories }) => {
  return <AddAds listAds={listAds} listCategories={listCategories} />;
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
  let listAds = [];
  const param = { query: "getAllAds", param: false }; // query: ilay anaran'ilay méthode ao @ MyDatabase
  const categoriesParam = { query: "getFullCategories", param: false };
  let listCategories = [];
  let listArticles = [];

  // ListADS
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(param),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (listAds = data));

  // ListCategories
  await fetch(`${baseUrl}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(categoriesParam),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (listCategories = data));

  return {
    props: {
      listAds: listAds.result,
      listCategories: listCategories.result,
    },
  };
}
