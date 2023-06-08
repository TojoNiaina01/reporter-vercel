import React from "react";
import FormArticle from "@/components/admin/FormArticle";

const AddArticle = ({listCategories}) => {
  const articleData = {title: '', description: '', body: '', category_en: '', category_fr: '', lang: ''}
  return (
    <FormArticle header="Creation d'article" submitBtn="Ajouter" uploadFile listCategories={listCategories} articleData={articleData}/>
  );
};

export default AddArticle;
