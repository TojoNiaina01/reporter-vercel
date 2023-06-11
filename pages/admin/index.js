import React from "react";
import useMediaQuery from "@/hook/useMediaQuery";
import Errors from "@/pages/404";
import { getCookie } from "cookies-next";
const Admin = () => {
  return <div></div>;
};

export default Admin;

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