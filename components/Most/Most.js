import React, { useContext } from "react";
import HeaderCategory from "@/components/HeaderCategory";
import MainMost from "@/components/Most/MainMost";
import { ArticlesContext } from "@/pages";
import SecondaryMost from "@/components/Most/SecondaryMost";
import useMediaQuery from "@/hook/useMediaQuery";
import {v4 as uuidv4} from "uuid";

const Most = ({dataMostRead}) => {
  const { ArticleMostMain } = useContext(ArticlesContext);
  const isAboveScreen = useMediaQuery("(min-width: 1024px)");
  return (
    <section className="mt-10 flex lg:gap-6 lg:justify-between">
      <div className="lg:w-[65%]">
        <HeaderCategory title="Most Read" banner />
        <div className="grid grid-cols-2 gap-2 md:gap-6">
          {dataMostRead?.map((article) => (
            
            <MainMost key={uuidv4()} articleData={article}/>
          ))}
        </div>
      </div>
      {isAboveScreen && <SecondaryMost />}
    </section>
  );
};

export default Most;
