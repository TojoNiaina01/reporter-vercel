import React from "react";
import Image from "next/image";
import DateAuteur from "@/components/DateAuteur";
import Title from "@/components/Title";
import { v4 as uuidV4 } from "uuid";
import moment from "moment";
import { useRouter } from "next/navigation";

const Secondary = ({ articleData }) => {
  const router = useRouter()

  const linkBeautify = (link) => {
    const newLink = link.replace(/[?';:,\s\u2019]/g, "-");
    return newLink.toLowerCase()
  };  

  const redirectHandler = (id, title) => {
    router.push(`/article/${id}/${linkBeautify(title)}`)
  }

  return (
    <div onClick={() => redirectHandler(articleData.id, articleData.title)} key={uuidV4()} className="group w-full cursor-pointer lg:w-[210px]">
      <div  className="relative h-[103px] w-[210px] lg:w-full">
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
