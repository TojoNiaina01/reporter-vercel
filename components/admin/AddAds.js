import React, { useState } from "react";
import FormAds from "@/components/admin/FormAds";

const AddAds = ({listAds}) => {
  const [modalShow, setModalShow] = useState(false);

  return <FormAds submitBtn="Ajouter" header="Création d'ADS." listAds={listAds}/>;
};

export default AddAds;
