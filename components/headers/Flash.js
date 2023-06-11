import React, {useState, useEffect} from "react";
import { Jost } from "next/font/google";
import Title from "@/components/Title";
import { Slide } from "react-slideshow-image";
import {v4 as uuidv4} from "uuid";
import { useRouter } from "next/router";

const jost = Jost({ subsets: ["latin"], weight: "700" });

const Flash = ({listFlash}) => {
  const [articles, setArticles] = useState(listFlash)
  const router = useRouter()
  const settings = {
    prevArrow: <div />,
    nextArrow: <div />,
    pauseOnHover: true,
    canSwipe: true,
    easing: "ease-out",
    duration: 10000,
    transitionDuration: 5000,
    autoplay: true,
  };

  const linkBeautify = (link) => {
    const newLink = link.replace(/[?';:,\s\u2019]/g, "-");
      return newLink.toLowerCase()
  };
  

  useEffect(() => {
    setArticles(listFlash)
  },[listFlash])

  const redirectHandler = (id, title) => {
    router.push(`/article/${id}/${linkBeautify(title)}`)
  }


  return (
    <>
      {
        articles&&(
          <div className="hidden bg-main-500/20 rounded-xl lg:flex lg:items-center overflow-x-hidden">
            <div className="bg-gradient-to-br from-[#D93D59]  to-[#D93D59] p-4 rounded-xl tracking-wider z-10">
              <h1
                className={`uppercase text-white text-2xl ${jost.className} leading-6`}
              >
                Flash <br /> Info.
              </h1>
            </div>
            <div className="w-full px-5">
              <Slide {...settings}>
                {
                  articles.map((article) => (
                    <div key={uuidv4()} className="group cursor-pointer"  onClick={() => redirectHandler(article.id, article.title)}>
                      <Title style="text-lg text-gray-600">
                        {article.title}
                      </Title>
                      <p className="text-xs text-gray-600 max-w-lg tracking-wide pt-1">
                      {article.description}
                      </p>
                    </div>
                  ))
                }
              </Slide>
            </div>
          </div>
        )
      }
    </>
    
  );
};

export default Flash;
