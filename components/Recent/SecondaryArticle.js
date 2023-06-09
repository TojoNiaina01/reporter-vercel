import React from "react";
import Image from "next/image";
import DateAuteur from "@/components/DateAuteur";
import Title from "@/components/Title";
import { v4 as uuidV4 } from "uuid";
import moment from "moment";

const Secondary = ({ articleData }) => {
  return (
    <div key={uuidV4()} className="group w-full cursor-pointer lg:w-[210px]">
      <div className="relative h-[103px] w-[210px] lg:w-full">
        <Image
          src={`/uploads/images/${articleData.image[0].image_name}.${articleData.image[0].image_extension}`}
          fill
          className="object-cover"
          alt="Image article blog"
        />
      </div>
      <DateAuteur
        date={articleData.created_at}
        auteur={articleData.author}
        wrap
      />
      <hr />
      <Title>
        {articleData.title.length > 50
          ? `${articleData.title.substring(0, 50)}...`
          : articleData.title}
      </Title>
    </div>
  );
};

export default Secondary;
