import React from "react";
import Article from "@/components/admin/Article";

const ListUser = ({listUsers}) => {
  const tabhead = ["id", "name", "role", "actions"];
  
  return (
    <Article header="Listes Utilisateurs." tabhead={tabhead} user listCategories={[]} listArticles={[]} listUsers={listUsers}/>
  );
};

export default ListUser;
