import React from "react";
import Image from "next/image";
import DateAuteur from "@/components/DateAuteur";
import Title from "@/components/Title";
import {v4 as uuidV4} from 'uuid'
import moment from "moment";


const Secondary = ({articleData}) => {
  return (
    <div key={uuidV4()} className="w-full lg:w-[210px] group cursor-pointer">
      <div className="relative w-[210px] h-[103px] lg:w-full">
        <Image
          src={`/uploads/images/${articleData.image[0].image_name}.${articleData.image[0].image_extension}`}
          fill
          className="object-cover"
          alt="Image article blog"
        />
      </div>
      <DateAuteur date={moment(articleData.created_at).format('MMMM Do YYYY')} auteur={articleData.author} wrap />
      <hr />
      <Title>{articleData.title.length > 50 ? `${articleData.title.substring(0,50)}...` : articleData.title}</Title>
    </div>
  );
};

export default Secondary;
