import React, {useState, useEffect} from "react";
import HeaderCategory from "@/components/HeaderCategory";
import { Publicite } from "@/public/assets/img";
import Hastag from "@/components/Hastag";
import MainPopular from "@/components/Popular/MainPopular";
import { SocialIcon } from "react-social-icons";
import { v4 as uuidv4 } from "uuid";
import Title from "@/components/Title";
import DateAuteur from "@/components/DateAuteur";
import Image from "next/image";
import Link from "next/link";
import localStorage from "localStorage";
import moment from "moment";
import { useRouter } from "next/router";

const AsideRecentPopular = ({listPopular, articleRecent, name, hastagPage, listHastag }) => {
  const router = useRouter()
  const [recentTitle, setRecentTitle] = useState("Recent Articles")
  const [followTitle, setFollowTitle] = useState("Follow Us")
  const [popularTitle, setPopularTitle] = useState("Popular")
  const [lang2, setLang2] = useState('en')
  const lang = JSON.parse(localStorage.getItem('token')).lang

  const linkBeautify = (link) => {
    const newLink = link.replace(/[';:,\s\u2019]/g, "-");
      return newLink.toLowerCase()
  };
  
  console.log("list hastag === ", listHastag)

  const redirectHandler = (id, title) => {
    router.push(`/article/${id}/${linkBeautify(title)}`)
  }

  useEffect(() => {
    console.log("most == ", listPopular)
    if(lang === "fr"){
      setRecentTitle("Articles récents")
      setFollowTitle("Suivez-nous")
      setPopularTitle("Populaires")
      setLang2('fr')
    }
  }, [])

  return (
    <aside className="lg:flex lg:flex-col lg:basis-1/5">
      <HeaderCategory title={recentTitle} />
      <div className="space-y-7 lg:space-y-8">
        {articleRecent?.map(
          (article) => (
            <div
              key={uuidv4()}
              className="group flex md:items-center gap-2 cursor-pointer md:gap-5 lg:flex-col lg:gap-0 lg:order-1"
              onClick={() => redirectHandler(article.id, article.title)}
            >
              <div className="relative w-[50%] h-[200px] md:w-[40%] lg:w-full lg:h-[150px]">
                <Hastag style="absolute top-2 z-10  left-4">
                  {lang2 === 'fr' ? article.category_fr : article.category_en}
                  </Hastag>
                <Image
                  src={`/uploads/images/${article.image[0].image_name}.${article.image[0].image_extension}`}
                  fill
                  className="object-cover"
                  alt="Image article blog"
                />
              </div>
              <div className="w-[55%] lg:w-full">
                <Title>{article.title.length > 50 ? `${article.title.substring(0,50)}...` : article.title}</Title>
                <p className="text-xs  text-gray-500 md:p md:text-sm lg:hidden">
                {article.description.length > 255 ? `${article.description.substring(0,255)}...` : article.description}
                </p>
                <DateAuteur  date={moment(article.created_at).format('MMMM Do YYYY')} auteur={article.author} />
              </div>
            </div>
          )
        )}
      </div>


      {!hastagPage && 
     ( 
     <div className="hidden lg:block mt-10 lg:order-2">
        <HeaderCategory title="Tag" />
        <ul className="flex flex-wrap gap-4 pt-4">
          {listHastag?.map((tag) => (
            <li
              key={uuidv4()}
              className="tagBg text-center w-fit px-2 border-[1px] border-gray-300 rounded font-bold uppercase cursor-pointer"
            >
              <Link
                href={`/hastag/${tag.id}/${linkBeautify(tag.name)}`}
                className="whitespace-nowrap text-[10px] leading-[12px]"
              >
                {tag.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      )
      }
      <div className="relative w-full h-[437px] mt-5 md:h-[752px] lg:h-[300px] lg:order-3">
        <Hastag style="absolute top-2 z-10  right-4">ads</Hastag>
        <Image src={Publicite} fill className="object-cover" alt="Publicite" />
      </div>
      {/*Follow us*/}
      <div className="mt-10 hidden lg:block">
        <HeaderCategory title={followTitle} />
        <ul className="flex gap-3 mt-4">
          <li>
            <SocialIcon
              url="https://facebook.com"
              style={{ height: 40, width: 40 }}
              className="hover:scale-105"
              bgColor="#EFF2FB"
              fgColor="gray"
              target="_blank"
            />
          </li>
          <li>
            <SocialIcon
              url="https://twitter.com"
              style={{ height: 40, width: 40 }}
              className="hover:scale-105"
              bgColor="#EFF2FB"
              fgColor="gray"
              target="_blank"
            />
          </li>
          <li>
            <SocialIcon
              url="https://youtube.com"
              style={{ height: 40, width: 40 }}
              className="hover:scale-105"
              bgColor="#EFF2FB"
              fgColor="gray"
              target="_blank"
            />
          </li>
          <li>
            <SocialIcon
              url="https://instagram.com"
              style={{ height: 40, width: 40 }}
              className="hover:scale-105"
              bgColor="#EFF2FB"
              fgColor="gray"
              target="_blank"
            />
          </li>
          <li>
            <SocialIcon
              url="https://linkedin.com"
              style={{ height: 40, width: 40 }}
              className="hover:scale-105"
              bgColor="#EFF2FB"
              fgColor="gray"
              target="_blank"
            />
          </li>
        </ul>
      </div>

      <div className="mt-10 lg:order-4">
        <HeaderCategory title={popularTitle} />
        <div className="md:flex  gap-2 lg:pt-2 lg:flex-col">
          {listPopular?.map((article) => (
              <MainPopular key={uuidv4()} articleData={article}/>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default AsideRecentPopular;
