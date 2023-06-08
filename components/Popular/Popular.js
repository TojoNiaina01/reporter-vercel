import React, { useEffect, useState } from "react";
import HeaderCategory from "@/components/HeaderCategory";
import MainPopular from "@/components/Popular/MainPopular";
import { v4 as uuidv4 } from "uuid";
import SecondaryPopular from "@/components/Popular/SecondaryPopular";

const Popular = ({dataMostPopular}) => {
 const [mainData, setMainData] = useState([])
 const [secondaryData, setSecondaryData] = useState(dataMostPopular.length > 0 ? dataMostPopular[0] : [])

 useEffect(() => {
  if(dataMostPopular.length > 0){
    setSecondaryData(dataMostPopular[0])
    setMainData(dataMostPopular.slice(1, 5))

  }
 },[])

  return (
    <section className="mt-10">
      <HeaderCategory title="Popular Articless"  banner />
      <div className="lg:flex lg:justify-between">
        <div className="md:flex  gap-2 lg:pt-2 lg:flex-col">
          {mainData?.map((article) => (
            <MainPopular key={uuidv4()} articleData={article}/>
          ))}
        </div>
        <SecondaryPopular article={secondaryData} />
      </div>
    </section>
  );
};

export default Popular;
