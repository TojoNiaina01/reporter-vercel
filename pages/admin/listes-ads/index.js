import React from "react";
import AdsManager from "@/components/admin/AdsManager";
import { getCookie } from "cookies-next";

const ListeAds = () => {
  return <AdsManager />;
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
  
      return {
        props: {
          listCategories: "listCategories.result"
        }
      }
  }