import React from "react";
import AdsManager from "@/components/admin/AdsManager";
import { getCookie } from "cookies-next";

const ListeAds = ({listAds}) => {
  return <AdsManager listAds={listAds}/>;
};

export default ListeAds;

export async function getServerSideProps({req, res}){

  if(!getCookie('token_', {req, res})){
    return {
      redirect: {
        destination: "/admin/login"
      }
    }
  }


  const baseUrl = process.env.ROOT_URL
  let listAds = []
  const param = {query: 'getAdsAndImages', param: false}// query: ilay anaran'ilay méthode ao @ MyDatabase
  let listCategories = []
  let listArticles = []
    await fetch(`${baseUrl}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => listAds = data)
 
      return {
        props: {
          listAds: listAds.result
        }
      }
  }