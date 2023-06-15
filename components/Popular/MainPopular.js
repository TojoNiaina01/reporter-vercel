import React from "react";
import Image from "next/image";
import DateAuteur from "@/components/DateAuteur";
import Title from "@/components/Title";
import moment from "moment";
import { useRouter } from "next/router";
import { ROOT_URL } from "@/env";

const MainPopular = ({ articleData, styleHidden, dateStyle }) => {
  const router = useRouter();

  const linkBeautify = (link) => {
    const newLink = link.replace(/[?'%;:,\s\u2019]/g, "-");
    return newLink.toLowerCase();
  };

  const redirectHandler = (id, title) => {
    router.push(`/article/${id}/${linkBeautify(title)}`);
  };

  return (
    <>
      <div
        className={`${
          !styleHidden ? "" : "popular"
        } group flex cursor-pointer gap-2 py-2 md:flex-col  md:gap-0 md:py-0 lg:flex-row lg:gap-3`}
        onClick={() => redirectHandler(articleData.id, articleData.title)}
      >
        <div className="relative h-[95px] w-[120px] md:h-[120px] md:w-full lg:h-[90px] lg:w-[110px]">
          <Image
            src={`${ROOT_URL}/images/${articleData.image[0].image_name}.${articleData.image[0].image_extension}`}
            fill
            className="object-cover"
            alt="Image blog article"
          />
        </div>
        <div className="relative flex w-[60%] flex-col md:w-full lg:w-[50%]">
          <Title style={`md:order-2 md:py-2 lg:order-1  lg:py-0`}>
            {articleData.title.length > 50
              ? `${articleData.title.substring(0, 50)}...`
              : articleData.title}
          </Title>
          <DateAuteur
            style={`text-secondary-500 md:order-1 ${
              !dateStyle ? "" : "lg:pt-0"
            } pt-2 lg:order-2`}
            date={articleData.created_at}
            auteur={articleData.author}
          />
        </div>
      </div>
      <hr className="popularHr hidden w-[90%] lg:block" />
    </>
  );
};

export default MainPopular;
