import React, {useState, useEffect} from "react";
import Image from "next/image";
import Title from "@/components/Title";
import DateAuteur from "@/components/DateAuteur";
import HeaderCategory from "@/components/HeaderCategory";
import Hastag from "@/components/Hastag";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import localStorage from "localStorage";
import { useRouter } from "next/navigation";
import { ROOT_URL } from "@/env";

const MainMost = ({articleData}) => {
  const lang = JSON.parse(localStorage.getItem('token')).lang
  const [hastag, setHasTag] = useState()

  const router = useRouter()

  const linkBeautify = (link) => {
    const newLink = link.replace(/[?'%;:,\s\u2019]/g, "-");
    return newLink.toLowerCase()
  };  
  
  const redirectHandler = (id, title) => {
    router.push(`/article/${id}/${linkBeautify(title)}`)
  }

  useEffect(() => {
    if(lang === 'en'){
      setHasTag(articleData.category_en)
    }else{
      setHasTag(articleData.category_fr)
    }
  },[])

  return (
    <div
      onClick={() => redirectHandler(articleData.id, articleData.title)}
      key={uuidv4()}
      className="group relative border-[1px] border-gray-300 rounded cursor-pointer"
    >
      <Hastag style="absolute top-1 z-10  left-1">{hastag}</Hastag>
      <div className="relative w-full h-[100px] md:h-[150px] lg:w-full lg:h-[200px]">
        <Image
          src={`${ROOT_URL}/images/${articleData.image[0].image_name}.${articleData.image[0].image_extension}`}
          fill
          className="object-cover"
          alt="Article image blog"
        />
      </div>
      <div className="p-2">
      <DateAuteur date={articleData.created_at} auteur={articleData.author} />
        <hr />
        <Title>{articleData.title}</Title>
      </div>
    </div>
  );
};

export default MainMost;
