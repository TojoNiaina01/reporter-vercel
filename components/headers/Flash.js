import React, { useState, useEffect } from "react";
import { Jost } from "next/font/google";
import Title from "@/components/Title";
import { Slide } from "react-slideshow-image";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

const jost = Jost({ subsets: ["latin"], weight: "700" });

const Flash = ({ listFlash }) => {
  const [articles, setArticles] = useState(listFlash);
  const router = useRouter();
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
    const newLink = link.replace(/[?%';:,\s\u2019]/g, "-");
    return newLink.toLowerCase();
  };

  useEffect(() => {
    setArticles(listFlash);
  }, [listFlash]);

  const redirectHandler = (id, title) => {
    router.push(`/article/${id}/${linkBeautify(title)}`);
  };

  return (
    <>
      {articles && (
        <div className="hidden overflow-x-hidden rounded-xl bg-main-500/20 lg:flex lg:items-center">
          <div className="z-10 rounded-xl  bg-gradient-to-br from-[#D93D59] to-[#D93D59] p-4 tracking-wider">
            <h1
              className={`text-2xl uppercase text-white ${jost.className} leading-6`}
            >
              Flash <br /> Info.
            </h1>
          </div>
          <div className="w-full">
            <Slide {...settings}>
              {articles.map((article) => (
                <div
                  key={uuidv4()}
                  className="group mx-4 cursor-pointer"
                  onClick={() => redirectHandler(article.id, article.title)}
                >
                  <Title style="text-lg text-gray-600">{article.title}</Title>
                  <p className=" w-[90%] pt-1 text-xs tracking-wide text-gray-600">
                    {article.description}
                  </p>
                </div>
              ))}
            </Slide>
          </div>
        </div>
      )}
    </>
  );
};

export default Flash;
