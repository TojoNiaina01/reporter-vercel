import React from "react";
import ListUser from "@/components/admin/ListUser";
import { getCookie } from "cookies-next";

const ListeUser = ({listUsers}) => {
 
  return <ListUser listUsers={listUsers}/>;
};

export default ListeUser;

export async function getServerSideProps({req, res}){
  const baseUrl = process.env.ROOT_URL
  if(!getCookie('token_', {req, res})){
    return {
      redirect: {
        destination: "/admin/login"
      }
    }
  }

  const paramUser = {query: 'getUsers', param: false}// query: ilay anaran'ilay méthode ao @ MyDatabase
  let listUsers = []
    await fetch(`${baseUrl}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramUser),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => listUsers = data)

  
      return {
        props: {
          listUsers: listUsers.result
        }
      }
  }