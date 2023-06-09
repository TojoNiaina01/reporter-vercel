import React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import DateAuteur from "@/components/DateAuteur";
import Title from "@/components/Title";
import moment from "moment";
import { useRouter } from "next/router";

const SecondaryPopular = ({article}) => {
const router = useRouter()
const linkBeautify = (link) => {
  const newLink = link.replace(/[';:,\s\u2019]/g, "-");
    return newLink.toLowerCase()
};
  return (
    <div className="pt-3 relative cursor-pointer lg:w-[70%]">
      <div className="relative w-full h-[228px] md:h-[270px] lg:w-full lg:h-full">
        <Image
          src={`/uploads/images/${article.image[0].image_name}.${article.image[0].image_extension}`}
          className="object-cover"
          alt="Image article blog"
          width={1200}
          height={575}
        />
      </div>
      <div className="absolute bg-white w-[65%] py-2 px-4 md:px-6 left-4 bottom-0 md:w-[45%] md:left-9 lg:w-[50%]">
        <DateAuteur date={article.created_at} auteur={article.author} />
        <Title>{article.title.length > 50 ? `${article.title.substring(0,50)}...` : article.title}</Title>
        <p className="text-xs pt-1 text-gray-500 md:text-sm 2xl:text-base lg:pb-0">
        {article.description.length > 255 ? `${article.description.substring(0,255)}...` : article.description}
        </p>

        <div onClick={() => router.push(`/article/${article.id}/${linkBeautify(article.title)}`)} className="pt-5 inline-flex gap-2 items-center">
          <p className="uppercase text-[10px] font-semibold">read more</p>
          <ArrowRightIcon className="w-4 h-4 text-main-500" />
        </div>
      </div>
    </div>
  );
};

export default SecondaryPopular;
