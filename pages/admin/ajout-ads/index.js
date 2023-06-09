import React from "react";
import AddAds from "@/components/admin/AddAds";
import { getCookie } from "cookies-next";

const index = () => {
  return <AddAds />;
};

export default index;

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
