import React, {useState, useEffect} from "react";
import Image from "next/image";
import Hastag from "@/components/Hastag";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import DateAuteur from "@/components/DateAuteur";
import Title from "@/components/Title";
import { v4 as uuidv4 } from "uuid";
import localStorage from "localStorage";
import { useRouter } from "next/router";
import { ROOT_URL } from "@/env";



const MainArticle = ({articleData}) => {
  const lang = JSON.parse(localStorage.getItem('token')).lang
  const [hastag, setHasTag] = useState()

  const router = useRouter()

  const linkBeautify = (link) => {
    const newLink = link.replace(/[?';%:,\s\u2019]/g, "-");
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
      key={uuidv4()}
      className="group flex md:items-center gap-2 border-[1px] border-gray-200 rounded cursor-pointer md:gap-5"
      onClick={() => redirectHandler(articleData.id, articleData.title)}
    >
      <div className="relative w-[50%] h-[200px] md:w-[40%] lg:w-[35%]">
        <Hastag style="absolute top-2 z-10  left-4"> {hastag} </Hastag>
        <Image
          src={`${ROOT_URL}/images/${articleData.image[0].image_name}.${articleData.image[0].image_extension}`}
          fill
          className="object-cover"
          alt="Image article blog"
        />
      </div>
      <div className="w-[55%] lg:pt-0">
        <Title style="lg:text-lg">{articleData.title.length > 50 ? `${articleData.title.substring(0,50)}...` : articleData.title}</Title>
        <p className="text-xs pt-1 pb-2  text-gray-500 md:p md:text-sm lg:text-base lg:pb-0">
        {articleData.description.length > 255 ? `${articleData.description.substring(0,255)}...` : articleData.description}
        </p>
        <div className="flex items-center gap-6">
          <hr className="flex-grow" />
          <button className="hidden lg:block rounded-full bg-secondary-500 p-2 shadow-md active:scale-95">
            <ChevronRightIcon className="text-white w-4 h-4 " />
          </button>
        </div>
        <DateAuteur date={articleData.created_at} auteur={articleData.author} />
      </div>
    </div>
  );
};

export default MainArticle;
