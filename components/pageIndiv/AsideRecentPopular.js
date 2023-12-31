import React, { useState, useEffect } from "react";
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
import { ROOT_URL } from "@/env";
import { useRouter } from "next/router";

const AsideRecentPopular = ({
  listPopular,
  articleRecent,
  name,
  hastagPage,
  listHastag,
  adsVertical,
}) => {
  const router = useRouter();
  const [recentTitle, setRecentTitle] = useState("Recent Articles");
  const [followTitle, setFollowTitle] = useState("Follow Us");
  const [popularTitle, setPopularTitle] = useState("Popular");
  const [lang2, setLang2] = useState("en");
  const lang = JSON.parse(localStorage.getItem("token")).lang;

  const linkBeautify = (link) => {
    const newLink = link.replace(/[?'%;:,\s\u2019]/g, "-");
    return newLink.toLowerCase();
  };

  const redirectHandler = (id, title) => {
    router.push(`/article/${id}/${linkBeautify(title)}`);
  };

  useEffect(() => {
    console.log("most == ", listPopular);
    if (lang === "fr") {
      setRecentTitle("Articles récents");
      setFollowTitle("Suivez-nous");
      setPopularTitle("Populaires");
      setLang2("fr");
    }
  }, []);

  return (
    <aside className="lg:flex lg:basis-1/5 lg:flex-col">
      <HeaderCategory title={recentTitle} />
      <div className="space-y-7 lg:space-y-8">
        {articleRecent?.map((article) => (
          <div
            key={uuidv4()}
            className="group flex cursor-pointer gap-2 md:items-center md:gap-5 lg:order-1 lg:flex-col lg:gap-0"
            onClick={() => redirectHandler(article.id, article.title)}
          >
            <div className="relative h-[200px] w-[50%] md:w-[40%] lg:h-[150px] lg:w-full">
              <Hastag style="absolute top-2 z-10  left-4">
                {lang2 === "fr" ? article.category_fr : article.category_en}
              </Hastag>
              <Image
                src={`${ROOT_URL}/images/${article.image[0].image_name}.${article.image[0].image_extension}`}
                fill
                className="object-contain md:object-cover"
                alt="Image article blog"
              />
            </div>
            <div className="w-[55%] lg:w-full">
              <Title>
                {article.title.length > 50
                  ? `${article.title.substring(0, 50)}...`
                  : article.title}
              </Title>
              <p className="md:p  text-xs text-gray-500 md:text-sm lg:hidden">
                {article.description.length > 255
                  ? `${article.description.substring(0, 255)}...`
                  : article.description}
              </p>
              <DateAuteur date={article.created_at} auteur={article.author} />
            </div>
          </div>
        ))}
      </div>

      {!hastagPage && (
        <div className="mt-10 hidden lg:order-2 lg:block">
          <HeaderCategory title="Tag" />
          <ul className="flex flex-wrap gap-4 pt-4">
            {listHastag?.map((tag) => (
              <li
                key={uuidv4()}
                className="tagBg w-fit cursor-pointer rounded border-[1px] border-gray-300 px-2 text-center font-bold uppercase"
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
      )}
      {adsVertical[0] && (
        <div className="relative mt-5 h-[437px] w-full md:h-[752px] lg:order-3 lg:h-[300px]">
          <Hastag style="absolute top-2 z-10  right-4">ads</Hastag>
          <Image
            src={`${ROOT_URL}/images/${adsVertical[0].image_name}.${adsVertical[0].image_extension}`}
            fill
            className="object-cover"
            alt="Publicite"
          />
        </div>
      )}
      {/*Follow us*/}
      <div className="mt-10 hidden lg:block">
        <HeaderCategory title={followTitle} />
        <ul className="mt-4 flex gap-3">
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
        <div className="gap-2  md:flex lg:flex-col lg:pt-2">
          {listPopular?.map((article) => (
            <MainPopular key={uuidv4()} articleData={article} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default AsideRecentPopular;
