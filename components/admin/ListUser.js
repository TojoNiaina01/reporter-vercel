import React from "react";
import Article from "@/components/admin/Article";

const ListUser = () => {
  const tabhead = ["id", "name", "role", "actions"];
  const data = [
    { name: "Rakotonirina Tojonirina", role: "Editeur" },
    { name: "Rajoanarivelo Nirina", role: "Editeur" },
    { name: "Rajoanarivelo Nirina", role: "Editeur" },
    { name: "Ramaroson Lovanomena", role: "Editeur" },
    { name: "Rakoto Benja", role: "Editeur" },
    { name: "Rakoto Benja", role: "Editeur" },
    { name: "Razafidrakoto Bertine", role: "Editeur" },
    { name: "Jean de Dieu", role: "Editeur" },
  ];
  return (
    <Article header="Listes Utilisateurs." tabhead={tabhead} data={data} user />
  );
};

export default ListUser;
